// External Dependencies
import hex2rgba from 'hex2rgba';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'glamor';
import { Link } from 'gatsby';
import { blue, green, red } from '@material-ui/core/colors';

// Internal Dependencies
import presets from '../../utils/presets';
import { rhythm, scale, options } from '../../utils/typography';

// Local Variables
const texasFlagBlue = '#002868';
const texasFlagRed = '#BF0A30';
const green500 = '#4caf50';

const stripeAnimation = css.keyframes({
  '0%': { backgroundPosition: '0 0' },
  '100%': { backgroundPosition: '30px 60px' },
});

const getButtonColor = (buttonColor) => {
  let background = red['50'];
  let hover = red['800'];
  let primary = texasFlagRed;

  if (buttonColor === 'blue') {
    background = blue['50'];
    hover = blue['800'];
    primary = texasFlagBlue;
  } else if (buttonColor === 'green') {
    background = green['50'];
    hover = green['100'];
    primary = green500;
  }

  return {
    background,
    hover,
    primary,
  };
};

// Component Definition
const CtaButton = ({
  buttonColor = 'blue',
  children,
  overrideCSS,
  to,
  ...other
}) => (
  <Link
    css={{
      ...overrideCSS,
      ...scale(1 / 5),
      display: 'inline-block',
      border: `1px solid ${getButtonColor(buttonColor).primary}`,
      fontFamily: options.headerFontFamily.join(','),
      padding: `${rhythm(2 / 5)} ${rhythm(1 / 2)}`,
      borderRadius: presets.radiusLg,
      [presets.Tablet]: {
        ...scale(2 / 5),
        padding: `${rhythm(1 / 4)} ${rhythm(3 / 5)}`,
      },
      [presets.VHd]: {
        padding: `${rhythm(1 / 2)} ${rhythm(1)}`,
      },
      // Increase specificity
      '&&': {
        backgroundColor: getButtonColor(buttonColor).background,
        border: `2px solid ${getButtonColor(buttonColor).primary}`,
        boxShadow: 'none',
        color: getButtonColor(buttonColor).primary,
        fontWeight: 'normal',
        backgroundSize: '30px 30px',
        textDecoration: 'none',
        transition: `all ${presets.animation.speedDefault} ${presets.animation.curveDefault}`,
        ':hover, &:focus': {
          backgroundSize: '30px 30px',
          backgroundColor: getButtonColor(buttonColor).hover,
          backgroundImage:
            'linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent)',
          color: '#fff',
          animation: `${stripeAnimation} 2.8s linear infinite`,
        },
        ':focus': {
          outline: 0,
          boxShadow: `0 0 0 0.2rem ${hex2rgba(getButtonColor(buttonColor).background, 0.25)}`,
        },
        ':after': {
          content: '',
          display: 'block',
        },
      },
    }}
    to={to}
    {...other}
  >
    {children}
  </Link>
);

CtaButton.propTypes = {
  buttonColor: PropTypes.oneOf([
    'green',
    'red',
    'blue',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  overrideCSS: PropTypes.string,
  to: PropTypes.string,
};
CtaButton.defaultProps = {
  buttonColor: 'red',
  overrideCSS: '',
  to: null,
};

export default CtaButton;
