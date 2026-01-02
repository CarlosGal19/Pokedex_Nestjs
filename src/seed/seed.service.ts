import { Injectable } from '@nestjs/common';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { POKEMONS_SEED } from './data/pokemon.seed';

@Injectable()
export class SeedService {
  constructor(private readonly pokemonService: PokemonService) {}

  async runSeed() {
    await this.pokemonService.seedPokemons(POKEMONS_SEED);
    return { msg: 'Seed executed successfully' };
  }
}
