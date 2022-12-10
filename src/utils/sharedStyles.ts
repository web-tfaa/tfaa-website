// External Dependencies
import { Theme } from '@mui/material';

export const anchorStyles = (theme : Theme) => ({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'all 0.15s ease-out',
  borderBottom: `0.5px solid ${theme.palette.ui.bright}`,
  boxShadow: `inset 0 -1px 0px 0px ${theme.palette.ui.bright}`,
  fontWeight: 'bold',
});
