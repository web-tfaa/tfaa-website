// Internal Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { options } from '../../utils/typography';

// Local Variables
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.shape({}),
  ]),
};

const defaultProps = {
  children: null,
};

// Component Definition
const FuturaDiv = ({ children }) => (
  <div
    css={{
      fontFamily: options.headerFontFamily.join(','),
      marginBottom: '1rem',
    }}
  >
    {children}
  </div>
);

FuturaDiv.propTypes = propTypes;
FuturaDiv.defaultProps = defaultProps;

export default FuturaDiv;
