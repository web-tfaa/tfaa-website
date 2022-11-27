// External Dependencies
import React from 'react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import styled from 'styled-components';

// Local Variables
const StyledArrowForward = styled(ArrowForward)({
  transform: 'translateY(8px)',
  marginLeft: '0.5em',
});

// Component Definition
const ArrowForwardIcon = () => <StyledArrowForward />;

export default ArrowForwardIcon;
