import { Config } from 'Config/index';
import { PokemonQueryResultsArrayType, PokemonType } from 'Types/PokemonsType';

export const calcFemaleGenderRatePercent = (value: number): number => {
  let result = (value / 8) * 100;
  if (result > 100) result = 100;
  if (result < 0) result = 0;
  return result;
};

export const calcMaleGenderRatePercent = (value: number): number => {
  let result = 100 - (value / 8) * 100;
  if (result > 100) result = 100;
  if (result < 0) result = 0;
  return result;
};

export const normalizePokemonsQueryResults = (
  results: PokemonQueryResultsArrayType[],
): PokemonType[] =>
  results.map((item) => ({
    id: item.id,
    pokedexIndex: `#${String(item.id).padStart(3, '0')}`,
    name: item.name,
    height: item.height ? item.height / 10 : undefined,
    weight: item.weight ? item.weight / 10 : undefined,
    color: item.specy.color.name,
    gender: {
      m: calcMaleGenderRatePercent(item.specy.gender_rate ?? 10),
      f: calcFemaleGenderRatePercent(item.specy.gender_rate ?? 10),
    },
    description: item?.specy?.descriptions?.[0]?.text ?? undefined,
    types: item.types.data.map((type) => type.type.name),
    image: `${Config.imageAPI.concat(String(item.id))}.png` ?? undefined,
    move: item.moves?.[0]?.move?.name ?? undefined,
    stats:
      item.stats?.map((s) => ({
        name: s.stat?.name,
        value: s.value,
      })) ?? undefined,
  }));
