// External Dependencies
import React, { useEffect, useState } from 'react';

// Internal Dependencies
import { useGetAuthUser } from '../../../utils/hooks/useGetAuthUser';
import MembersListContent from './MembersListContent';

// Component Definition
const MembersListAuthSwitchRoute: React.FC = () => {
  const { currentAuthUser } = useGetAuthUser();

  const [renderCount, setRenderCount] = useState(0);

  const isAuthenticated = Boolean(currentAuthUser);

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, []);

  if (!renderCount && !isAuthenticated) {
    return null;
  }

  return <MembersListContent currentAuthUser={currentAuthUser} />;
};

export default MembersListAuthSwitchRoute;
