/* eslint-disable arrow-parens */
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ApolloQueryResult,
  LazyQueryExecFunction,
  OperationVariables,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
// eslint-disable-next-line import/no-unresolved
import { GET_POKEMONS_QUERY, GET_POKEMON_QUERY } from 'GraphQL/index';
import { PokemonType, PokemonsQueryResultDataType } from 'Types/PokemonsType';

import { normalizePokemonsQueryResults } from './helpers';

interface IContextProps {
  loading: boolean;
  pokemonLoading: boolean;
  hasMorePages: boolean;
  pokemons: PokemonType[];
  pokemon: PokemonType | null;
  pokemonData: PokemonsQueryResultDataType | undefined;
  isFetchingMore: boolean;
  setPokemon: Dispatch<SetStateAction<PokemonType | null>>;
  fetchPokemon: LazyQueryExecFunction<
    PokemonsQueryResultDataType,
    OperationVariables
  >;
  handleSetMore: () => Promise<void>;
  fetchNextPage: () => void;
  refetchPokemons: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<PokemonsQueryResultDataType>>;
  setSearchPokemons: Dispatch<SetStateAction<string>>;
  searchPokemons: string;
}

interface IPokemonProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

const RESULT_PER_PAGE = 24;

export const PokemonProvider: React.FC<IPokemonProviderProps> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [searchPokemons, setSearchPokemons] = useState('');
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data,
    loading,
    refetch: refetchPokemons,
    fetchMore,
  } = useQuery<PokemonsQueryResultDataType>(GET_POKEMONS_QUERY, {
    variables: { limit: RESULT_PER_PAGE, offset, search: searchPokemons },
  });

  const fetchNextPage = useCallback(() => {
    if (!isFetchingMore) setOffset((prev) => prev + RESULT_PER_PAGE);
  }, [isFetchingMore]);

  const handleSetMore = useCallback(async () => {
    setIsFetchingMore(true);
    const { data: fetchMoreData } = await fetchMore({
      variables: { limit: RESULT_PER_PAGE, offset, search: searchPokemons },
    });
    if (!!fetchMoreData && Array.isArray(fetchMoreData.results)) {
      setPokemons((prev) => [
        ...prev,
        ...normalizePokemonsQueryResults(fetchMoreData.results),
      ]);
      setHasMorePages(fetchMoreData.results.length >= RESULT_PER_PAGE);
    }
    setIsFetchingMore(false);
  }, [fetchMore, offset, searchPokemons]);

  const [fetchPokemon, { data: pokemonData, loading: pokemonLoading }] =
    useLazyQuery<PokemonsQueryResultDataType>(GET_POKEMON_QUERY);

  // useEffect(() => {
  //   if (!!pokemonData && Array.isArray(pokemonData.results)) {
  //     setPokemon(
  //       normalizePokemonsQueryResults(pokemonData.results)?.[0] ?? null,
  //     );
  //   }
  // }, [pokemonData]);

  useEffect(() => {
    if (offset > 0 && !isFetchingMore) {
      handleSetMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    if (!!data && Array.isArray(data.results) && offset === 0) {
      setPokemons(normalizePokemonsQueryResults(data.results));

      setHasMorePages(data.results.length >= RESULT_PER_PAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!loading) {
      refetchPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPokemons]);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          loading,
          pokemons,
          pokemonLoading,
          pokemon,
          pokemonData,
          hasMorePages,
          searchPokemons,
          isFetchingMore,
          setPokemon,
          fetchNextPage,
          fetchPokemon,
          refetchPokemons,
          setSearchPokemons,
          handleSetMore,
        }),
        [
          loading,
          pokemons,
          pokemonLoading,
          pokemon,
          pokemonData,
          hasMorePages,
          searchPokemons,
          isFetchingMore,
          fetchNextPage,
          fetchPokemon,
          refetchPokemons,
          handleSetMore,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const usePokemon = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useMyCustomHook must be within MyCustomProvider');
  }

  return context;
};
