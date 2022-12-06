// External Dependencies
import { Button } from 'gatsby-theme-material-ui';
import { ButtonProps, darken } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props extends ButtonProps {
  children: React.ReactNode;
  colorVariant: CtaColor;
  to?: string;
}
type CtaColor = 'resources' | 'signIn';
interface StyledButtonProps {
  $colorVariant: CtaColor;
}

// Local Variables
const StyledButton = styled(Button)<StyledButtonProps>(({
  $colorVariant = 'resources',
  theme,
}) => ({
  '&.MuiButtonBase-root': {
    [theme.breakpoints.down('lg')]: {
      fontSize: 13,
    },

    '&:hover': {
      backgroundColor: darken(theme.palette.tfaa[$colorVariant], 0.15),
    },

    backgroundColor: theme.palette.tfaa[$colorVariant],
    borderRadius: 25,
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'none',
    whiteSpace: 'pre',
  }
}));

// Component Definition
const CtaButton: FC<Props> = ({
  children, colorVariant, to, ...otherProps
}) => (
  <StyledButton
    $colorVariant={colorVariant}
    to={to}
    variant="contained"
    {...otherProps}
  >
    {children}
  </StyledButton>
);

export default CtaButton;
