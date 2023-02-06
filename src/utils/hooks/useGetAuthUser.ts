// External Dependencies
import React, { useMemo } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';

// Hook Definition
export const useGetAuthUser = () => {
  const { currentAuthUser, setCurrentAuthUser } = React.useContext(AuthUserContext);

  console.log('useGetAuthUser', currentAuthUser);

  const authenticatedUser = useMemo(() => currentAuthUser, [currentAuthUser])

  return {
    currentAuthUser: authenticatedUser,
    setCurrentAuthUser,
  };
}
