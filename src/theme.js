// External Dependencies
import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const baseTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'Source Sans Pro',
    ].join(','),
  },
});

// This gives us some default responsive font sizes
const theme = responsiveFontSizes(baseTheme);

export default theme;
