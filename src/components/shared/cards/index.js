// External Dependencies
import React from "react"
import styled from 'styled-components';

// Internal Dependencies
import presets from "../../utils/presets"
import { rhythm, scale, options } from "../../utils/typography"
import { vP, vPHd, vPVHd, vPVVHd } from "../../utils/gutters"

// Local Variables
const CardWrapper = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
  background: #fff;
  border-radius: ${presets.radiusLg};
  box-shadow: 0 5px 20px rgba(25, 17, 34, 0.1);
  transform: translateZ(0);
`;

// Component Definition
const Cards = ({ children }) => (
  <CardWrapper>
    {children}
  </CardWrapper>
)

export default Cards
