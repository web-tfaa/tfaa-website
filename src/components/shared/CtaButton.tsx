// External Dependencies
import { Button, darken } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  children: React.ReactNode;
  color: CtaColor;
}
type CtaColor = 'cyan' | 'orange';
interface StyledButtonProps {
  $color: CtaColor;
}

// Local Variables
const StyledButton = styled(Button)<StyledButtonProps>(({
  $color,
  theme,
}) => ({
  '&.MuiButtonBase-root': {
    // [theme.breakpoints.down('md')]: {
    //   fontSize: 14,
    // },
    [theme.breakpoints.down('lg')]: {
      fontSize: 14,
    },

    '&:hover': {
      backgroundColor: darken(theme.palette.cta[$color], 0.15),
    },

    backgroundColor: theme.palette.cta[$color],
    borderRadius: 8,
    fontFamily: 'sans-serif',
    fontSize: 18,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'none',
    whiteSpace: 'pre',
  }
}));

// Component Definition
const CtaButton: FC<Props> = ({ children, color }) => (
  <StyledButton
    $color={color}
    variant="contained"
  >
    {children}
  </StyledButton>
);

export default CtaButton;
