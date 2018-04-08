// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import presets, { colors } from '../../../utils/presets';
import { rhythm, scale, options } from '../../../utils/typography';
import { vP, vPHd, vPVHd, vPVVHd } from '../../../utils/gutters';

// Local Variables
const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
};

// Local Variables
const texasFlagBlue = '#002868';

// Component Definition
const Stat = (props) => {
  const {
    children,
    color,
    icon: Icon,
  } = props;

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
        borderRadius: presets.radiusLg,
        fontSize: 15,
        width: `60%`,
        marginBottom: 16,
        paddingBottom: 16,
        [presets.Tablet]: {
          flex: `0 0 15%`,
          width: `90%`,
          boxShadow: `1px 3px 5px 0 #aaa`,
        },
        [presets.Hd]: {
          flex: `0 0 15%`,
          width: `15%`,
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
