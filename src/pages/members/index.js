// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';

// Internal Dependencies
import Container from '../../components/shared/container';
import LoginForm from '../../components/members/login-form';
import {
  handleLogin,
  isLoggedIn,
} from '../../utils/auth';

// Component Definition
class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    handleLogin(this.state);
  }

  render() {
    if (isLoggedIn()) {
      return <Redirect to={{ pathname: '/members/home' }} />;
    }

    return (
      <Container title="Log In">
        <Helmet>
          <title>TMAC | Log In</title>
        </Helmet>
        <LoginForm
          handleUpdate={e => this.handleUpdate(e)}
          handleSubmit={e => this.handleSubmit(e)}
        />
      </Container>
    );
  }
}

export default Login;