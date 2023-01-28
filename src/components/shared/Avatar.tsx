// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  alt: string;
  src: string;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  img: {
    height: '100%',
    textAlign: 'center',
    width: '100%',
    // Handle non-square image. The property isn't supported by IE11.
    // objectFit: 'cover',
  },

  [theme.breakpoints.up('md')]: {
    height: 140,
    width: 140,
  },
  [theme.breakpoints.up('mobile')]: {
    height: 160,
    width: 160,
  },

  alignItems: 'baseline',
  borderRadius: '50%',
  display: 'flex',
  flexShrink: 0,
  height: 180,
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  position: 'relative',
  width: 180,
}));

// Component Definition
const Avatar: FC<Props> = ({ alt, src }) => (
  <StyledRoot>
    <img
      alt={alt}
      src={src}
    />
  </StyledRoot>
);

export default Avatar;
