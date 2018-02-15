// External Dependencies
import React from 'react'
import styled from 'styled-components';

// Internal Dependencies
import presets, { colors } from '../../../utils/presets'
import { rhythm, scale, options } from '../../../utils/typography'
import { vP, vPHd, vPVHd, vPVVHd } from '../../../utils/gutters'

// Local Variables
const CardOutsideWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  transform: translateZ(0);
  ${presets.Tablet}: {
    flex: 0 0 50%;
    max-width: 50%;
    box-shadow: 0 1px 0 0 ${colors.ui.light};
    &:nth-child(5), &:nth-child(6): {
      box-shadow: none;
    }
    &:nth-child(2n): {
      border-left: 1px solid ${colors.ui.light};
    }
  }
  ${presets.Hd}: {
    flex: 0 0 33.33333333%;
    max-width: 33.33333333%;
    border-left: 1px solid ${colors.ui.light};
    &:nth-child(4): {
      box-shadow: none;
    }
    &:nth-child(3n+1): {
      border-left: 0;
    }
  }
`;

const CardInsideWrapper = styled.div`
  padding: ${rhythm(presets.gutters.default / 2)};
  padding-bottom: 0;
  transform: translateZ(0);
    ${presets.Mobile}: {
      padding: ${vP},
      padding-bottom: 0,
    },
    ${presets.Phablet}: {
      padding: ${vP},
    },
    ${presets.VHd}: {
      padding: ${vPHd},
    },
    ${presets.VVHd}: {
      padding: ${vPVHd},
    },
`;

// Component Definition
const Card = ({ children }) => (
  <CardOutsideWrapper>
    <CardInsideWrapper>
      {children}
    </CardInsideWrapper>
  </CardOutsideWrapper>
)

export default Card
