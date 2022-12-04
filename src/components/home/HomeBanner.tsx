// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  'h1, h2': {
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightMedium,
  },
  h1: {
    fontSize: 92,
    lineHeight: '92px',
  },
  h2: {
    fontSize: 40,
    lineHeight: '40px',
  },

  '& > div': {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  backgroundColor: theme.palette.grey['900'],
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  width: '100%',
}));

// Component Definition
const HomeBanner: React.FC = () => (
  <StyledRoot>
    <div>
      <h2>We nurture and grow leaders in Fine Arts Education</h2>
    </div>

    <div>
      <h1>Fine Arts for Everyone!</h1>
    </div>
  </StyledRoot>
);

export default HomeBanner;
