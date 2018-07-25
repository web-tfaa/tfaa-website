// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import LoginForm from './login-form';
import { firebase } from '../../firebase';
import presets from '../../utils/presets';

// Component Definition
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    const {
      authUser,
    } = this.state;

    const isAuthenticated = Boolean(authUser);

    if (isAuthenticated) {
      return <Redirect to={{ pathname: '/members' }} />;
    }

    return (
      <Layout location={this.props.location}>
        <div css={{
          paddingLeft: 0,
          [presets.Tablet]: {
            paddingLeft: !isAuthenticated ? '1.5rem' : 0,
          },
        }}>
          <Container className="login">
            <Helmet>
              <title>TMAC | Log In</title>
            </Helmet>
            <h1
              css={{
                margin: '1rem 0',
              }}
            >
              Login
            </h1>
            <LoginForm />
          </Container>
       </div>
     </Layout>
    );
  }
}

export default Login;
