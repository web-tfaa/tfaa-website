// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  children: React.ReactNode;
  className?: string;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  [theme.breakpoints.up('mobile')]: {
    paddingBottom: 83,
  },

  margin: '0 auto',
  maxWidth: 880,
  padding: '36px 18px',
  paddingBottom: 38,
  position: 'relative',
}));

// Component Definition
const Container: FC<Props> = ({
  children,
  className,
  ...otherProps
}) => (
  <StyledRoot
    className={className}
    {...otherProps}
  >
    {children}
  </StyledRoot>
);

export default Container;
