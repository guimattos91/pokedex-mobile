import { memo } from 'react';
import { View, Text, Image } from '@gluestack-ui/themed';
import { transparentize } from 'polished';
import { TouchableOpacity } from 'react-native';
import { pokemonColor, unslugify } from 'helpers/index';
import { PokemonType } from 'Types/PokemonsType';

interface IPokemonCardProps {
  pokemon: PokemonType;
  onPress: () => void;
}

const Component: React.FC<IPokemonCardProps> = ({ pokemon, onPress }) => {
  const colors =
    pokemonColor?.[pokemon.color as keyof typeof pokemonColor] ||
    pokemonColor.black;
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center' }}
      onPress={onPress}
    >
      <View
        bg={colors.background}
        p={16}
        borderRadius={15}
        marginBottom={8}
        maxWidth="100%"
        minWidth={190}
        alignSelf="center"
      >
        <Text color={colors.name} bold fontSize={14} mb={6}>
          {unslugify(pokemon.name)}
        </Text>
        <Text
          alignSelf="flex-end"
          color={colors.text}
          fontSize={14}
          fontWeight="$normal"
          position="absolute"
          right={8}
          top={4}
        >
          {pokemon.pokedexIndex}
        </Text>
        <View minWidth={60} minHeight={60}>
          {pokemon.types.map((type: string) => (
            <View
              bg={transparentize(0.7)(colors.name)}
              py={2}
              px={12}
              borderRadius="$full"
              mr="auto"
              mb={4}
              key={type}
            >
              <Text fontSize={14} color={colors.name}>
                {unslugify(type)}
              </Text>
            </View>
          ))}
        </View>
        {pokemon.image && (
          <Image
            source={{ uri: pokemon.image }}
            alt={pokemon.name}
            width={60}
            height={60}
            position="absolute"
            right={6}
            bottom={3}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(Component);
