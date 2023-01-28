// External Dependencies
import { Button } from 'gatsby-theme-material-ui';
import { ButtonProps, darken } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props extends ButtonProps {
  children: React.ReactNode;
  colorVariant?: CtaColor;
  onClick: ButtonProps['onClick'];
  to?: string;
  width?: number;
}
type CtaColor = 'resources' | 'signIn';
interface StyledButtonProps {
  $colorVariant: CtaColor;
  $width: number | string;
}

// Local Variables
const StyledButton = styled(Button)<StyledButtonProps>(({
  $colorVariant,
  $width,
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
    boxShadow: 'none',
    color: theme.palette.common.white,
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: $colorVariant === 'signIn'
      ? theme.typography.fontWeightBold
      : theme.typography.fontWeightMedium,
    textTransform: 'none',
    whiteSpace: 'pre',
    width: $width,
  }
}));

// Component Definition
const CtaButton: FC<Props> = ({
  children,
  colorVariant = 'resources',
  to,
  width = '100%',
  ...otherProps
}) => (
  <StyledButton
    $colorVariant={colorVariant}
    to={to}
    variant="contained"
    $width={width}
    {...otherProps}
  >
    {children}
  </StyledButton>
);

export default CtaButton;
