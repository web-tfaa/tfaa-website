// https://github.com/taming-the-state-in-react/gatsby-firebase-authentication/blob/master/src/components/Session/AuthUserContext.js
// External Dependencies
import React from 'react';

// Internal Dependencies
import { TfaaAuthUser } from '../layout';

const AuthUserContext = React.createContext<TfaaAuthUser | null>(null);

export default AuthUserContext;
