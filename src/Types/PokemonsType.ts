export type PokemonQueryResultsArrayType = {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  specy: {
    color: {
      name: string;
    };
    gender_rate?: number;
    has_gender_differences?: boolean;
    descriptions?: { text: string }[];
  };
  types: {
    data: {
      type: {
        name: string;
      };
    }[];
  };
  images: string;
  moves: { move: { name: string } }[];
  stats?: {
    value: number;
    stat: {
      name: string;
    };
  }[];
};

export type PokemonsQueryResultDataType = {
  results: PokemonQueryResultsArrayType[];
};

export type PokemonType = {
  id: number;
  pokedexIndex: string;
  name: string;
  height?: number;
  weight?: number;
  color: string;
  types: string[];
  gender?: { m: number; f: number };
  description?: string;
  image: string | undefined;
  move?: string;
  stats?: { name: string; value: number }[];
};
