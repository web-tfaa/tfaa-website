// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import presets from '../../../utils/presets';
import { scale } from '../../../utils/typography';

// Component Definition
const CardHeadline = ({ children }) => (
  <h2
    css={{
      ...scale(2 / 5),
      lineHeight: 1.2,
      marginTop: 0,
      [presets.Tablet]: {
        fontSize: scale(1 / 10).fontSize,
      },
      [presets.Desktop]: {
        fontSize: scale(3 / 10).fontSize,
      },
      [presets.VHd]: {
        fontSize: scale(5 / 10).fontSize,
      },
      [presets.VVHd]: {
        fontSize: scale(7 / 10).fontSize,
      },
    }}>
    {children}
  </h2>
);

CardHeadline.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CardHeadline;
