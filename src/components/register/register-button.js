// External Dependencies
import hex2rgba from 'hex2rgba';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'glamor';

// Internal Dependencies
import presets from '../../utils/presets';
import { rhythm, scale, options } from '../../utils/typography';

// Local Variables
const texasFlagBlue = '#002868';
const texasFlagRed = '#BF0A30';

const stripeAnimation = css.keyframes({
  '0%': { backgroundPosition: `0 0` },
  '100%': { backgroundPosition: `30px 60px` },
});

// Component Definition
const RegisterButton = ({
  buttonType,
  children,
  isDisabled,
  onClick,
  overrideCSS,
  red,
}) => (
  // eslint-disable-next-line
  <button
    css={{
      ...overrideCSS,
      ...scale(1 / 5),
      display: `inline-block`,
      border: `1px solid ${red ? texasFlagRed : texasFlagBlue}`,
      fontFamily: options.headerFontFamily.join(`,`),
      padding: `${rhythm(2 / 5)} ${rhythm(1 / 2)}`,
      borderRadius: presets.radius,
      [presets.Tablet]: {
        ...scale(2 / 5),
        padding: `${rhythm(1 / 4)} ${rhythm(3 / 5)}`,
      },
      [presets.VHd]: {
        padding: `${rhythm(1 / 2)} ${rhythm(1)}`,
      },
      // Increase specificity
      '&&': {
        border: `1px solid ${red ? texasFlagRed : texasFlagBlue}`,
        boxShadow: `none`,
        color: red ? texasFlagRed : texasFlagBlue,
        fontWeight: `normal`,
        backgroundColor: `transparent`,
        backgroundSize: `30px 30px`,
        textDecoration: 'none',
        transition: `all ${presets.animation.speedDefault} ${
          presets.animation.curveDefault
        }`,
        ':hover, &:focus': {
          backgroundSize: `30px 30px`,
          backgroundColor: !isDisabled && red ? texasFlagRed : texasFlagBlue,
          backgroundImage: !isDisabled && `linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent)`,
          color: !isDisabled && `#fff`,
          animation: !isDisabled && `${stripeAnimation} 2.8s linear infinite`,
        },
        ':focus': {
          outline: 0,
          boxShadow: `0 0 0 0.2rem ${hex2rgba(red ? texasFlagRed : texasFlagBlue, 0.25)}`,
        },
        ':after': {
          content: ``,
          display: `block`,
        },
      },
    }}
    disabled={isDisabled}
    onClick={onClick}
    type={buttonType}
    role="button"
    tabIndex={0}
  >
    {children}
  </button>
);

RegisterButton.propTypes = {
  buttonType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  overrideCSS: PropTypes.string,
  red: PropTypes.bool,
};
RegisterButton.defaultProps = {
  buttonType: 'button',
  isDisabled: false,
  onClick: null,
  overrideCSS: '',
  red: false,
};

export default RegisterButton;
