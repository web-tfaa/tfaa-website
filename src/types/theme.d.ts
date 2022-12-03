// External Dependencies
import {
  Palette as MuiPalette,
  PaletteColor as MuiPaletteColor,
  PaletteOptions as MuiPaletteOptions,
  SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
  Theme as MuiTheme,
} from '@mui/material/styles';

interface PaletteAlert {
  info: string;
  warning: string;
}

interface PaletteCta {
  cyan: string;
  orange: string;
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

interface PaletteUi {
  borderBlue: string;
  bright: string;
  light: string;
  lilac: string;
  whisper: string;
}

declare module '@mui/material/styles' {
  export type Theme = MuiTheme

  interface Palette extends MuiPalette {
    alert: PaletteAlert;
    altBackground: string;
    cta: PaletteCta;
    events: PaletteEvents;
    gatsby: string;
    legacyGray: PaletteLegacyGray;
    loginStatus: string;
    shapes: PaletteShapes;
    table: PaletteTable;
    texasFlag: PaletteTexasFlag;
    ui: PaletteUi;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    alert: PaletteAlert;
    altBackground: string;
    cta: PaletteCta;
    events: PaletteEvents;
    gatsby: string;
    legacyGray: PaletteLegacyGray;
    loginStatus: string;
    shapes: PaletteShapes;
    table: PaletteTable;
    texasFlag: PaletteTexasFlag;
    ui: PaletteUi;
  }

  interface PaletteColor extends MuiPaletteColor {
    alert?: PaletteAlert;
    altBackground?: string;
    cta?: PaletteCta;
    events?: PaletteEvents;
    gatsby?: string;
    legacyGray?: PaletteLegacyGray;
    loginStatus?: string;
    shapes?: PaletteShapes;
    table?: PaletteTable;
    texasFlag?: PaletteTexasFlag;
    ui?: PaletteUi;
  }

  interface SimplePaletteColorOptions extends MuiSimplePaletteColorOptions {
    alert?: PaletteAlert;
    altBackground?: string;
    cta?: PaletteCta;
    events?: PaletteEvents;
    gatsby?: string;
    legacyGray?: PaletteLegacyGray;
    loginStatus?: string;
    shapes?: PaletteShapes;
    table?: PaletteTable;
    texasFlag?: PaletteTexasFlag;
    ui?: PaletteUi;
  }
}
