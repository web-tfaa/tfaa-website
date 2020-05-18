// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import FormHr from '../../components/shared/form-hr';
import Layout from '../../components/layout';
import LoginForm from '../../components/register/login-form';
import presets from '../../utils/presets';

// Component Definition
class Login extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  handleRedirectToMembers = () => {
    navigate('/members/login');
  };

  render() {
    const {
      isAuthenticated,
      location,
    } = this.props;

    return isAuthenticated
      ? this.handleRedirectToMembers
      : (
        <Layout location={location}>
          <div
            css={{
              paddingLeft: 0,
              [presets.Tablet]: {
                paddingLeft: !isAuthenticated ? '1.5rem' : 0,
              },
            }}
          >
            <Container className="login">
              <Helmet>
                <title>TMAC | Log In</title>
              </Helmet>
              <h2
                css={{
                  margin: '1rem 0',
                }}
              >
                Login
              </h2>

              <FormHr />

              <LoginForm />

              <FormHr />

              <p>
                <Link to="/members/pw-forget">Forgot Password?</Link>
              </p>
            </Container>
          </div>
        </Layout>
      );
  }
}

const LoginWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <Login {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default LoginWithContext;
