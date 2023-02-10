export interface Pokemon {
  count: number;
  next: string;
  previous: null;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonInfo {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  version_group: Species;
}

export interface GenerationV {
  'black-white': Sprites;
}

export interface GenerationIv {
  'diamond-pearl': Sprites;
  'heartgold-soulsilver': Sprites;
  platinum: Sprites;
}

export interface Versions {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': { [key: string]: GenerationVi };
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  'red-blue': RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Crystal;
  silver: Crystal;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface GenerationIii {
  emerald: Emerald;
  'firered-leafgreen': Crystal;
  'ruby-sapphire': Crystal;
}

export interface Emerald {
  front_default: string;
  front_shiny: string;
}

export interface GenerationVi {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationVii {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': GenerationVi;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dream_world: DreamWorld;
  'official-artwork': OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export interface Color {
  name: string;
  url: string;
}

export interface EggGroup {
  name: string;
  url: string;
}

export interface EvolutionChain {
  url: string;
}

export interface EvolvesFromSpecies {
  name: string;
  url: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}

export interface Language2 {
  name: string;
  url: string;
}

export interface Genera {
  genus: string;
  language: Language2;
}

export interface Generation {
  name: string;
  url: string;
}

export interface GrowthRate {
  name: string;
  url: string;
}

export interface Habitat {
  name: string;
  url: string;
}

export interface Language3 {
  name: string;
  url: string;
}

export interface Name {
  language: Language3;
  name: string;
}

export interface Area {
  name: string;
  url: string;
}

export interface PalParkEncounter {
  area: Area;
  base_score: number;
  rate: number;
}

export interface Pokedex {
  name: string;
  url: string;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: Pokedex;
}

export interface Shape {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface Variety {
  is_default: boolean;
  pokemon: Pokemon;
}

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: EggGroup[];
  evolution_chain: EvolutionChain;
  evolves_from_species: EvolvesFromSpecies;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: Generation;
  growth_rate: GrowthRate;
  habitat: Habitat;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Shape;
  varieties: Variety[];
}

export interface Trigger {
  name: string;
  url: string;
}

export interface EvolutionDetail {
  gender?: any;
  held_item?: any;
  item?: any;
  known_move?: any;
  known_move_type?: any;
  location?: any;
  min_affection?: any;
  min_beauty?: any;
  min_happiness?: any;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species?: any;
  party_type?: any;
  relative_physical_stats?: any;
  time_of_day: string;
  trade_species?: any;
  trigger: Trigger;
  turn_upside_down: boolean;
}

export interface Trigger2 {
  name: string;
  url: string;
}

export interface EvolutionDetail2 {
  gender?: any;
  held_item?: any;
  item?: any;
  known_move?: any;
  known_move_type?: any;
  location?: any;
  min_affection?: any;
  min_beauty?: any;
  min_happiness?: any;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species?: any;
  party_type?: any;
  relative_physical_stats?: any;
  time_of_day: string;
  trade_species?: any;
  trigger: Trigger2;
  turn_upside_down: boolean;
}

export interface Species {
  name: string;
  url: string;
}

export interface EvolvesTo2 {
  evolution_details: EvolutionDetail2[];
  evolves_to: any[];
  is_baby: boolean;
  species: Species;
}

export interface Species2 {
  name: string;
  url: string;
}

export interface EvolvesTo {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolvesTo2[];
  is_baby: boolean;
  species: Species2;
}

export interface Species3 {
  name: string;
  url: string;
}

export interface Chain {
  evolution_details: any[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Species3;
}

export interface PokemonEvolves {
  baby_trigger_item?: any;
  chain: Chain;
  id: number;
}
