// External Dependencies
import React, { useMemo } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';

// Hook Definition
export const useIsAuthenticated = () => {
  const { currentAuthUser } = React.useContext(AuthUserContext);

  return useMemo(() => Boolean(currentAuthUser), [currentAuthUser]);
}
