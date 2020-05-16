// External Dependencies
import { amber, lightBlue } from '@material-ui/core/colors';
import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const baseTheme = createMuiTheme({
  palette: {
    alert: {
      info: lightBlue['500'],
      warning: amber['700'],
    },
  },
  typography: {
    fontFamily: [
      'Spectral',
      'Georgia',
      'Times New Roman',
      'Times',
      'serif',
    ].join(','),
    fontSize: 16,
  },
});

// This gives us some default responsive font sizes
const theme = responsiveFontSizes(baseTheme);

export default theme;
