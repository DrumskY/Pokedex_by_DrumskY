import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { PokemonInfo } from '../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  public pokemonDetails: PokemonInfo[] = [];
  public pokemonDetailsData!: PokemonInfo;
  name: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.initPokemonDetailsData().then((data) => {
      if (data) {
        this.pokemonDetailsData = data;
        console.log(this.pokemonDetailsData)
      }
    });
  }

  private async initPokemonDetailsData() {
    try {
      const pokemonInfoResponse = await axios.get<PokemonInfo>(
        `https://pokeapi.co/api/v2/pokemon/${this.name}`
      );
      console.log(pokemonInfoResponse.data)
      return pokemonInfoResponse.data;
    } catch (error) {
      console.error(error);
      return undefined
    }
  } 

}
