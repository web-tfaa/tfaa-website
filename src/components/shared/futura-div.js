// Internal Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { options } from '../../utils/typography';

// Component Definition
const FuturaDiv = ({ children }) => (
  <div
    css={{
      fontFamily: options.headerFontFamily.join(','),
      lineHeight: '1.6',
      marginBottom: '1rem',
    }}
  >
    {children}
  </div>
);

FuturaDiv.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.shape({}),
  ]).isRequired,
}
export default FuturaDiv;
