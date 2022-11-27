// Internal Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';
import { options } from '../../utils/typography';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Local Variables
const StyledRoot = styled.p({
  fontFamily: options.headerFontFamily.join(','),
  lineHeight: '1.6',
});

// Component Definition
const FuturaParagraph: FC<Props> = ({ children }) => (
  <StyledRoot>
    {children}
  </StyledRoot>
);

export default FuturaParagraph;
