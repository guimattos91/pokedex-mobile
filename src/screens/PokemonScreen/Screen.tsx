import { memo, useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { transparentize } from 'polished';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePokemon } from 'contexts/PokemonContext';
import { pokemonColor, unslugify } from 'helpers/index';
import { RootStackParamListType } from 'routes/index';
import { PokemonType } from 'Types/PokemonsType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseScreenType = NativeStackScreenProps<RootStackParamListType, 'Pokemon'>;

const Screen: React.FC<BaseScreenType> = ({ route, navigation }) => {
  const {
    pokemon: requestPokemon,
    fetchPokemon,
    setPokemon: setRequestPokemon,
  } = usePokemon();
  const [pokemon, setPokemon] = useState<PokemonType>(route.params.pokemon);
  const colors =
    pokemonColor?.[pokemon.color as keyof typeof pokemonColor] ||
    pokemonColor.black;

  useEffect(() => {
    if (requestPokemon) {
      setPokemon(requestPokemon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestPokemon]);

  useEffect(() => {
    fetchPokemon({ variables: { name: route.params.pokemon.name } });

    return () => {
      setRequestPokemon(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar
        style={pokemon.color === 'white' ? 'dark' : 'light'}
        animated
      />

      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <View m={16}>
          <View flexDirection="row" justifyContent="space-between" mb={13}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={24} color={colors.name} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="heart-outlined" size={24} color={colors.name} />
            </TouchableOpacity>
          </View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color={colors.name} fontSize={36} lineHeight={40}>
              {unslugify(pokemon.name)}
            </Text>
            <Text color={colors.name} fontSize={18} fontWeight="$extrabold">
              {unslugify(pokemon.pokedexIndex)}
            </Text>
          </View>
          <View flexDirection="row" gap={7} mt={4}>
            {pokemon.types.map((type: string) => (
              <View
                bg={transparentize(0.7)(colors.name)}
                py={2}
                px={12}
                borderRadius="$full"
                mb={4}
                key={type}
              >
                <Text fontSize={14} color={colors.name}>
                  {unslugify(type)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default memo(Screen);
