// External Dependencies
import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const baseTheme = createMuiTheme({
  typography: {
    fontFamily: ['Spectral', 'Georgia', 'Times New Roman', 'Times', 'serif'].join(','),
  },
});

// This gives us some default responsive font sizes
const theme = responsiveFontSizes(baseTheme);

export default theme;
