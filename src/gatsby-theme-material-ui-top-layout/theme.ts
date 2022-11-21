import {
  amber, cyan, lightBlue, red
} from '@mui/material/colors';
import { createTheme } from '@mui/material';
import gray from 'gray-percentage';

// A custom theme for this app, smartly merged with the default MUI theme
// The plugin 'gatsby-theme-material-ui' will use this theme
const theme = createTheme({
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
    background: {
      default: '#fff',
    },
    alert: {
      info: lightBlue['500'],
      warning: amber['700'],
    },
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
    table: {
      background: 'linear-gradient(180deg, #B8CCE3, #EDF2F8)',
      header: '#EDF2F8',
    },
    texasFlag: {
      blue: '#002868',
      red: '#BF0A30',
    },
    ui: {
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
