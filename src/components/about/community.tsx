// External Dependencies
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.MuiTypography-root': {
    // [theme.breakpoints.down('lg')]: {
    //   fontSize: 40,
    // },
    // [theme.breakpoints.down('mobile')]: {
    //   fontSize: 30,
    //   marginBottom: theme.spacing(1.5),
    //   maxWidth: '60%',
    // },
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: 28,
    // },
    color: theme.palette.common.white,
    // fontSize: 45,
    // fontWeight: 600,
    // marginBottom: theme.spacing(2),
  },

  // The following breakpoint is outside of the theme breakpoints
  // [theme.breakpoints.down('1450')]: {
  //   backgroundSize: 'cover',
  // },
  // [theme.breakpoints.down('mobile')]: {
  //   backgroundSize: 'auto',
  //   padding: theme.spacing(4, 0, 2),
  //   alignItems: 'flex-end',
  // },

  background: "url('https://res.cloudinary.com/tmac/image/upload/v1673708433/woman-painting-on-wall.png') no-repeat",
  backgroundSize: 'contain',
  backgroundColor: theme.palette.tfaa.backgroundDark,
  // color: theme.palette.common.white,
  // display: 'flex',
  // justifyContent: 'flex-end',
  // overflow: 'hidden',
  // padding: theme.spacing(5, 0, 2.5),
  // position: 'relative',
  // width: '100%',
  // top: 0,
  // left: 0,
  // height: 614,
}));

// Component Definition
const Community: FC = () => {
  return (
    <StyledRoot>
      <Typography
        component="h1"
        variant="h2"
      >
        Creating a community of
        <br />
        fine arts administrators
      </Typography>
    </StyledRoot>
  );
};

export default Community;
