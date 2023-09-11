// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.mobileHr': {
    border: 0,
    height: 2,
    marginTop: 10,
  },
  [theme.breakpoints.up('mobile')]: {
    display: 'none',
  },

  display: 'block',
}));

// Component Definition
const MobileDivider: FC<Props> = ({ children }) => (
  <StyledRoot>
    <hr className="mobileHr" />
    {children}
  </StyledRoot>
);

export default MobileDivider;
