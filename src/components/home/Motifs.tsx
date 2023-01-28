// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.redMotif': {
    [theme.breakpoints.down('lg')]: {
      right: -64,
      top: -64,
    },
    [theme.breakpoints.down('mobile')]: {
      height: 100,
      right: -200,
      top: -4,
    },

    height: 200,
    position: 'absolute',
    right: -20,
    top: -44,
    width: 494,
  },

  '.tealMotif': {
    [theme.breakpoints.down('mobile')]: {
      height: 500,
      left: -264,
      top: -60,
    },

    height: 533,
    position: 'absolute',
    left: -240,
    top: -54,
    width: 335,
  },
}));

// Component Definition
const Motifs: FC = () => {
  return (
    <StyledRoot>
      <img
        alt="Teal motif."
        aria-hidden="true"
        className="tealMotif"
        src="/teal-motif.svg"
      />
      <img
        alt="Red motif."
        aria-hidden="true"
        className="redMotif"
        src="/red-motif.svg"
      />
    </StyledRoot>
  );
};

export default Motifs;
