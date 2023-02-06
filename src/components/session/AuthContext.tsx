// External Dependencies
import React, { useContext, useEffect, useState  } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

// Internal Dependencies
import { AuthUserFromFirebase } from '../layout';
import { auth } from '../../firebase';

// Local Typings
type CurrentUser = AuthUserFromFirebase | null;
interface AuthContextValue {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>> | null;
}

// Local Variables
const defaultContext = {
  currentUser: null,
  setCurrentUser: null,
};

export const AuthContext = React.createContext<AuthContextValue>(defaultContext);
export const useAuth = () => useContext(AuthContext);

// Component Definition
const AuthProvider = ({ children }: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      onAuthStateChanged(auth, (user) => {
        setCurrentUser(user as CurrentUser);
      });
    }
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthValue(){
  return useContext(AuthContext)
}

export default AuthProvider;
