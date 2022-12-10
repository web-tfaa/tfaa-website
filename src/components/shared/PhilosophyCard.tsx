// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../utils/presets';
import { rhythm } from '../../utils/typography';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.cardContent': {
    padding: rhythm(presets.gutters.default / 2),
    paddingBottom: 0,
    transform: 'translateZ(0)',
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
    borderLeft: `1px solid ${theme.palette.ui.light}`,
    flex: '0 0 100%',
    maxWidth: '100%',
    '&:nth-child(4)': {
      boxShadow: 'none',
    },
    '&:nth-child(3n+1)': {
      borderLeft: 0,
    },
  },

  boxSizing: 'border-box',
  display: 'flex',
  transform: 'translateZ(0)',
}));

// Component Definition
const PhilosophyCard: FC<Props> = ({ children }) => (
  <StyledRoot>
    <div className="cardContent">
      {children}
    </div>
  </StyledRoot>
);

export default PhilosophyCard;
