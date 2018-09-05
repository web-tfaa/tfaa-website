// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { navigate } from 'gatsby';

// Internal Dependencies
import Container from '../../components/shared/container';
import FormHr from '../../components/shared/form-hr';
import Layout from '../../components/layout';
import presets, { colors } from '../../utils/presets';
import { auth } from '../../firebase';
import { options } from '../../utils/typography';
import { emailRegex } from '../../utils/helpers';

// Local Variables
const texasFlagBlue = '#002868';

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
  static propTypes = {
    location: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = event => {
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
      .catch(error => {
        this.setState({
          error,
        });
      });
  };

  handleRedirectToMembers = () => {
    navigate('/members/login');
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
        <div
          css={{
            paddingLeft: 0,
            [presets.Tablet]: {
              paddingLeft: '1.5rem',
            },
          }}>
          <Container className="password-forget">
            <Helmet>
              <title>TMAC | Forgot Password</title>
            </Helmet>
            <h2
              css={{
                margin: '1rem 0',
              }}>
              Password Reset
            </h2>

            <FormHr />

            {showSuccessMessage && (
              <div
                css={{
                  background: colors.status,
                  color: texasFlagBlue,
                  fontWeight: 500,
                  marginBottom: 16,
                  padding: '0.5rem',
                }}>
                Check your email to reset your password!
              </div>
            )}
            <form onSubmit={this.onSubmit}>
              <input
                css={{
                  display: 'block',
                  fontFamily: options.headerFontFamily.join(`,`),
                  fontSize: '1rem',
                  marginBottom: 24,
                  padding: '0.2rem',
                  width: 288,
                }}
                onChange={event =>
                  this.setState(
                    updateByPropertyName('email', event.target.value),
                  )
                }
                placeholder="Email Address"
                type="text"
                value={email}
              />
              <button disabled={isInvalid} type="submit">
                Reset My Password
              </button>
              {error && (
                <div
                  css={{
                    color: 'red',
                    fontWeight: 500,
                    fontFamily: options.headerFontFamily.join(`,`),
                    margin: '16px 0',
                  }}>
                  {error.message}
                </div>
              )}
            </form>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default PasswordForgetForm;
