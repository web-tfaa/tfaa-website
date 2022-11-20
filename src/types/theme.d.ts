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

interface PaletteEvents {
  hotelCta: string;
}

interface PaletteTable {
  background: string;
  header: string;
}

declare module '@mui/material/styles' {
  export type Theme = MuiTheme

  interface Palette extends MuiPalette {
    alert: PaletteAlert;
    events: PaletteEvents;
    table: PaletteTable;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    alert: PaletteAlert;
    events: PaletteEvents;
    table: PaletteTable;
  }

  interface PaletteColor extends MuiPaletteColor {
    alert?: PaletteAlert;
    events?: PaletteEvents;
    table?: PaletteTable;
  }

  interface SimplePaletteColorOptions extends MuiSimplePaletteColorOptions {
    alert?: PaletteAlert;
    events?: PaletteEvents;
    table?: PaletteTable;
  }
}
