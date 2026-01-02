import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { IPokeAPIResponse } from 'src/pokemon/interfaces/PokeApiResponse.interface';

@Injectable()
export class SeedService {
  constructor(
    // Due to Pokemon model is not injectable (because it is not a service) the InjectModel decorator is required
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private readonly axiosInstance: AxiosInstance = axios;

  async runSeed() {
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axiosInstance.get<IPokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=200',
    );

    const pokemons: { name: string; url: string }[] = data.results;

    const transformedPokemons = pokemons.map((pokemon) => {
      const pokemonUrl = pokemon.url.split('/');
      return {
        name: pokemon.name,
        no: pokemonUrl[pokemonUrl.length - 2],
      };
    });

    await this.pokemonModel.insertMany(transformedPokemons);

    return { msg: 'Seed executed successfully' };
  }
}
