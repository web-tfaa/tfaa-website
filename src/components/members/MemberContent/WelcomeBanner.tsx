// External Dependencies
import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import { TfaaAuthUser } from '../../layout';

// Local Typings
interface Props {
  authUser: TfaaAuthUser | null;
  fullName: string;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.welcomeMember': {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 20,
    },
    fontSize: 30,
    fontWeight: 600,
  },

  [theme.breakpoints.down('mobile')]: {
    height: '100%',
    padding: theme.spacing(2.5, 8),
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
const WelcomeBanner: React.FC<Props> = ({
  authUser,
  fullName,
}) => {
  const name = fullName || authUser?.email;

  return (
    <StyledRoot>
      <Typography className="welcomeMember">
        Welcome, {name}
      </Typography>
    </StyledRoot>
  );
};

export default WelcomeBanner;
