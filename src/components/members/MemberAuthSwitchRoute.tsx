// External Dependencies
import React from 'react';

// Internal Dependencies
import { useGetAuthUser } from '../../utils/hooks/useGetAuthUser';
import MemberContent from './MemberContent';
import NonMemberContent from './NonMemberContent';

// Component Definition
const MemberAuthSwitchRoute: React.FC = () => {
  const { currentAuthUser } = useGetAuthUser();

  console.log('switch route, currentAuthUser', currentAuthUser);

  const isAuthenticated = Boolean(currentAuthUser);

  if (!isAuthenticated) {
    return <NonMemberContent />;
  }

  return <MemberContent currentAuthUser={currentAuthUser} />;
};

export default MemberAuthSwitchRoute;
