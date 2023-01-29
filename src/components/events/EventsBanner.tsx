// External Dependencies
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appName } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  'h1, h3, p': {
    color: theme.palette.common.white,
    letterSpacing: 0,
    margin: 0,
    zIndex: 2,
  },

  h1: {
    [theme.breakpoints.down('md')]: {
      fontSize: 64,
      lineHeight: '64px',
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 36,
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
    [theme.breakpoints.down('md')]: {
      maxWidth: '75%',
    },
    [theme.breakpoints.down('mobile')]: {
      maxWidth: '90%',
    },
    fontSize: 20,
    margin: theme.spacing(8, 0),
    maxWidth: '50%',
    textAlign: 'center',
  },

  '&::before': {
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

  [theme.breakpoints.down('mobile')]: {
    background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675017739/people-in-audience-mobile.png") no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    padding: theme.spacing(8, 4),
  },

  alignItems: 'center',
  background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675017739/people-in-audience.png") no-repeat',
  display: 'flex',
  height: 720,
  flexDirection: 'column',
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
