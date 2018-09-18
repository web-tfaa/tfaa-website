// External Dependencies
import hex2rgba from 'hex2rgba';
import React from 'react';
import PropTypes from 'prop-types';

// Internal Dependencies
import presets from '../../../utils/presets';
import { rhythm } from '../../../utils/typography';
import { vP, vPHd, vPVHd } from '../../../utils/gutters';

// Local Variables
const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.func,
  title: PropTypes.string,
};
const defaultProps = {
  icon: null,
  title: '',
};

// Component Definition
const Stat = props => {
  const { children, color, icon: Icon, title } = props;

  return (
    <div
      css={{
        alignItems: 'center',
        background: 'white',
        border: `3px solid ${color}`,
        borderRadius: presets.radiusLg,
        boxSizing: `border-box`,
        display: `flex`,
        flexDirection: 'column',
        fontSize: title ? 24 : 16,
        fontWeight: title ? 600 : 'inherit',
        justifyContent: 'flex-start',
        marginBottom: 16,
        paddingBottom: 16,
        transform: `translateZ(0)`,
        width: `60%`,
        [presets.Tablet]: {
          flex: `0 0 15%`,
          width: `90%`,
          boxShadow: `1px 3px 5px 0 #aaa`,
        },
        [presets.Hd]: {
          flex: `0 0 15%`,
          width: `15%`,
        },
      }}>
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
        }}>
        <div
          css={{
            marginBottom: title ? 0 : 16,
          }}>
          {Icon ? <Icon fill={color} width="48px" height="48px" /> : null}
        </div>
        {children}
      </div>
    </div>
  );
};

Stat.propTypes = propTypes;
Stat.defaultProps = defaultProps;
export default Stat;
