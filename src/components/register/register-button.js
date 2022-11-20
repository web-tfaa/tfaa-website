// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import hex2rgba from 'hex2rgba';
import { green, red } from '@mui/material/colors';

// Internal Dependencies
import presets from '../../utils/presets';
import { rhythm, scale, options } from '../../utils/typography';

// Local Variables
const propTypes = {
  buttonType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  overrideCSS: PropTypes.string,
  isRed: PropTypes.bool,
};

const defaultProps = {
  buttonType: 'text',
  isDisabled: false,
  onClick: null,
  overrideCSS: '',
  isRed: false,
};

const texasFlagRed = '#BF0A30';
const green500 = '#4caf50';

// Component Definition
const RegisterButton = ({
  buttonType,
  children,
  isDisabled,
  isRed,
  onClick,
  overrideCSS,
}) => (
  <button
    css={{
      ...overrideCSS,
      ...scale(1 / 5),
      border: `1px solid ${isRed ? texasFlagRed : green500}`,
      borderRadius: presets.radius,
      display: 'inline-block',
      fontFamily: options.headerFontFamily.join(','),
      padding: `${rhythm(2 / 5)} ${rhythm(1 / 2)}`,
      [presets.Tablet]: {
        ...scale(2 / 5),
        padding: `${rhythm(1 / 4)} ${rhythm(3 / 5)}`,
      },
      [presets.VHd]: {
        padding: `${rhythm(1 / 2)} ${rhythm(1)}`,
      },
      // Increase specificity
      '&&': {
        backgroundColor: isRed || isDisabled ? red['50'] : green['50'],
        backgroundSize: '30px 30px',
        border: `2px solid ${isRed || isDisabled ? texasFlagRed : green500}`,
        boxShadow: 'none',
        color: isRed || isDisabled ? texasFlagRed : green500,
        fontWeight: 'normal',
        textDecoration: 'none',
        transition: `all ${presets.animation.speedDefault} ${presets.animation.curveDefault}`,
        ':hover, &:focus': {
          backgroundColor: isRed || isDisabled ? texasFlagRed : green500,
          backgroundImage:
            !isDisabled
            && 'linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent)',
          backgroundSize: '30px 30px',
          color: !isDisabled ? '#fff' : hex2rgba('#fafafa', 0.4),
          cursor: !isDisabled ? 'pointer' : 'not-allowed',
        },
        ':focus': {
          boxShadow: `0 0 0 0.2rem ${hex2rgba(isRed ? texasFlagRed : green500, 0.25)}`,
          outline: 0,
        },
        ':after': {
          content: '""',
          display: 'block',
        },
      },
    }}
    disabled={isDisabled}
    onClick={onClick}
    tabIndex={0}
    type={buttonType}
  >
    {children}
  </button>
);

RegisterButton.propTypes = propTypes;
RegisterButton.defaultProps = defaultProps;

export default RegisterButton;
