// External Dependencies
import { Button } from 'gatsby-theme-material-ui';
import { ButtonProps, darken } from '@mui/material';
import React, { FC } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from 'styled-components';

// Local Typings
interface Props extends ButtonProps {
  children: React.ReactNode;
  colorVariant?: CtaColor;
  fontWeight?: number;
  onClick?: ButtonProps['onClick'];
  onKeyDown?: ButtonProps['onKeyDown'];
  rightArrow?: boolean;
  to?: string;
  width?: number;
}
type CtaColor = 'about' | 'resources' | 'signIn';
interface StyledButtonProps {
  $colorVariant: CtaColor;
  $fontWeight?: number;
  $width: number | string;
}

// Local Variables
const StyledButton = styled(Button)<StyledButtonProps>(({
  $colorVariant,
  $fontWeight,
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
    fontWeight: $fontWeight || $colorVariant === 'signIn'
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
  fontWeight,
  rightArrow,
  to,
  width = '100%',
  ...otherProps
}) => {
  return (
    <StyledButton
      $colorVariant={colorVariant}
      $fontWeight={fontWeight}
      $width={width}
      endIcon={rightArrow ? <ArrowForwardIcon /> : undefined}
      to={to}
      variant="contained"
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
};

export default CtaButton;
