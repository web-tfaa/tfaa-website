// Internal Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { options } from '../../utils/typography';

// Component Definition
const FuturaParagraph = ({ children }) => (
  <p
    css={{
      fontFamily: options.headerFontFamily.join(','),
      lineHeight: '1.6',
    }}
  >
    {children}
  </p>
);

FuturaParagraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};
export default FuturaParagraph;
