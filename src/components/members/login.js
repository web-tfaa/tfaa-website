// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';

// Internal Dependencies
import Container from '../shared/container';
import LoginForm from './login-form';
import { handleLogin, isLoggedIn } from '../utils/auth';

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
      return <Redirect to={{ pathname: '/members' }} />;
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
