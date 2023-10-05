import { API_BASE_URL, POKEAPI_IMAGE_URL } from '@env';

export const Config = {
  baseUrl: API_BASE_URL || 'https://beta.pokeapi.co/graphql/v1beta',
  imageAPI:
    POKEAPI_IMAGE_URL ||
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
};
