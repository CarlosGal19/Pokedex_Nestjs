import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    // Due to Pokemon model is not injectable (because it is not a service) the InjectModel decorator is required
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private readonly axiosInstance: AxiosInstance = axios;
  private readonly perPage: number = 15;

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create({
        name: createPokemonDto.name,
        no: createPokemonDto.no,
      });

      return {
        id: pokemon._id,
        name: pokemon.name,
        no: pokemon.no,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationData: PaginationDto) {
    const pokemons = await this.pokemonModel
      .find()
      .select('_id name no')
      .limit(this.perPage)
      .skip((paginationData.page - 1) * this.perPage);

    return {
      pokemons,
      page: paginationData.page,
      take: this.perPage,
      skip: (paginationData.page - 1) * this.perPage,
    };
  }

  async findOne(id: string) {
    let pokemon;

    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel
        .findOne({ no: +id })
        .select('_id name no');
    }

    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id).select('_id name no');
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel
        .findOne({ name: id.trim() })
        .select('_id name no');
    }

    if (!pokemon) {
      throw new NotFoundException(`The pokemon does not exist`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { pokemon };
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { pokemon } = await this.findOne(id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    pokemon.name = updatePokemonDto.name || pokemon.name;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    pokemon.no = updatePokemonDto.no || pokemon.no;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await pokemon.save();

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        id: pokemon._id,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`The pokemon with id ${id} does not exist`);
    }

    return { id };
  }

  private handleExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === 11000) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `The pokemon exists on db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException('Internal server error');
  }
}
