// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../../utils/presets';
import { rhythm } from '../../../utils/typography';
import { vP, vPHd, vPVHd } from '../../../utils/gutters';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.innerContainer': {
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

    padding: rhythm(presets.gutters.default / 2),
    paddingBottom: 0,
    transform: 'translateZ(0)',
    width: '100%',
  },

  [theme.breakpoints.up('mobile')]: {
    boxShadow: `0 1px 0 0 ${theme.palette.ui.light}`,
    '&:nth-child(5),&:nth-child(6)': {
      boxShadow: 'none',
    },
    '&:nth-child(2n)': {
      borderLeft: `1px solid ${theme.palette.ui.light}`,
    },
  },
  [presets.Hd]: {
    flex: '1 0 100%',
    borderLeft: `1px solid ${theme.palette.ui.light}`,
    '&:nth-child(4)': {
      boxShadow: 'none',
    },
    '&:nth-child(3n+1)': {
      borderLeft: 0,
    },
  },

  borderBottom: `1px solid ${theme.palette.ui.light}`,
  boxSizing: 'border-box',
  display: 'flex',
  paddingBottom: theme.spacing(1),
  transform: 'translateZ(0)',
  width: '100%',
}));

// Component Definition
const Card: FC<Props> = ({ children, ...otherProps }) => (
  <StyledRoot
    {...otherProps}
  >
    <div className="innerContainer">
      {children}
    </div>
  </StyledRoot>
);

export default Card;
