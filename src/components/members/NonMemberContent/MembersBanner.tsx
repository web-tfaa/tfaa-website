// External Dependencies
import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  h1: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 48,
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 36,
      marginLeft: theme.spacing(8),
      maxWidth: '75%',
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 32,
      margin: theme.spacing(0, 4),
    },
    color: theme.palette.common.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,
    marginLeft: theme.spacing(12),
    maxWidth: '64%',
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
    opacity: 0.6,
    height: '100%',
    width: '100%',
  },

  [theme.breakpoints.down('mobile')]: {
    background: 'url("https://res.cloudinary.com/tmac/image/upload/v1674857837/woman-painting-on-wall-mobile.png") no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    padding: theme.spacing(12, 8),
  },

  alignItems: 'center',
  background: 'url("https://res.cloudinary.com/tmac/image/upload/v1673708433/woman-painting-on-wall.png") no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
  height: 400,
  position: 'relative',
  width: '100%',
  zIndex: 1,
}));

// Component Definition
const MembersBanner: FC = () => {
  return (
    <StyledRoot>
      <Typography component="h1">
        Join. Learn.
        <br />
        Lead.
      </Typography>
    </StyledRoot>
  );
};

export default MembersBanner;
