import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Pokemon, PokemonInfo, PokemonResult } from '../interfaces/pokemon';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
})
export class HomeBodyComponent {
  changePage: number = 0;
  changeLimit: number = 40;

  public searchTerm: string = '';

  public urlIdLookup: any;
  public pokemons: PokemonResult[] = [];
  public pokemonInfo: PokemonInfo[] = [];
  public filteredPokemon: PokemonResult[] = [];
  public filteredPokemonInfo: PokemonInfo[] = [];

  public pokemonsByType: PokemonResult[] = [];
  public pokemonInfoByType: PokemonInfo[] = [];
  public filteredPokemonByType: PokemonResult[] = [];

  public pokemonsOnSearch: PokemonResult[] = [];
  public pokemonInfoOnSearch: PokemonInfo[] = [];
  public filteredPokemonOnSearch: PokemonResult[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // lifecycle hook
    this.initPokemonData();
    this.searchPokemon();
    this.searchByTypePokemon();
  }

  goToPokemonDetails(pokemon: string) {
    this.router.navigate(['/pokemon', pokemon]);
  }

  prevPage(): void {
    this.changePage -= 40;
    this.pokemonInfo = [];
    this.initPokemonData();
  }

  nextPage(): void {
    this.changePage += 40;
    this.pokemonInfo = [];
    this.initPokemonData();
  }

  getClassBackground(typeName: string) {
    switch (typeName) {
      case 'normal':
        return 'normal-class-background';
      case 'fire':
        return 'fire-class-background';
      case 'water':
        return 'water-class-background';
      case 'electric':
        return 'electric-class-background';
      case 'grass':
        return 'grass-class-background';
      case 'ice':
        return 'ice-class-background';
      case 'fighting':
        return 'fighting-class-background';
      case 'poison':
        return 'poison-class-background';
      case 'ground':
        return 'ground-class-background';
      case 'flying':
        return 'flying-class-background';
      case 'psychic':
        return 'psychic-class-background';
      case 'bug':
        return 'bug-class-background';
      case 'rock':
        return 'rock-class-background';
      case 'ghost':
        return 'ghost-class-background';
      case 'dragon':
        return 'dragon-class-background';
      case 'dark':
        return 'dark-class-background';
      case 'steel':
        return 'steel-class-background';
      case 'fairy':
        return 'fairy-class-background';
      default:
        return '';
    }
  }

  async initPokemonData(): Promise<void> {
    try {
      const pokemonResponse = await axios.get<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon?offset=${this.changePage}&&limit=${this.changeLimit}`
      );

      const results = pokemonResponse.data.results;
      this.urlIdLookup = results.reduce(
        (acc, cur, idx) =>
          (acc = { ...acc, [cur.name]: idx + 1 + this.changePage }),
        {}
      );

      const pokemonInfoRequests = results.map(
        async (pokemon: PokemonResult) => {
          const pokemonID = this.urlIdLookup[pokemon.name];
          const pokemonInfoResponse = await axios.get<PokemonInfo>(
            `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
          );
          return pokemonInfoResponse.data;
        }
      );

      this.pokemonInfo = await Promise.all(pokemonInfoRequests);

      this.filterPokemon();
    } catch (error) {
      console.error(error);
    }
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
      this.pokemonInfoOnSearch = pokemonInfo;
    } catch (error) {
      console.error(error);
    }
  }

  private async searchByTypePokemon(): Promise<void> {
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
      this.pokemonInfoByType = pokemonInfo;
    } catch (error) {
      console.error(error);
    }
  }

  public filterByType(type: string) {
    this.filteredPokemonInfo = this.pokemonInfoByType.filter((pokemon) => {
      return pokemon.types.find(
        (pokemonType) => pokemonType.type.name === type
      );
    });
  }

  public filterPokemon(): void {
    this.filteredPokemonInfo = this.searchTerm
      ? this.pokemonInfo.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.pokemonInfo;
  }

  public filterPokemonOnSearch(): void {
    this.filteredPokemonInfo = this.searchTerm
      ? this.pokemonInfoOnSearch.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.pokemonInfo;
  }

  public onSearchInput(searchTerm: string): void {
    this.searchTerm = searchTerm;
    if (!searchTerm) {
      this.filterPokemon();
      return;
    }
    this.filterPokemonOnSearch();
  }
}
