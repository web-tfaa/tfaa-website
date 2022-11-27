// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../utils/presets';

// Local Variables
const propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

const StyledRoot = styled.div(({ theme }) => ({
  img: {
    height: '100%',
    textAlign: 'center',
    width: '100%',
    // Handle non-square image. The property isn't supported by IE11.
    // objectFit: 'cover',
  },

  [presets.Phablet]: {
    height: 140,
    width: 140,
  },
  [presets.Tablet]: {
    height: 160,
    width: 160,
  },

  alignItems: 'baseline',
  borderRadius: '50%',
  display: 'flex',
  flexShrink: 0,
  height: 120,
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  position: 'relative',
  width: 120,
}));

// Component Definition
const Avatar = ({ alt, src }) => (
  <StyledRoot>
    <img
      alt={alt}
      src={src}
    />
  </StyledRoot>
);

Avatar.propTypes = propTypes;

export default Avatar;
