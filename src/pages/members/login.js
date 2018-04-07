// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';

// Internal Dependencies
import Container from '../../components/shared/container';
import LoginForm from '../../components/members/login-form';
// import firebase from '../../utils/firebase-config';
import {
  handleLogin,
  isLoggedIn,
} from '../../utils/auth';

// Component Definition
class Login extends React.Component {
  render() {
    const {
      user,
    } = this.props;

    if (user) {
      return <Redirect to={{ pathname: '/members' }} />;
    }

    return (
      <Container>
        <Helmet>
          <title>TMAC | Log In</title>
        </Helmet>
        <LoginForm />
      </Container>
    );
  }
}

export default Login;
