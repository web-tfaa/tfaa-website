// External Dependencies
import { navigate } from 'gatsby';
import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import AuthUserContext from '../../session/AuthUserContext';
import MembersBanner from '../NonMemberContent/MembersBanner';

// Component Definition
const MemberContent: React.FC = () => {
  const authUser = useContext(AuthUserContext);

  console.log('MemberContent : authUser', authUser);

  const isAuthenticated = Boolean(authUser);

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <>
      <MembersBanner />

      <Typography variant="h2">
        Member Dashboard
      </Typography>
    </>
  );
};

export default MemberContent;
