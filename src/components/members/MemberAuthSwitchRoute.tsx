// External Dependencies
import React from 'react';

// Internal Dependencies
import { useGetAuthUser } from '../../utils/hooks/useGetAuthUser';
import MemberContent from './MemberContent';
import NonMemberContent from './NonMemberContent';

// Component Definition
const MemberAuthSwitchRoute: React.FC = () => {
  const { authUser } = useGetAuthUser();

  console.log('MemberAuthSwitchRoute: authUser', authUser);

  const isAuthenticated = Boolean(authUser);

  if (!isAuthenticated) {
    return <NonMemberContent />;
  }

  return <MemberContent authUser={authUser} />;
};

export default MemberAuthSwitchRoute;
