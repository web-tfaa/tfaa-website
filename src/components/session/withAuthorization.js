// https://github.com/taming-the-state-in-react/gatsby-firebase-authentication/blob/master/src/components/Session/withAuthorization.js

import React from 'react';
import { navigate } from "gatsby";

import AuthUserContext from './session/AuthUserContext';
import { firebase } from '../../firebase';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      if (typeof window !== 'undefined') {
        firebase.auth.onAuthStateChanged(authUser => {
          if (!condition(authUser)) {
            navigate('/members');
          }
        });
      }
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {fire => (fire.authUser ? <Component {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  return WithAuthorization;
};

export default withAuthorization;
