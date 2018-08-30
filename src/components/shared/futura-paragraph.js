// Internal Dependencies
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

export default FuturaParagraph;
