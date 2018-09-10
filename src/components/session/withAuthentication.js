// https://github.com/taming-the-state-in-react/gatsby-firebase-authentication/blob/master/src/components/Session/withAuthentication.js

import React from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const withAuthentication = Component =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        // fire: null,
      };
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        firebase.auth.onAuthStateChanged(authUser =>
          authUser
            ? this.setState(() => ({
              authUser,
            }))
            : this.setState(() => ({
              authUser: null,
            })),
        );

        // this.setState({ fire: firebase.firestore })
      }
    }

    render() {
      const { authUser } = this.state;
      console.log('fireeeee', this.state);

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };

export default withAuthentication;
