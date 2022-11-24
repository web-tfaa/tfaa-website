// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Local Variables
const StyledRoot = styled.div({
  display: 'flex',
  flex: '0 1 auto',
  flexWrap: 'wrap',
  background: '#fff',
  boxShadow: '0 5px 20px rgba(25, 17, 34, 0.1)',
  transform: 'translateZ(0)',
});

// Component Definition
const Cards: FC<Props> = ({ children }) => (
  <StyledRoot>
    {children}
  </StyledRoot>
);

export default Cards;
