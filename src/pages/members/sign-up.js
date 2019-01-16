// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

// Internal Dependencies
import Container from '../../components/shared/container';
import FormHr from '../../components/shared/form-hr';
import Layout from '../../components/layout';
import SignupForm from '../../components/register/signup-form';
import presets from '../../utils/presets';

// Component Definition
const SignUp = ({ location }) => {
  return (
    <Layout location={location}>
      <div
        css={{
          paddingLeft: 0,
          [presets.Tablet]: {
            paddingLeft: '1.5rem',
          },
        }}>
        <Container className="sign-up">
          <Helmet>
            <title>TMAC | Sign Up</title>
          </Helmet>
          <h2 css={{ margin: '1rem 0' }}>Sign Up</h2>

          <FormHr />

          <div
            css={{ marginBottom: 16, maxWidth: '70%' }}
            key="signup-message"
          >
            Registration is open to TMAC members. For information about
            joining TMAC, head over to the&nbsp;
            <Link to="/members">Members page</Link>.
          </div>

          <SignupForm />
        </Container>
      </div>
    </Layout>
  );
};

SignUp.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default SignUp;
