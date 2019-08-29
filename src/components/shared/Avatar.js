// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import presets from '../../utils/presets';

// Local Variables
const propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

// Component Definition
const Avatar = ({ alt, src }) => (
  <div
    css={{
      alignItems: 'baseline',
      borderRadius: '50%',
      display: 'flex',
      flexShrink: 0,
      height: 120,
      justifyContent: 'center',
      marginBottom: 16,
      overflow: 'hidden',
      position: 'relative',
      width: 120,
      [presets.Phablet]: {
        height: 140,
        width: 140,
      },
      [presets.Tablet]: {
        height: 160,
        width: 160,
      },
    }}
  >
    <img
      css={{
        height: '100%',
        textAlign: 'center',
        width: '100%',
        // Handle non-square image. The property isn't supported by IE11.
        // objectFit: 'cover',
      }}
      alt={alt}
      src={src}
    />
  </div>
);

Avatar.propTypes = propTypes;

export default Avatar;
