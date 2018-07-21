// External Dependencies
import React from 'react';

// Internal Dependencies
import presets, { colors } from '../../../utils/presets';
import { rhythm, scale, options } from '../../../utils/typography';
import { vP, vPHd, vPVHd, vPVVHd } from '../../../utils/gutters';

// Local Variables
const cover = {
  bottom: 0,
  left: 0,
  position: `absolute`,
  right: 0,
  top: 0,
};

// Component Definition
const Card = ({ children, shape }) => (
  <div
    css={{
      boxSizing: `border-box`,
      display: `flex`,
      transform: `translateZ(0)`,
      paddingBottom: 16,
      [presets.Tablet]: {
        flex: `0 0 50%`,
        maxWidth: `50%`,
        boxShadow: `0 1px 0 0 ${colors.ui.light}`,
        "&:nth-child(5),&:nth-child(6)": {
          boxShadow: `none`,
        },
        "&:nth-child(2n)": {
          borderLeft: `1px solid ${colors.ui.light}`,
        },
      },
      [presets.Hd]: {
        flex: `0 0 90%`,
        maxWidth: `90%`,
        borderLeft: `1px solid ${colors.ui.light}`,
        "&:nth-child(4)": {
          boxShadow: `none`,
        },
        "&:nth-child(3n+1)": {
          borderLeft: 0,
        },
      },
    }}
  >
    <div
      css={{
        padding: rhythm(presets.gutters.default / 2),
        paddingBottom: 0,
        transform: `translateZ(0)`,
        [presets.Mobile]: {
          padding: vP,
          paddingBottom: 0,
        },
        [presets.Phablet]: {
          padding: vP,
        },
        [presets.VHd]: {
          padding: vPHd,
        },
        [presets.VVHd]: {
          padding: vPVHd,
        },
      }}
    >
    {shape && <svg
      viewBox="0 0 10 10"
      preserveAspectRatio="xMinYMin slice"
      className="masthead-bg-left"
      css={{
        ...cover,
        zIndex: -2,
        width: `100%`,
        height: `100%`,
      }}
    >
      <polygon fill={colors.ui.light} points="-5,-5 35,15 -5,25 " />
    </svg>}
      {children}
    </div>
  </div>
);

export default Card;
