/* eslint-disable react/style-prop-object */
import { memo, useCallback } from 'react';
import { Text, View, Image } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { Dimensions, FlatList, ImageBackground } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import ProfileImage from 'assets/Profile-Picture.png';
import ProfileBackground from 'assets/profileBackground.png';
import { usePokemon } from 'contexts/PokemonContext';
import { RootStackParamListType } from 'routes/index';
import { PokemonCard } from './PokemonCard';

type BaseScreenType = NativeStackScreenProps<
  RootStackParamListType,
  'Pokemons'
>;

const numColumns = Dimensions.get('screen').width > 320 ? 2 : 1;

const Screen: React.FC<BaseScreenType> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const { pokemons, loading, fetchNextPage, hasMorePages } = usePokemon();

  const Header = useCallback(
    () => (
      <View my={40}>
        <Text fontSize={24} bold lineHeight={31.2}>
          Qual pokémon você escolheria?
        </Text>
      </View>
    ),
    [],
  );
  const Footer = useCallback(
    () =>
      hasMorePages ? (
        <View flex={1} justifyContent="center" alignItems="center" my={16}>
          <LottieView
            // eslint-disable-next-line global-require
            source={require('../../assets/animation/pokeballLoading.json')}
            style={{ width: 80, height: 80 }}
            autoPlay
          />
        </View>
      ) : undefined,
    [hasMorePages],
  );

  return (
    <>
      <StatusBar style="light" animated />
      <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
        <View
          flexDirection="row"
          bgColor="#494949"
          borderBottomEndRadius={24}
          borderBottomStartRadius={24}
          alignItems="flex-end"
        >
          <View flex={1} mb={48} ml={22}>
            <Text fontSize={20} color="$white">
              Olá,{' '}
              <Text fontSize={20} bold color="$white">
                Ash Ketchum
              </Text>
            </Text>
            <Text color="$white" fontSize={14} fontWeight="$medium">
              Bem Vindo! 😄
            </Text>
          </View>
          <ImageBackground
            source={ProfileBackground}
            style={{
              width: 147,
              height: 147,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: insets.top * 0.4,
            }}
          >
            <Image
              source={ProfileImage}
              alt="Profile Image"
              width={47}
              height={47}
              ml={20}
              mt={12}
            />
          </ImageBackground>
        </View>
        {pokemons && (
          <FlatList
            data={pokemons}
            renderItem={({ item }) => (
              <PokemonCard
                onPress={() =>
                  navigation.navigate('Pokemon', { pokemon: item })
                }
                pokemon={item}
              />
            )}
            numColumns={2}
            contentContainerStyle={{ marginHorizontal: 16 }}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={Header}
            onEndReached={hasMorePages && !loading ? fetchNextPage : undefined}
            {...(numColumns > 1
              ? { columnWrapperStyle: { columnGap: 16 } }
              : {})}
            ListFooterComponent={Footer}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default memo(Screen);
