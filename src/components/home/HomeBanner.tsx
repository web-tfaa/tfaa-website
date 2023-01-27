// External Dependencies
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby-theme-material-ui';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.bannerLeft': {
    a: {
      [theme.breakpoints.down('lg')]: {
        fontSize: 18
      },
      [theme.breakpoints.down('mobile')]: {
        fontSize: 16
      },
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightMedium,
    },

    [theme.breakpoints.down('lg')]: {
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down('mobile')]: {
      order: 2,
    },

    maxWidth: 400,
    paddingRight: theme.spacing(3),
  },

  '.bannerRight': {
    [theme.breakpoints.down('mobile')]: {
      order: 1,
      marginBottom: theme.spacing(1),
    },
  },

  '#bannerBackgroundVideo': {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
  },

  'h1, h2': {
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: 0,
    margin: 0,
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
    fontSize: 92,
    fontWeight: 900,
    lineHeight: '92px',
  },
  h2: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 32,
      lineHeight: '32px',
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 24,
      lineHeight: '24px',
      marginBottom: theme.spacing(8),
    },
    fontSize: 40,
    fontWeight: 900,
    lineHeight: '40px',
  },

  '& > div': {
    [theme.breakpoints.down('mobile')]: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
    },

    display: 'flex',
    justifyContent: 'center',
    width: '50%',
  },

  [theme.breakpoints.down('lg')]: {
    background: 'url("https://res.cloudinary.com/tmac/image/upload/v1670299970/tfaa-banner-video-poster--tablet.png") no-repeat',
    backgroundSize: 'cover',
    gap: 0,
    height: 600,
    padding: theme.spacing(6),
    position: 'static',
  },
  [theme.breakpoints.down('mobile')]: {
    background: 'url("https://res.cloudinary.com/tmac/image/upload/v1670695411/tfaa-banner-video-poster--mobile.png") no-repeat',
    backgroundSize: 'cover',
    height: 540,
    padding: theme.spacing(4),
    flexDirection: 'column',
  },

  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(8),
  height: 800,
  justifyContent: 'center',
  padding: theme.spacing(8),
  position: 'relative',
  width: '100%',
}));

// Component Definition
const HomeBanner: React.FC = () => {
  return (
    <StyledRoot>
      <video
        autoPlay
        id="bannerBackgroundVideo"
        loop
        muted
        poster="https://res.cloudinary.com/tmac/image/upload/v1670299501/tfaa-banner-video-poster.png"
      >
        <source
          src="https://res.cloudinary.com/tmac/video/upload/v1670134429/woman-fine-artist-2022-07-21-07-22-28-utc_1.mp4"
          type="video/mp4"
        />
      </video>

      <div className="bannerLeft">
        <div>
          <h2>
            We nurture and grow leaders in Fine Arts Education
          </h2>

          <Link>
            Read more about how TFAA can help you
          </Link>
        </div>
      </div>

      <div className="bannerRight">
        <h1>
          Fine Arts
          <br />
          for Everyone!
        </h1>
      </div>
    </StyledRoot>
  );
};

export default HomeBanner;
