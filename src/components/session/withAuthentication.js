// https://github.com/taming-the-state-in-react/gatsby-firebase-authentication/blob/master/src/components/Session/withAuthentication.js

import React from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const withAuthentication = Component =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        fire: {
          authUser: null,
          data: null,
        },
      };
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        firebase.auth.onAuthStateChanged(authUser => {
          return authUser
            ? this.setState(() => ({
              fire: {
                authUser,
                data: firebase.firestore,
              },
            }))
            : this.setState(() => ({
              fire: {
                authUser: null,
                data: null,
              },
            }));
        });
      }
    }

    render() {
      const { fire } = this.state;

      console.log('fireeeee', fire);

      return (
        <AuthUserContext.Provider value={fire}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };

export default withAuthentication;
