// External Dependencies
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby-theme-material-ui';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.bannerLeft': {
    a: {
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightMedium,
    },

    maxWidth: 400,
  },

  '#bannerBackgroundVideo': {
    // width: 100vw,
    // height: 100vh,
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
    fontSize: 92,
    lineHeight: '92px',
  },
  h2: {
    fontSize: 40,
    lineHeight: '40px',
  },

  '& > div': {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
  },

  alignItems: 'center',

  // backgroundColor: theme.palette.grey['900'],
  display: 'flex',
  gap: theme.spacing(8),
  height: 800,
  justifyContent: 'center',
  padding: theme.spacing(8),
  position: 'relative',
  width: '100%',
}));

// Component Definition
const HomeBanner: React.FC = () => (
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
        <h2>We nurture and grow leaders in Fine Arts Education</h2>
        <Link>
          Read more about how TFAA can help you
        </Link>
      </div>
    </div>

    <div className="bannerRight">
      <h1>Fine Arts for Everyone!</h1>
    </div>
  </StyledRoot>
);

export default HomeBanner;
