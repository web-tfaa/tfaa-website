// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

import { appTagLine } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '&& .MuiTypography-root': {
    [theme.breakpoints.down('lg')]: {
      fontSize: 40,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 36,
      margin: theme.spacing(40, 6, 10),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
    color: theme.palette.common.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1,
    margin: theme.spacing(10),
  },

  [theme.breakpoints.down('mobile')]: {
    background: "url('https://res.cloudinary.com/tmac/image/upload/v1674857837/woman-painting-on-wall-mobile.png') no-repeat",
    backgroundSize: 'cover',
    justifyContent: 'center',
  },

  alignItems: 'center',
  background: "url('https://res.cloudinary.com/tmac/image/upload/v1673708433/woman-painting-on-wall.png') no-repeat",
  backgroundSize: 'cover',
  backgroundColor: theme.palette.tfaa.backgroundDark,
  display: 'flex',
  height: 400,
  width: '100%',
}));

// Component Definition
const AboutCommunity: FC = () => {
  return (
    <StyledRoot>
      <Typography component="h1" sx={{ maxWidth: 640 }}>
        {appTagLine}
      </Typography>
    </StyledRoot>
  );
};

export default AboutCommunity;
