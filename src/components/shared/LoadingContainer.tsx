// External Dependencies
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Local Typings
interface Props {
  step: number;
  title: string;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.loadingText': {
    marginBottom: theme.spacing(4),
  },
  '.loadingTitle': {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(4),
}));

// Component Definition
const LoadingContainer: React.FC<Props> = ({
  step,
  title,
}) => (
  <StyledRoot>
    <Typography
      className="loadingTitle"
      component="h2"
    >
      {title}
    </Typography>

    <p className="loadingText">
      Now loading step {step}...
    </p>

    <CircularProgress
      size={64}
      thickness={4}
    />
  </StyledRoot>
);

export default LoadingContainer;
