// External Dependencies
import React from 'react';
import PropTypes from 'prop-types'

// Internal Dependencies
import presets, { colors } from '../../../utils/presets';
import { rhythm, scale, options } from '../../../utils/typography';
import { vP, vPHd, vPVHd, vPVVHd } from '../../../utils/gutters';

// Local Variables
const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

// Component Definition
const Stat = (props) => {
  const {
    children,
    color,
    icon: Icon,
  } = props;

  console.log('props for Stat', color);
  return (
    <div
      css={{
        background: 'white',
        border: `3px solid ${color}`,
        boxSizing: `border-box`,
        display: `flex`,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transform: `translateZ(0)`,
        borderRadius: presets.radiusCir,
        fontSize: 20,
        [presets.Tablet]: {
          flex: `0 0 15%`,
          maxWidth: `15%`,
          boxShadow: `0 1px 0 0 ${colors.ui.light}`,
          "&:nth-child(5),&:nth-child(6)": {
            boxShadow: `none`,
          },
          "&:nth-child(2n)": {
            borderLeft: `1px solid ${colors.ui.light}`,
          },
        },
        [presets.Hd]: {
          flex: `0 0 15%`,
          maxWidth: `15%`,
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
        <div
          css={{
            marginBottom: 16,
          }}
        >
          <Icon fill={color} width="48px" height="48px" />
        </div>
        {children}
      </div>
    </div>
  );
};

Stat.propTypes = propTypes;
export default Stat;
