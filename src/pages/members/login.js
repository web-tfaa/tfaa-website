// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';

// Internal Dependencies
import Container from '../../components/shared/container';
import LoginForm from '../../components/members/login-form';
// import firebase from '../../utils/firebase-config';
import presets from '../../utils/presets';
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

    const isAuthenticated = false;

    if (isAuthenticated) {
      return <Redirect to={{ pathname: '/members' }} />;
    }

    return (
      <div css={{
        paddingLeft: 0,
        [presets.Tablet]: {
          paddingLeft: !isAuthenticated ? '1.5rem' : 0,
        },
      }}>
        <Container className="login-form">
          <Helmet>
            <title>TMAC | Log In</title>
          </Helmet>
          <LoginForm />
        </Container>
     </div>
    );
  }
}

export default Login;
