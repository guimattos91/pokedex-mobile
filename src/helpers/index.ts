export const unslugify = (slug: string): string =>
  slug
    .split('-')
    .map((item) => `${item[0].toLocaleUpperCase()}${item.substring(1)}`)
    .join(' ');

export const pokemonColor = {
  black: {
    background: '#000000',
    text: '#FFF',
    name: '#FFF',
  },
  blue: {
    background: '#77BDFE',
    text: '#4689C7',
    name: '#FFF',
  },
  brown: {
    background: '#CE8083',
    text: '#9B4043',
    name: '#FFF',
  },
  gray: {
    background: '#393332',
    text: '#FFF',
    name: '#FFF',
  },
  green: {
    background: '#48D0B0',
    text: '#3E8570',
    name: '#FFF',
  },
  pink: {
    background: '#F2CDD6',
    text: '#FB6C6C',
    name: '#FFF',
  },
  purple: {
    background: '#A499C1',
    text: '#575176',
    name: '#FFF',
  },
  red: {
    background: '#FB6C6C',
    text: '#DE5050',
    name: '#FFF',
  },
  white: {
    background: '#FFFFFF',
    text: '#000',
    name: '#000',
  },
  yellow: {
    background: '#FFCE4B',
    text: '#BF8400',
    name: '#FFF',
  },
};
