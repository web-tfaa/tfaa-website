import {
  amber, cyan, lightBlue, red
} from '@mui/material/colors';
import { createTheme } from '@mui/material';
import gray from 'gray-percentage';

// Local Variables
const defaultTheme = createTheme();

// A custom theme for this app, smartly merged with the default MUI theme
// The plugin 'gatsby-theme-material-ui' will use this theme
const theme = createTheme({
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      // as of 2022-12-10, the default breakpoints are:
      // xs: 0,
      // sm: 600,
      mobile: 768,
      // md: 900,
      // lg: 1200,
      // xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    alert: {
      info: lightBlue['500'],
      warning: amber['700'],
    },
    altBackground: '#f5f5f5',
    events: {
      hotelCta: cyan['200'],
    },
    gatsby: '#663399',
    legacyGray: {
      calm: gray(46, 270),
      copy: gray(12, 270),
      dark: gray(8, 270),
    },
    loginStatus: '#f5eefe',
    shapes: {
      topNavHeight: 128,
    },
    table: {
      background: 'linear-gradient(180deg, #B8CCE3, #EDF2F8)',
      header: '#EDF2F8',
    },
    texasFlag: {
      blue: '#002868',
      red: '#BF0A30',
    },
    tfaa: {
      about: '#CF0025',
      events: '#032A56',
      grey: '#DEDEDE',
      membership: '#005897',
      resources: '#009FAE',
      signIn: '#F05B21',
      text: '#333333',
    },
    ui: {
      borderBlue: '#2D456F',
      bright: '#ccd4e0',
      light: '#f5f3f7',
      lilac: '#9D7CBF',
      whisper: '#fbfafc',
    }
  },
  typography: {
    fontFamily: ['Spectral', 'Georgia', 'Times New Roman', 'Times', 'serif'].join(','),
    fontSize: 16,
  },
});

export default theme;
