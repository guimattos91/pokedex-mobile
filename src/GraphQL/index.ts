import { gql } from '@apollo/client';

export const GET_POKEMONS_QUERY = gql`
  query listPokemonQuery($limit: Int, $offset: Int, $search: String) {
    results: pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: { name: { _regex: $search } }
    ) {
      id
      name
      types: pokemon_v2_pokemontypes_aggregate {
        data: nodes {
          type: pokemon_v2_type {
            name
          }
        }
      }
      specy: pokemon_v2_pokemonspecy {
        color: pokemon_v2_pokemoncolor {
          name
        }
      }
      images: pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_POKEMON_QUERY = gql`
  query onePokemonQuery($name: String) {
    results: pokemon_v2_pokemon(limit: 1, where: { name: { _eq: $name } }) {
      id
      name
      height
      weight

      types: pokemon_v2_pokemontypes_aggregate {
        data: nodes {
          type: pokemon_v2_type {
            name
          }
        }
      }

      specy: pokemon_v2_pokemonspecy {
        color: pokemon_v2_pokemoncolor {
          name
        }
        gender_rate
        has_gender_differences
        descriptions: pokemon_v2_pokemonspeciesflavortexts(
          limit: 1
          where: { language_id: { _eq: 9 } }
          distinct_on: flavor_text
        ) {
          text: flavor_text
        }
      }

      images: pokemon_v2_pokemonsprites {
        sprites
      }

      moves: pokemon_v2_pokemonmoves(order_by: { level: desc }, limit: 1) {
        move: pokemon_v2_move {
          name
        }
      }

      stats: pokemon_v2_pokemonstats {
        value: base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
    }
  }
`;
