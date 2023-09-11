// External Dependencies
import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
  Theme as MuiTheme,
} from '@mui/material/styles';

interface PaletteAlert {
  info: string;
  warning: string;
}

interface PaletteEvents {
  hotelCta: string;
}

interface PaletteTable {
  background: string;
  header: string;
}

interface PaletteTexasFlag {
  blue: string;
  red: string;
}

interface PaletteLegacyGray {
  calm: string;
  copy: string;
  dark: string;
}

interface PaletteShapes {
  topNavHeight: number;
}

interface PaletteTFAA {
  about: string;
  background: string;
  backgroundLight: string;
  backgroundMediumLight: string;
  backgroundDark: string;
  events: string;
  grey: string;
  membership: string;
  resources: string;
  signIn: string;
  text: string;
}

interface PaletteUi {
  borderBlue: string;
  bright: string;
  light: string;
  lilac: string;
  whisper: string;
}

declare module '@mui/material/styles' {
  export type Theme = MuiTheme

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    mobile: true; // adds the `mobile` breakpoint
    md: true;
    lg: true;
    xl: true;
  }

  interface Palette extends MuiPalette {
    alert: PaletteAlert;
    altBackground: string;
    events: PaletteEvents;
    gatsby: string;
    legacyGray: PaletteLegacyGray;
    loginStatus: string;
    shapes: PaletteShapes;
    table: PaletteTable;
    texasFlag: PaletteTexasFlag;
    tfaa: PaletteTFAA;
    ui: PaletteUi;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    alert: PaletteAlert;
    altBackground: string;
    events: PaletteEvents;
    gatsby: string;
    legacyGray: PaletteLegacyGray;
    loginStatus: string;
    shapes: PaletteShapes;
    table: PaletteTable;
    texasFlag: PaletteTexasFlag;
    tfaa: PaletteTFAA;
    ui: PaletteUi;
  }
}
