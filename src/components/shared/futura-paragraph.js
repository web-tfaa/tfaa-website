// Internal Dependencies
import React from 'react';
import { rhythm, scale, options } from "../../utils/typography"
import presets from "../../utils/presets"

// Component Definition
const FuturaParagraph = ({ children }) => (
  <p
    css={{
      fontFamily: options.headerFontFamily.join(`,`),
      marginBottom: 0,
    }}
  >
    {children}
  </p>
)

export default FuturaParagraph
