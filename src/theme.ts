import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#319795',
      600: '#277e6a',
      700: '#234e52',
      800: '#1a202c',
      900: '#171923',
    },
    primary: {
      50: '#e6f6ff',
      100: '#b3e0ff',
      200: '#80caff',
      300: '#4db3ff',
      400: '#1a9dff',
      500: '#007acc',
      600: '#005fa3',
      700: '#00447a',
      800: '#002a52',
      900: '#00112a',
    },
  },
  fonts: {
    heading: 'Inter, Poppins, system-ui, sans-serif',
    body: 'Inter, Poppins, system-ui, sans-serif',
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'full',
        transition: 'all 0.2s',
      },
      defaultProps: {
        colorScheme: 'teal',
      },
    },
    Card: {
      baseStyle: {
        borderRadius: 'xl',
        boxShadow: 'md',
        transition: 'all 0.2s',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.800' : 'gray.100',
        fontFamily: 'Inter, Poppins, system-ui, sans-serif',
      },
      '::selection': {
        background: 'teal.100',
      },
    }),
  },
})

export default theme 