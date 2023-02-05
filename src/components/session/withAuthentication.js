// https://github.com/taming-the-state-in-react/gatsby-firebase-authentication/blob/master/src/components/Session/withAuthentication.js

// External Dependencies
import React from 'react';

// Internal Dependencies
import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

// Higher-Order Component Definition
const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        firebase.auth.onAuthStateChanged((authUser) =>
          (authUser
            ? this.setState(() => ({
              authUser,
            }))
            : this.setState(() => ({
              authUser: null,
            }))));
      }
    }

    render() {
      const { authUser } = this.state;

      console.log('withAuthentication HOC : authUser', authUser);

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };

export default withAuthentication;
