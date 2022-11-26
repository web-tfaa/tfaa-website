import '@emotion/react';
import { Theme as MuiTheme } from '../gatsby-theme-material-ui-top-layout/theme';

declare module '@emotion/react' {
  export type Theme = MuiTheme;
}
