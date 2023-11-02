import { memo, useCallback, useEffect, useState } from 'react';
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  Image,
  Icon,
  Progress,
  ProgressFilledTrack,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AnimatedLottieView from 'lottie-react-native';
import { transparentize } from 'polished';
import { Dimensions, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { normalizePokemonsQueryResults } from 'contexts/helpers';
import { usePokemon } from 'contexts/PokemonContext';
import { pokemonColor, unslugify } from 'helpers/index';
import { RootStackParamListType } from 'routes/index';
import { PokemonType } from 'Types/PokemonsType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseScreenType = NativeStackScreenProps<RootStackParamListType, 'Pokemon'>;

const imageWidth = Dimensions.get('screen').width * 0.5;

const Screen: React.FC<BaseScreenType> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { fetchPokemon } = usePokemon();
  const [pokemon, setPokemon] = useState<PokemonType>(route.params.pokemon);
  const colors =
    pokemonColor?.[pokemon?.color as keyof typeof pokemonColor] ||
    pokemonColor.black;

  const handleFetchPokemon = useCallback(async () => {
    const { data: pokemonData } = await fetchPokemon({
      variables: { name: route.params.pokemon.name },
    });

    if (!!pokemonData && Array.isArray(pokemonData.results)) {
      setPokemon(
        normalizePokemonsQueryResults(pokemonData.results)?.[0] ?? null,
      );
    }
  }, [fetchPokemon, route.params.pokemon.name]);

  useEffect(() => {
    handleFetchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sumOfStats = pokemon?.stats?.reduce(
    (partialSum, stat) => partialSum + stat.value,
    0,
  );

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
        <ScrollView>
          <View m={20}>
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
          <Image
            source={{ uri: pokemon.image }}
            alt={pokemon.name}
            h={imageWidth}
            w={imageWidth}
            alignSelf="center"
            zIndex={2}
          />
          <View
            bg="$white"
            px={20}
            pb={Math.max(insets.bottom, 20)}
            pt={imageWidth * 0.3}
            mt={-imageWidth * 0.3}
            flex={1}
            borderTopLeftRadius={28}
            borderTopRightRadius={28}
          >
            <Text fontSize={20} bold color={colors.background}>
              Description
            </Text>
            {!pokemon.move ? (
              <View minHeight={Dimensions.get('screen').height}>
                <AnimatedLottieView
                  // eslint-disable-next-line global-require
                  source={require('../../assets/animation/squirtle.json')}
                  style={{ width: '100%' }}
                  autoPlay
                />
              </View>
            ) : (
              <>
                <Text fontSize={14} mt={41}>
                  {pokemon.description}
                </Text>
                <View mt={32} flexDirection="row">
                  <View
                    alignItems="center"
                    borderRightWidth={1}
                    borderRightColor="$coolGray200"
                    flex={1}
                    p={12}
                    justifyContent="center"
                  >
                    <View flexDirection="row" alignItems="center">
                      <Icon name="weight" as={FontAwesome5} size={16} mr={8} />
                      <Text fontSize={14} fontWeight="$medium">
                        {pokemon.weight} Kg
                      </Text>
                    </View>
                    <Text fontSize={12}>Weight</Text>
                  </View>
                  <View
                    alignItems="center"
                    borderRightWidth={1}
                    borderRightColor="$coolGray200"
                    flex={1}
                    p={12}
                    justifyContent="center"
                  >
                    <View flexDirection="row" alignItems="center">
                      <Icon
                        name="ruler-vertical"
                        as={FontAwesome5}
                        size={16}
                        mr={8}
                      />
                      <Text fontSize={14} fontWeight="$medium">
                        {pokemon.height} m
                      </Text>
                    </View>
                    <Text fontSize={12}> Height</Text>
                  </View>
                  <View
                    p={12}
                    alignItems="center"
                    flex={1}
                    justifyContent="center"
                  >
                    <Text fontSize={14} fontWeight="$medium" textAlign="center">
                      {pokemon.move && unslugify(pokemon.move)}
                    </Text>
                    <Text fontSize={12} textAlign="center">
                      Main power
                    </Text>
                  </View>
                </View>
                <View mt={30}>
                  <Text fontSize={16} fontWeight="$medium">
                    Characteristics
                  </Text>
                  <View flexDirection="row" mt={16}>
                    <View w={150}>
                      <Text
                        fontSize={14}
                        fontWeight="$medium"
                        allowFontScaling={false}
                      >
                        Gender
                      </Text>
                    </View>
                    <View flexDirection="row" flex={1}>
                      <View flexDirection="row" mr={12} alignItems="center">
                        <Icon
                          name="gender-male"
                          as={MaterialCommunityIcons}
                          size={15}
                          color="$blue500"
                          mr={4}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="$bold"
                          allowFontScaling={false}
                        >
                          {pokemon.gender?.m}%
                        </Text>
                      </View>
                      <View flexDirection="row" alignItems="center">
                        <Icon
                          name="gender-female"
                          as={MaterialCommunityIcons}
                          size={15}
                          color="$pink500"
                          mr={4}
                        />
                        <Text
                          fontSize={14}
                          fontWeight="$bold"
                          allowFontScaling={false}
                        >
                          {pokemon.gender?.f}%
                        </Text>
                      </View>
                    </View>
                  </View>
                  {pokemon.stats?.map((stat) => (
                    <View
                      flexDirection="row"
                      alignItems="center"
                      mt={14}
                      key={stat.name}
                    >
                      <View w={110}>
                        <Text
                          fontSize={14}
                          fontWeight="$medium"
                          allowFontScaling={false}
                        >
                          {unslugify(stat.name)}
                        </Text>
                      </View>
                      <View w={30} mx={5}>
                        <Text fontSize={14} allowFontScaling={false}>
                          {stat.value}
                        </Text>
                      </View>
                      <View flex={1}>
                        <Progress value={stat.value} w="$full" max={120} h={3}>
                          <ProgressFilledTrack
                            h={3}
                            bgColor={stat.value <= 60 ? '$red500' : '$green400'}
                          />
                        </Progress>
                      </View>
                    </View>
                  ))}
                  <View flexDirection="row" alignItems="center" mt={14}>
                    <View w={110}>
                      <Text
                        fontSize={14}
                        fontWeight="$medium"
                        allowFontScaling={false}
                      >
                        Total
                      </Text>
                    </View>
                    <View w={30} mx={5}>
                      <Text fontSize={14} allowFontScaling={false}>
                        {sumOfStats}
                      </Text>
                    </View>
                    <View flex={1}>
                      <Progress value={sumOfStats} w="$full" max={720} h={3}>
                        <ProgressFilledTrack
                          h={3}
                          bgColor={
                            sumOfStats && sumOfStats <= 720 / 2
                              ? '$red500'
                              : '$green400'
                          }
                        />
                      </Progress>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default memo(Screen);
