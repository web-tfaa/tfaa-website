// https://github.com/taming-the-state-in-react/gatsby-firebase-authentication/blob/master/src/components/Session/AuthUserContext.js
// External Dependencies
import React from 'react';

// Internal Dependencies
import { TfaaAuthUser } from '../layout';

// Local Typings
type CurrentUser = TfaaAuthUser | null;
interface AuthContextValue {
  currentAuthUser: CurrentUser;
  setCurrentAuthUser: React.Dispatch<React.SetStateAction<CurrentUser>> | null;
}

// Local Variables
const defaultContext = {
  currentAuthUser: null,
  setCurrentAuthUser: null,
};

const AuthUserContext = React.createContext<AuthContextValue>(defaultContext);

export default AuthUserContext;
