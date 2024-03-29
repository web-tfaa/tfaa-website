// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { navigate } from 'gatsby';
import Divider from '@mui/material/Divider';
import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { ReCaptchaProvider } from '../../components/shared/ReCaptchaProvider';
import { useIsAuthenticated } from '../../utils/hooks/useIsAuthenticated';
import DrumBanner from '../../components/shared/DrumBanner';
import FooterTopper from '../../components/footer/FooterTopper';
import Layout from '../../components/layout';
import LoginForm from '../../components/register/login-form';
import Motifs from '../../components/shared/Motifs';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.loginContent': {
    [theme.breakpoints.down('mobile')]: {
      padding: theme.spacing(6, 10),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8),
    },
    padding: theme.spacing(8, 15),
    position: 'relative',
  },
  '.loginDivider': {
    marginBottom: theme.spacing(2),
  },
  '.loginTitle': {
    fontSize: 30,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden',
  position: 'relative',
  width: '100vw',
}));

// Component Definition
const Login: React.FC<Props> = ({ location }) => {
  const isAuthenticated = useIsAuthenticated();

  const handleRedirectToMembers = useCallback(() => {
    navigate('/members');
  }, []);

  if (isAuthenticated) {
    handleRedirectToMembers();
  }

  return (
    <Layout
      location={location}
      pageTitle="Log In"
    >
      <ReCaptchaProvider>
        <StyledRoot>
          <DrumBanner drumBannerTitle="Member Log In" />

          <div className="loginContent">
            <Motifs small />

            <Typography
              className="loginTitle"
              component="h2"
            >
              Login
            </Typography>

            <LoginForm />

            <Divider className="loginDivider" />

            <Typography>
              <Link to="/members/pw-forget">Forgot Password?</Link>
            </Typography>
          </div>
        </StyledRoot>
      </ReCaptchaProvider>

      <FooterTopper color="membership" />
    </Layout>
  );
};

export default Login;
