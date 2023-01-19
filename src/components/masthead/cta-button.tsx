// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { Theme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import hex2rgba from 'hex2rgba';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { options } from '../../utils/typography';
import presets from '../../utils/presets';

// Local Typings
interface Props {
  buttonColor: 'blue' | 'green';
  children: React.ReactNode;
  to?: string;
}
interface StyledLinkProps {
  $buttonColor: 'blue' | 'green';
}

// Local Variables
const green500 = '#4caf50';

const getButtonColor = ({
  buttonColor,
  theme
}: {
  buttonColor: 'blue' | 'green';
  theme: Theme;
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

const StyledLink = styled(Link)<StyledLinkProps>(({ $buttonColor, theme }) => {
  const color = getButtonColor({
    buttonColor: $buttonColor,
    theme
  });

  return {
    padding: '3px 9px',

    // Increase specificity
    '&&': {
      display: 'inline-block',
      fontFamily: options.headerFontFamily.join(','),
      borderRadius: theme.shape.borderRadius,
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
