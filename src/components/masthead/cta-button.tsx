// External Dependencies
import hex2rgba from 'hex2rgba';
import React, { FC } from 'react';
import { Link } from 'gatsby-theme-material-ui';
import { blue, green } from '@mui/material/colors';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../utils/presets';
import { rhythm, scale, options } from '../../utils/typography';

// Local Typings
interface Props {
  buttonColor: 'blue' | 'green';
  children: React.ReactNode;
  to?: string;
}

// Local Variables
const green500 = '#4caf50';

const getButtonColor = ({
  buttonColor,
  theme
}) => {
  let background: string = blue['50'];
  let hover: string = blue['800'];
  let primary: string = theme.palette.texasFlag.blue;

  if (buttonColor === 'green') {
    background = green['50'];
    hover = green['800'];
    primary = green500;
  }

  return {
    background,
    hover,
    primary,
  };
};

const StyledLink = styled(Link)(({ $buttonColor, theme }) => {
  const color = getButtonColor({
    buttonColor: $buttonColor,
    theme
  });

  return {
    [presets.Tablet]: {
      ...scale(2 / 5),
      padding: `${rhythm(1 / 4)} ${rhythm(3 / 5)}`,
    },
    [presets.VHd]: {
      padding: `${rhythm(1 / 2)} ${rhythm(1)}`,
    },

    // Increase specificity
    '&&': {
      ...scale(1 / 5),
      display: 'inline-block',
      fontFamily: options.headerFontFamily.join(','),
      padding: `${rhythm(2 / 5)} ${rhythm(1 / 2)}`,
      borderRadius: presets.radiusLg,
      backgroundColor: color.background,
      boxShadow: 'none',
      border: `2px solid ${color.primary}`,
      color: color.primary,
      fontWeight: 'normal',
      backgroundSize: '30px 30px',
      textDecoration: 'none',
      transition: `all ${presets.animation.speedDefault} ${presets.animation.curveDefault}`,
      ':hover, &:focus': {
        backgroundSize: '30px 30px',
        backgroundColor: color.hover,
        backgroundImage:
          'linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent)',
        color: '#fff',
      },
      ':focus': {
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${hex2rgba(color.background, 0.25)}`,
      },
      ':after': {
        content: '""',
        display: 'block',
      },
    },
  };
});

// Component Definition
const CtaButton: FC<Props> = ({
  buttonColor = 'blue',
  children,
  to,
  ...other
}) => (
  <StyledLink
    $buttonColor={buttonColor}
    to={to}
    {...other}
  >
    {children}
  </StyledLink>
);

export default CtaButton;
