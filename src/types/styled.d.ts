// External Dependencies
import 'styled-components';
import { createTheme } from '@mui/material/styles';
import { Theme as MuiTheme } from '../gatsby-theme-material-ui-top-layout/theme';

type Theme = ReturnType<typeof createTheme>;

export type PropsWithTheme<T> = T & { theme: Theme };

// and extend them!
declare module 'styled-components' {
  export type DefaultTheme = MuiTheme
}
