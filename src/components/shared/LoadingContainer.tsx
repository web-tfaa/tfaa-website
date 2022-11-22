// External Dependencies
import { CircularProgress } from '@mui/material';
import { FC } from 'react';
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
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(4),
}));

// Component Definition
const LoadingContainer: FC<Props> = ({
  step,
  title,
}) => (
  <StyledRoot>
    <h2>{title}</h2>
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
