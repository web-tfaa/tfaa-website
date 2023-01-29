// External Dependencies
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appName } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  // '.bannerLeft': {
  //   a: {
  //     [theme.breakpoints.down('lg')]: {
  //       fontSize: 18
  //     },
  //     [theme.breakpoints.down('mobile')]: {
  //       fontSize: 16
  //     },
  //     color: theme.palette.common.white,
  //     fontWeight: theme.typography.fontWeightMedium,
  //   },

  //   [theme.breakpoints.down('lg')]: {
  //     paddingRight: theme.spacing(2),
  //   },
  //   [theme.breakpoints.down('mobile')]: {
  //     order: 2,
  //   },

  //   maxWidth: 400,
  //   paddingRight: theme.spacing(3),
  // },

  // '.bannerRight': {
  //   [theme.breakpoints.down('mobile')]: {
  //     order: 1,
  //     marginBottom: theme.spacing(1),
  //   },
  // },

  // '#bannerBackgroundVideo': {
  //   [theme.breakpoints.down('lg')]: {
  //     display: 'none',
  //   },
  //   width: '100%',
  //   height: '100%',
  //   objectFit: 'cover',
  //   position: 'fixed',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   zIndex: -1,
  // },

  'h1, h3, p': {
    color: theme.palette.common.white,
    letterSpacing: 0,
    margin: 0,
    zIndex: 2,
  },

  h1: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 64,
      lineHeight: '64px',
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 42,
      lineHeight: '42px',
    },
    fontSize: 82,
    fontWeight: 900,
    lineHeight: '92px',
    textAlign: 'center',
  },

  h3: {
    fontSize: 27,
    textAlign: 'center',
  },

  p: {
    fontSize: 20,
    margin: theme.spacing(8, 0),
    maxWidth: '50%',
    textAlign: 'center',
  },
  // h2: {
  //   [theme.breakpoints.down('lg')]: {
  //     fontSize: 32,
  //     lineHeight: '32px',
  //   },
  //   [theme.breakpoints.down('mobile')]: {
  //     fontSize: 24,
  //     lineHeight: '24px',
  //     marginBottom: theme.spacing(8),
  //   },
  //   fontSize: 40,
  //   fontWeight: 900,
  //   lineHeight: '40px',
  // },

  // '& > div': {
  //   [theme.breakpoints.down('mobile')]: {
  //     alignItems: 'flex-start',
  //     justifyContent: 'flex-start',
  //     width: '100%',
  //   },

  //   display: 'flex',
  //   justifyContent: 'center',
  //   width: '50%',
  // },

  '&::before': {
    [theme.breakpoints.down('mobile')]: {
      opacity: 0.3,
    },
    content: '""',
    display: 'block',
    backgroundColor: theme.palette.tfaa.backgroundDark,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
    height: '100%',
    width: '100%',
  },

  // [theme.breakpoints.down('lg')]: {
  //   background: 'url("https://res.cloudinary.com/tmac/image/upload/v1670299970/tfaa-banner-video-poster--tablet.png") no-repeat',
  //   backgroundSize: 'cover',
  //   gap: 0,
  //   height: 600,
  //   padding: theme.spacing(6),
  //   position: 'static',
  // },
  [theme.breakpoints.down('mobile')]: {
    background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675017739/people-in-audience-mobile.png") no-repeat',
    backgroundSize: 'contain',
    height: 540,
    padding: theme.spacing(4),
    flexDirection: 'column',
  },

  alignItems: 'center',
  background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675017739/people-in-audience.png") no-repeat',
  display: 'flex',
  // gap: theme.spacing(8),
  height: 720,
  flexDirection: 'column',
  // justifyContent: 'center',
  padding: theme.spacing(8),
  position: 'relative',
  width: '100%',
  zIndex: 1,
}));

// Component Definition
const EventsBanner: React.FC = () => {
  return (
    <StyledRoot>
      <Typography component="h1">
        The Voice of Fine Arts
        <br />
        Education in Texas
      </Typography>

      <Typography>
        {appName} is a non-profit organization dedicated to advancing Fine Art
        education in Texas public schools. We seek to improve the quality of
        instruction and drive student achievement by providing leadership
        training to Texas Fine Arts administrators. We host various events
        around the year, including conferences, professional development workshops,
        and meetings. Be part of something important for our Texas teachers,
        students, and the greater Arts community.
      </Typography>

      <Typography component="h3">
        Be part of something important for our state
      </Typography>
    </StyledRoot>
  );
};

export default EventsBanner;
