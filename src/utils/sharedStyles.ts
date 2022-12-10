// External Dependencies
import { Theme } from '@mui/material';

// Internal Dependencies
import presets from './presets';
import { options } from './typography';

export const anchorStyles = (theme : Theme) => ({
  color: 'inherit',
  textDecoration: 'none',
  transition: `all ${presets.animation.speedFast} ${presets.animation.curveDefault}`,
  borderBottom: `1px solid ${theme.palette.ui.bright}`,
  boxShadow: `inset 0 -2px 0px 0px ${theme.palette.ui.bright}`,
  fontFamily: options.headerFontFamily.join(','),
  fontWeight: 'bold',
});
