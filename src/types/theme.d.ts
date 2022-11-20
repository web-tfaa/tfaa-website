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

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme { }

  interface Palette extends MuiPalette {
    alert: PaletteAlert;
    events: PaletteEvents;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    alert: PaletteAlert;
    events: PaletteEvents;
  }

  interface PaletteColor extends MuiPaletteColor {
    alert?: PaletteAlert;
    events?: PaletteEvents;
  }

  interface SimplePaletteColorOptions extends MuiSimplePaletteColorOptions {
    alert?: PaletteAlert;
    events?: PaletteEvents;
  }
}
