import { Component } from '@angular/core';
import axios from 'axios';
import { Pokemon, PokemonInfo } from './interfaces/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokedexbydrumsky';
  public pokeInfo: PokemonInfo[] = [];

  ngOnInit(): void {
    this.searchPokemon();
  }

  private async searchPokemon(): Promise<void> {
    try {
      const response = await axios.get<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`
      );
      const pokemons = response.data.results;
      const pokemonInfo = await Promise.all(
        pokemons.map(async (pokemon) => {
          const pokemonID = pokemon.url.split('/')[6];
          const infoResponse = await axios.get<PokemonInfo>(
            `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
          );
          return infoResponse.data;
        })
      );
      this.pokeInfo = pokemonInfo;
    } catch (error) {
      console.error(error);
    }
  }
}
