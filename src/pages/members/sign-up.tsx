// External Dependencies
import React from 'react';
import { Link } from 'gatsby-theme-material-ui';
import styled from 'styled-components';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
// import SignupForm from '../../components/register/SignupForm';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.signup-h2': {
    margin: '1rem 0',
  },

  'signup-message': {
    marginBottom: 16,
    maxWidth: '70%',
  },

  [theme.breakpoints.up('mobile')]: {
    paddingLeft: '1.5rem',
  },
  paddingLeft: 0,
}));

// Component Definition
const SignUp: React.FC<Props> = ({ location }) => (
  <Layout
    location={location}
    pageTitle="Sign Up"
  >
    <StyledRoot>
      <Container className="sign-up">
        <h2 className="signup-h2">Sign Up</h2>

        <div
          className="signup-message"
          key="signup-message"
        >
          Membership is open to TMAC members. For information about
          joining TMAC, head over to the&nbsp;
          <Link to="/members">Members page</Link>.
        </div>

        {/* <SignupForm /> */}
      </Container>
    </StyledRoot>
  </Layout>
);

export default SignUp;
