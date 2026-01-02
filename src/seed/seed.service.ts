import { Injectable } from '@nestjs/common';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  constructor(private readonly pokemonService: PokemonService) {}

  async runSeed() {
    await this.pokemonService.seedPokemons();
    return { msg: 'Seed executed successfully' };
  }
}
