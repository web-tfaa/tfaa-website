// External Dependencies
import React, { useMemo } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';

// Hook Definition
export const useIsAuthenticated = () => {
  const authUser = React.useContext(AuthUserContext);

  return useMemo(() => Boolean(authUser), [authUser]);
}
