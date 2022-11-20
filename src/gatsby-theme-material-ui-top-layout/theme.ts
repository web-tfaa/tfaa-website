import {
  amber, cyan, lightBlue, red
} from '@mui/material/colors';
import { createTheme } from '@mui/material';

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
    table: {
      background: 'linear-gradient(180deg, #B8CCE3, #EDF2F8)',
      header: '#EDF2F8',
    }
  },
  typography: {
    fontFamily: ['Spectral', 'Georgia', 'Times New Roman', 'Times', 'serif'].join(','),
    fontSize: 16,
  },
});

export default theme;
