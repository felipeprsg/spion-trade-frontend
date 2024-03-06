import { extendTheme } from '@chakra-ui/react';

import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const theme = extendTheme({
  fonts: {
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
  },
  colors: {
    primary: '#058859',
    primaryColorScheme: {
      500: '#058859',
    },
    gray: {
      200: '#191A1F', // for borders
      400: '#A6A8B1', // for light text (secondary)
      500: '#131417', // for neutral background
      600: '#0F0F10', // for neutral dark
    },
    grayColorScheme: {
      500: '#E2E8F0',
    },
    green: '#058859',
    red: '#C63434',
  },
  components: {
    Heading: {
      baseStyle: {
        color: 'white',
        fontWeight: '500',
      },
    },
    Text: {
      baseStyle: {
        color: '#A6A8B1',
        lineHeight: '17px',
        fontSize: 'sm',
        fontWeight: '400',
      },
    },
    Button: {
      baseStyle: {
        w: '100%',
        fontWeight: '500',
        rounded: 'md',
        _hover: {
          opacity: 0.75,
          textDecoration: 'none',
        },
        _active: {
          opacity: 0.5,
          textDecoration: 'none',
        },
      },
      variants: {
        primary: {
          bgColor: '#058859',
        },
        ghost: {
          w: 'min',
          bgColor: 'transparent',
          _hover: {
            bgColor: 'transparent',
            opacity: 0.75,
            textDecoration: 'none',
          },
          _active: {
            bgColor: 'transparent',
            opacity: 0.5,
            textDecoration: 'none',
          },
        },
      },
    },
  },
});
