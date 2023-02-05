// External Dependencies
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby-theme-material-ui';
import { navigate } from 'gatsby';
import React, { useCallback } from 'react';

// Internal Dependencies
import { GatsbyContextProps } from '../../types/shared';
import { ReCaptchaProvider } from '../../components/shared/ReCaptchaProvider';
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import FormHr from '../../components/shared/form-hr';
import Layout from '../../components/layout';
import LoginForm from '../../components/register/login-form';

// Local Typings
interface Props {
  location: Location;
  isAuthenticated: boolean;
}

// Component Definition
const Login: React.FC<Props> = ({
  isAuthenticated,
  location,
}) => {
  const handleRedirectToMembers = useCallback(() => {
    navigate('/members/login');
  }, []);

  if (isAuthenticated) {
    handleRedirectToMembers();
    return null;
  }

  return (
    <Layout location={location}>
      <ReCaptchaProvider>
        <div>
          <Container>
            <Helmet>
              <title>TMAC | Log In</title>
            </Helmet>

            <Box
              component="h2"
              marginY={2}
            >
              Login
            </Box>

            <FormHr />

            <LoginForm />

            <FormHr />

            <p>
              <Link to="/members/pw-forget">Forgot Password?</Link>
            </p>
          </Container>
        </div>
      </ReCaptchaProvider>
    </Layout>
  );
};

const LoginWithContext = (props: GatsbyContextProps) => (
  <AuthUserContext.Consumer>
    {(authUser) => {
      const isAuthenticated = Boolean(authUser);

      return (
        <Login
          {...props}
          isAuthenticated={isAuthenticated}
        />
      );
    }}
  </AuthUserContext.Consumer>
);

export default LoginWithContext;
