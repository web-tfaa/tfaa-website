// External Dependencies
import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import { TfaaAuthUser } from '../../layout';

// Local Typings
interface Props {
  authUser: TfaaAuthUser | null;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.welcomeMember': {
    fontSize: 30,
    fontWeight: 600,
  },

  alignItems: 'center',
  backgroundColor: theme.palette.tfaa.membership,
  color: theme.palette.common.white,
  display: 'flex',
  height: 72,
  padding: theme.spacing(0, 18),
  width: '100%',
}));

// Component Definition
const WelcomeBanner: React.FC<Props> = ({ authUser }) => {
  const name = authUser?.email;

  return (
    <StyledRoot>
      <Typography className="welcomeMember">
        Welcome, {name}
      </Typography>
    </StyledRoot>
  );
};

export default WelcomeBanner;
