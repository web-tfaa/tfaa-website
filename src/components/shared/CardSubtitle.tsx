// External Dependencies
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { options } from '../../utils/typography';

// Local Typings
interface Props {
  children: string;
}

// Local Variables
const StyledTypography = styled(Typography)({
  '&': {
    fontFamily: options.headerFontFamily.join(','),
    fontWeight: 600,
  },
}) as typeof Typography;

// Component Definition
const CardSubtitle: FC<Props> = ({ children }) => (
  <StyledTypography
    component="h3"
    variant="subtitle"
  >
    {children}
  </StyledTypography>
);

export default CardSubtitle;
