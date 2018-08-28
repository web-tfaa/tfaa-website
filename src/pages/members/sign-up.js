// External Dependencies
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import { Link } from 'gatsby';

// Internal Dependencies
import Container from '../../components/shared/container';
import FormHr from '../../components/shared/form-hr';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import SignupForm from '../../components/register/signup-form';

// Component Definition
class SignUp extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div css={{
          paddingLeft: 0,
          [presets.Tablet]: {
            paddingLeft: '1.5rem',
          },
        }}>
          <Container className="sign-up">
            <Helmet>
              <title>TMAC | Sign Up</title>
            </Helmet>
            <h2 css={{ margin: '1rem 0' }}>
              Sign Up
            </h2>

            <FormHr />

            <div
              css={{ marginBottom: 16, maxWidth: '70%' }}
              key="signup-message"
            >
              Registration is open to TMAC members. For information about joining TMAC, head over to the&nbsp;
              <Link to={'/members'}>Members page</Link>.
            </div>

            <SignupForm />

          </Container>
        </div>
      </Layout>
    );
  }
}

export default SignUp;
