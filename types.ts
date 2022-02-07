export interface PokemonsType {
  count: number;
  results: [
    {
      url: string;
      name: string;
      artwork: string;
    }
  ];
}
export interface PokemonsProps {
  pokemons: PokemonsType;
  count: number;
  page: string;
}
export interface PokemonType {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
}
export interface PokemonsResponseType {
  pokemons: PokemonsType;
}
export interface PokemonResponseType {
  pokemon: PokemonType;
}
