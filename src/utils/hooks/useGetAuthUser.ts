// External Dependencies
import React, { useMemo } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';

// Hook Definition
export const useGetAuthUser = () => {
  const authUser = React.useContext(AuthUserContext);

  const authenticatedUser = useMemo(() => authUser, [authUser])

  return {
    authUser: authenticatedUser,
  };
}
