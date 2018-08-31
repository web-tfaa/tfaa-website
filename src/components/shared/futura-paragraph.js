// Internal Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { options } from '../../utils/typography';

// Component Definition
const FuturaParagraph = ({ children }) => (
  <p
    css={{
      fontFamily: options.headerFontFamily.join(`,`),
      lineHeight: '1.6',
    }}>
    {children}
  </p>
);

FuturaParagraph.propTypes = {
  children: PropTypes.string.isRequired,
}
export default FuturaParagraph;
