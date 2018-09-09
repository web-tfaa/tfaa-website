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

const stripeAnimation = css.keyframes({
  '0%': { backgroundPosition: `0 0` },
  '100%': { backgroundPosition: `30px 60px` },
});

// Component Definition
const RegisterButton = ({ children, onClick, overrideCSS }) => (
  <button
    css={{
      ...overrideCSS,
      ...scale(1 / 5),
      display: `inline-block`,
      border: `1px solid ${texasFlagBlue}`,
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
        border: `1px solid ${texasFlagBlue}`,
        boxShadow: `none`,
        color: texasFlagBlue,
        fontWeight: `normal`,
        backgroundColor: `transparent`,
        backgroundSize: `30px 30px`,
        textDecoration: 'none',
        transition: `all ${presets.animation.speedDefault} ${
          presets.animation.curveDefault
        }`,
        ':hover, &:focus': {
          backgroundSize: `30px 30px`,
          backgroundColor: texasFlagBlue,
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent)`,
          color: `#fff`,
          animation: `${stripeAnimation} 2.8s linear infinite`,
        },
        ':focus': {
          outline: 0,
          boxShadow: `0 0 0 0.2rem ${hex2rgba(texasFlagBlue, 0.25)}`,
        },
        ':after': {
          content: ``,
          display: `block`,
        },
      },
    }}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

RegisterButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  overrideCSS: PropTypes.string,
};
RegisterButton.defaultProps = {
  overrideCSS: '',
};

export default RegisterButton;
