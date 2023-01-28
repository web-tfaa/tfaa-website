// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  small?: boolean;
}
interface StyledRootProps {
  $small?: boolean;
}

// Local Variables
const StyledRoot = styled.section<StyledRootProps>(({ $small, theme }) => ({
  '.redMotif': {
    [theme.breakpoints.down('lg')]: {
      right: $small ? -144 : -64,
      top: $small ? -90 : -64,
    },
    [theme.breakpoints.down('mobile')]: {
      height: 100,
      right: -200,
      top: -4,
    },

    height: 200,
    position: 'absolute',
    right: $small ? -116 : -20,
    top: $small ? -80 : -44,
    width: 494,
  },

  '.tealMotif': {
    [theme.breakpoints.down('mobile')]: {
      height: 500,
      left: $small ? -290 : -264,
      top: -60,
    },

    height: 533,
    position: 'absolute',
    left: $small ? -290 : -240,
    top: -54,
    width: 335,
  },
}));

// Component Definition
const Motifs: FC<Props> = ({ small }) => {
  return (
    <StyledRoot $small={small}>
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
