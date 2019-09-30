// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import hex2rgba from 'hex2rgba';
import { css } from 'glamor';

// Internal Dependencies
import presets from '../../utils/presets';
import { rhythm, scale, options } from '../../utils/typography';

// Local Variables
const texasFlagBlue = '#002868';
const texasFlagRed = '#BF0A30';

const stripeAnimation = css.keyframes({
  '0%': { backgroundPosition: '0 0' },
  '100%': { backgroundPosition: '30px 60px' },
});

// Component Definition
// eslint-disable-next-line react/prefer-stateless-function
class RegisterButton extends Component {
  static propTypes = {
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

  static defaultProps = {
    buttonType: '',
    isDisabled: false,
    onClick: null,
    overrideCSS: '',
    red: false,
  };

  render() {
    const {
      buttonType,
      children,
      isDisabled,
      onClick,
      overrideCSS,
      red,
    } = this.props;

    return (
      // eslint-disable-next-line
      <button
        css={{
          ...overrideCSS,
          ...scale(1 / 5),
          border: `1px solid ${red ? texasFlagRed : 'green'}`,
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
            backgroundColor: 'transparent',
            backgroundSize: '30px 30px',
            border: `2px solid ${(red || isDisabled) ? texasFlagRed : 'green'}`,
            boxShadow: 'none',
            color: red ? texasFlagRed : 'green',
            fontWeight: 'normal',
            textDecoration: 'none',
            transition: `all ${presets.animation.speedDefault} ${
              presets.animation.curveDefault
            }`,
            ':hover, &:focus': {
              animation: !isDisabled && `${stripeAnimation} 2.8s linear infinite`,
              backgroundColor: (red || isDisabled) ? texasFlagRed : 'green',
              backgroundImage: !isDisabled && 'linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent)',
              backgroundSize: '30px 30px',
              color: !isDisabled ? '#fff' : hex2rgba('#fafafa', 0.4),
              cursor: 'pointer',
            },
            ':focus': {
              boxShadow: `0 0 0 0.2rem ${hex2rgba(red ? texasFlagRed : '00ff00', 0.25)}`,
              outline: 0,
            },
            ':after': {
              content: '',
              display: 'block',
            },
          },
        }}
        disabled={isDisabled}
        onClick={onClick}
        role="button"
        tabIndex={0}
        type={buttonType}
      >
        {children}
      </button>
    );
  }
}

export default RegisterButton;
