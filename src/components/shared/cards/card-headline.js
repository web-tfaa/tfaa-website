// External Dependencies
import React from 'react'
import styled from 'styled-components';

// Internal Dependencies
import presets from "../../../utils/presets"
import { rhythm, scale, options } from "../../../utils/typography"

// Local Variables
const CardHeadlineWrapper = styled.h2`
  font-size: ${scale(2 / 5)};
  line-height: 1.2;
  margin-top: 0;
  ${presets.Tablet}: {
    font-size: ${scale(1 / 10).fontSize};
  }
  ${presets.Desktop}: {
    font-size: ${scale(3 / 10).fontSize};
  }
  ${presets.VHd}: {
    font-size: ${scale(5 / 10).fontSize};
  }
  ${presets.VVHd}: {
    font-size: ${scale(7 / 10).fontSize};
  }
`;

// Component Definition
const CardHeadline = ({ children }) => (
  <CardHeadlineWrapper>
    {children}
  </CardHeadlineWrapper>
)

export default CardHeadline
