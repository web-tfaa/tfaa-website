// External Dependencies
import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  h1: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 48,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 36,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 32,
    },
    color: theme.palette.common.white,
    fontSize: 60,
    fontWeight: 900,
    textAlign: 'left',
    zIndex: 2,
  },

  '&::before': {
    content: '""',
    display: 'block',
    backgroundColor: theme.palette.tfaa.backgroundDark,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.4,
    height: '100%',
    width: '100%',
  },

  [theme.breakpoints.down('mobile')]: {
    background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675201705/drumset-closeup-stage-lighting-mobile.jpg") no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    padding: theme.spacing(12, 8),
  },

  alignItems: 'center',
  background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675201649/drumset-closeup-stage-lighting.jpg") no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
  height: 420,
  position: 'relative',
  width: '100%',
  zIndex: 1,
}));

// Component Definition
const FourOhFourBanner: FC = () => {
  return (
    <StyledRoot>
      <Typography component="h1">
        Page Not Found
      </Typography>
    </StyledRoot>
  );
};

export default FourOhFourBanner;
