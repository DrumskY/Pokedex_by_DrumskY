import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import {
  PokemonEvolves,
  PokemonInfo,
  PokemonSpecies,
} from '../interfaces/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  public pokemonDetails: PokemonInfo[] = [];
  public pokemonDetailsData!: PokemonInfo;
  public pokemonSpecies!: PokemonSpecies;
  public pokemonEvolution!: PokemonEvolves;
  public pokemonTypes: any = [];
  name: string | undefined;

  firstEvolutions: any = [];
  secondEvolutions: any = [];
  thirdEvolutions: any = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.name = params['name'];
      this.initPokemonDetailsData().then((data) => {
        if (data) {
          this.pokemonDetailsData = data;
          this.initPokemonDetailsSpeciesData().then((speciesData) => {
            if (speciesData) {
              this.pokemonSpecies = speciesData;
              this.initPokemonEvolutionData().then((evolutionData) => {
                if (evolutionData) {
                  this.pokemonEvolution = evolutionData;
                }
              });
            }
          });
          this.initPokemonTypesData();
        }
      });
    });
  }

  findChar(text: string): string {
    return (text = text.replace(/\f/g, ' '));
  }

  limitValue(value: number): number {
    return Math.min(value, 100);
  }

  goToPokemonHomePage() {
    this.router.navigate(['/']);
  }

  goToPokemonDetails(pokemon: string) {
    this.router.navigate(['/pokemon', pokemon]);
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

  getClassColor(typeName: string) {
    switch (typeName) {
      case 'normal':
        return 'normal-class-color';
      case 'fire':
        return 'fire-class-color';
      case 'water':
        return 'water-class-color';
      case 'electric':
        return 'electric-class-color';
      case 'grass':
        return 'grass-class-color';
      case 'ice':
        return 'ice-class-color';
      case 'fighting':
        return 'fighting-class-color';
      case 'poison':
        return 'poison-class-color';
      case 'ground':
        return 'ground-class-color';
      case 'flying':
        return 'flying-class-color';
      case 'psychic':
        return 'psychic-class-color';
      case 'bug':
        return 'bug-class-color';
      case 'rock':
        return 'rock-class-color';
      case 'ghost':
        return 'ghost-class-color';
      case 'dragon':
        return 'dragon-class-color';
      case 'dark':
        return 'dark-class-color';
      case 'steel':
        return 'steel-class-color';
      case 'fairy':
        return 'fairy-class-color';
      default:
        return '';
    }
  }

  private async initPokemonDetailsData() {
    try {
      const pokemonInfoResponse = await axios.get<PokemonInfo>(
        `https://pokeapi.co/api/v2/pokemon/${this.name}`
      );
      return pokemonInfoResponse.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private async initPokemonDetailsDataForImageShiny(name: string) {
    try {
      const pokemonInfoShinyResponse = await axios.get<PokemonInfo>(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      return pokemonInfoShinyResponse.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private async initPokemonTypesData(): Promise<void> {
    this.pokemonTypes = [];
    try {
      for (const type of this.pokemonDetailsData.types) {
        const pokemonInfoResponse = await axios.get(type.type.url);
        this.pokemonTypes.push(pokemonInfoResponse.data);
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private async initPokemonDetailsSpeciesData() {
    try {
      const pokemonInfoResponse = await axios.get<PokemonSpecies>(
        `${this.pokemonDetailsData.species.url}`
      );
      return pokemonInfoResponse.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private async initPokemonEvolutionData() {
    try {
      const pokemonInfoResponse = await axios.get<PokemonEvolves>(
        `${this.pokemonSpecies.evolution_chain.url}`
      );

      const firstEvolutionChain =
        await this.initPokemonDetailsDataForImageShiny(
          pokemonInfoResponse.data.chain.species.name
        );
      this.firstEvolutions = [
        {
          name: pokemonInfoResponse.data.chain.species.name,
          image: firstEvolutionChain?.sprites.front_shiny,
        },
      ];

      if (pokemonInfoResponse.data.chain.evolves_to.length > 0) {
        const secondEvolutionChain =
          await this.initPokemonDetailsDataForImageShiny(
            pokemonInfoResponse.data.chain.evolves_to[0].species.name
          );
        this.secondEvolutions = [
          {
            name: pokemonInfoResponse.data.chain.evolves_to[0].species.name,
            image: secondEvolutionChain?.sprites.front_shiny,
          },
        ];
      }

      if (
        pokemonInfoResponse.data.chain.evolves_to.length > 0 &&
        pokemonInfoResponse.data.chain.evolves_to[0].evolves_to.length > 0
      ) {
        const thirdEvolutionChain =
          await this.initPokemonDetailsDataForImageShiny(
            pokemonInfoResponse.data.chain.evolves_to[0].evolves_to[0].species
              .name
          );
        this.thirdEvolutions = [
          {
            name: pokemonInfoResponse.data.chain.evolves_to[0].evolves_to[0]
              .species.name,
            image: thirdEvolutionChain?.sprites.front_shiny,
          },
        ];
      }

      return pokemonInfoResponse.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
