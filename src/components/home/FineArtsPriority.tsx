// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.linkContainer a': {
    [theme.breakpoints.down('mobile')]: {
      display: 'none',
    },
    fontSize: 16,
    fontWeight: theme.typography.fontWeightRegular,
  },

  '.priorityContent': {
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(6, 8, 6, 10),
      width: '55%',
    },
    [theme.breakpoints.down('mobile')]: {
      padding: theme.spacing(4, 10, 4, 4),
      width: '100%',
      position: 'relative',
      top: 0,
      left: 0,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4),
    },

    padding: theme.spacing(8, 15, 8, 8),
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  '.redMotif': {
    [theme.breakpoints.down('lg')]: {
      right: -64,
      top: -64,
    },
    [theme.breakpoints.down('mobile')]: {
      height: 100,
      right: -200,
      top: -4,
    },

    height: 200,
    position: 'absolute',
    right: -20,
    top: -44,
    width: 494,
  },

  '.tealMotif': {
    [theme.breakpoints.down('mobile')]: {
      height: 500,
      left: -264,
      top: -60,
    },

    height: 533,
    position: 'absolute',
    left: -240,
    top: -54,
    width: 335,
  },

  h4: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 40,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 30,
      marginBottom: theme.spacing(1.5),
      maxWidth: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
    color: theme.palette.common.white,
    fontSize: 45,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },

  p: {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 15,
    },
    marginBottom: theme.spacing(2),
  },

  // The following breakpoint is outside of the theme breakpoints
  [theme.breakpoints.down('1450')]: {
    backgroundSize: 'cover',
  },
  [theme.breakpoints.down('mobile')]: {
    backgroundSize: 'auto',
    padding: theme.spacing(4, 0, 2),
    alignItems: 'flex-end',
  },

  background: "url('https://res.cloudinary.com/tmac/image/upload/v1671285382/symphony-orchestra-performing-on-stage.png') no-repeat",
  backgroundSize: 'contain',
  backgroundColor: theme.palette.tfaa.backgroundDark,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'flex-end',
  overflow: 'hidden',
  padding: theme.spacing(5, 0, 2.5),
  position: 'relative',
  width: '100%',
  top: 0,
  left: 0,
  height: 614,
}));

// Component Definition
const FineArtsPriority: FC = () => {
  return (
    <StyledRoot>
      <img
        alt="Teal motif."
        aria-hidden="true"
        className="tealMotif"
        src="/teal-motif.svg"
      />
      <img
        alt="Red motif."
        aria-hidden="true"
        className="redMotif"
        src="/red-motif.svg"
      />

      <div className="priorityContent">
        <Typography variant="h4">
          Making Fine Arts a Priority
        </Typography>

        <Typography variant="body2">
          {appNameShort} provides leadership training, professional growth opportunities,
          and advocacy for arts administrators in Texas.
        </Typography>

        <Typography variant="body2">
          We support their success by connecting them to other leaders and
          providing opportunities to share their expertise locally,
          regionally, and globally.
        </Typography>

        <Box className="linkContainer">
          <Link to="/about">
            Read more about how {appNameShort} could help your students
          </Link>
        </Box>
      </div>
    </StyledRoot>
  );
};

export default FineArtsPriority;
