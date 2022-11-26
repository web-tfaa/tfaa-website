// Internal Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';
import { options } from '../../utils/typography';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  fontFamily: options.headerFontFamily.join(','),
  marginBottom: theme.spacing(2),
}));

// Component Definition
const FuturaDiv: FC<Props> = ({ children }) => (
  <StyledRoot>
    {children}
  </StyledRoot>
);

export default FuturaDiv;
