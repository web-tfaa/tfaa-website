// External Dependencies
import { Helmet } from 'react-helmet';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { ReCaptchaProvider } from '../../components/shared/ReCaptchaProvider';
import { auth } from '../../firebase';
import { options } from '../../utils/typography';
import { emailRegex } from '../../utils/helpers';
import Container from '../../components/shared/container';
import FormHr from '../../components/shared/form-hr';
import Layout from '../../components/layout';

// Local Variables
const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

const StyledRoot = styled.div(({ theme }) => ({
  '.errorMessage': {
    color: 'red',
    fontFamily: options.headerFontFamily.join(','),
    fontWeight: 500,
    margin: theme.spacing(2, 0),
  },

  '.successMessage': {
    background: theme.palette.loginStatus,
    color: theme.palette.texasFlag.blue,
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },

  '.title': {
    margin: theme.spacing(3, 0),
  },

  input: {
    display: 'block',
    fontFamily: options.headerFontFamily.join(','),
    fontSize: '1rem',
    marginBottom: theme.spacing(3),
    padding: '0.2rem',
    width: 288,
  },

  [theme.breakpoints.up('mobile')]: {
    paddingLeft: theme.spacing(3),
  },

  paddingLeft: 0,
}));

const INITIAL_STATE = {
  email: '',
  error: null,
  showSuccessMessage: false,
};

// Local Functions
const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

// Component Definition
class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  handleRedirectToMembers = () => {
    navigate('/members/login');
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;
    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE,
          showSuccessMessage: true,
        }));

        setTimeout(this.handleRedirectToMembers, 7000);
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  };

  render() {
    const {
      location,
    } = this.props;

    const {
      email,
      error,
      showSuccessMessage,
    } = this.state;

    const isInvalid = email === '' || !emailRegex.test(email);

    return (
      <Layout location={location}>
        <ReCaptchaProvider>
          <StyledRoot>
            <Container className="password-forget">
              <Helmet>
                <title>TMAC | Forgot Password</title>
              </Helmet>

              <h2 className="title">
                Password Reset
              </h2>

              <FormHr />

              {showSuccessMessage && (
                <div className="successMessage">
                  Check your email to reset your password!
                </div>
              )}
              <form onSubmit={this.onSubmit}>
                <input
                  onChange={(event) =>
                    this.setState(
                      updateByPropertyName('email', event.target.value),
                    )}
                  placeholder="Email Address"
                  type="text"
                  value={email}
                />

                <button
                  disabled={isInvalid}
                  type="submit"
                >
                  Reset My Password
                </button>

                {error && (
                  <div className="errorMessage">
                    {error.message}
                  </div>
                )}
              </form>
            </Container>
          </StyledRoot>
        </ReCaptchaProvider>
      </Layout>
    );
  }
}

PasswordForgetForm.propTypes = propTypes;

export default PasswordForgetForm;
