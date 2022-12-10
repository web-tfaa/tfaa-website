// External Dependencies
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby-theme-material-ui';
import { navigate } from 'gatsby';
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { ReCaptchaProvider } from '../../components/shared/ReCaptchaProvider';
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import FormHr from '../../components/shared/form-hr';
import Layout from '../../components/layout';
import LoginForm from '../../components/register/login-form';
import { GatsbyContextProps } from '../../types/shared';

// Local Typings
interface Props {
  location: Location;
  isAuthenticated: boolean;
}
interface StyledRootProps {
  $isAuthenticated: boolean;
}

// Local Variables
const StyledRoot = styled.div<StyledRootProps>(({ $isAuthenticated, theme }) => ({
  [theme.breakpoints.up('mobile')]: {
    paddingLeft: !$isAuthenticated ? theme.spacing(3) : 0,
  },

  paddingLeft: 0,
}));

// Component Definition
const Login: FC<Props> = ({
  isAuthenticated,
  location,
}) => {
  const handleRedirectToMembers = useCallback(() => {
    navigate('/members/login');
  }, []);

  if (isAuthenticated) {
    console.log('redirect #2');
    return handleRedirectToMembers();
  }

  return (
    <Layout location={location}>
      <ReCaptchaProvider>
        <StyledRoot $isAuthenticated={isAuthenticated}>
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
        </StyledRoot>
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
