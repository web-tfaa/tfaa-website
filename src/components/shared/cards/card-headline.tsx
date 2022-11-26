// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../../utils/presets';
import { scale } from '../../../utils/typography';

// Local Typings
interface Props {
  children: React.ReactNode;
  gutterBottom?: boolean;
}

// Local Variables
const StyledH2 = styled.h2(({ $gutterBottom }) => ({
  ...scale(2 / 5),
  lineHeight: 1.2,
  marginTop: 0,
  marginBottom: $gutterBottom ? 'inherit' : 0,
  [presets.Tablet]: {
    fontSize: scale(1 / 10).fontSize,
  },
  [presets.Desktop]: {
    fontSize: scale(3 / 10).fontSize,
  },
  [presets.VHd]: {
    fontSize: scale(5 / 10).fontSize,
  },
  [presets.VVHd]: {
    fontSize: scale(7 / 10).fontSize,
  },
}));

// Component Definition
const CardHeadline: FC<Props> = ({
  children,
  gutterBottom = true,
}) => (
  <StyledH2 $gutterBottom={gutterBottom}>
    {children}
  </StyledH2>
);

export default CardHeadline;
