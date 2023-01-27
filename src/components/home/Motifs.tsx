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

  backgroundSize: 'contain',
  overflow: 'hidden',
  padding: theme.spacing(5, 0, 2.5),
  position: 'relative',
  width: '100%',
  top: 0,
  left: 0,
  height: 614,
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
