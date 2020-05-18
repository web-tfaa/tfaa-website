/*
  Main container for the Registration process
*/

// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import RegisterEmail from '../../components/register/register-email';
import RegisterInfo from '../../components/register/register-info';
import RegisterPayment from '../../components/register/register-payment';
import RegisterStepper from '../../components/register/register-stepper';
import Status from './status';
import presets from '../../utils/presets';

// Sidebar Data
import membersSidebar from './members-links.yml';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Local Variables
const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

// Component Definition
class RegisterContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      form: {},
      // Possible completed steps are [0, 1, 2]
      completedSteps: [],
    };
  }

  componentDidMount() {
    this.activeComponent = true;

    const {
      isAuthenticated,
    } = this.props;

    const {
      activeStep,
    } = this.state;

    if (activeStep === 0 && isAuthenticated) {
      this.setState({ activeStep: 1 });
    }
  }

  componentWillUnmount() {
    this.activeComponent = false;
  }

  getCurrentStepContent(isAuthenticated) {
    const {
      activeStep,
      form,
    } = this.state;

    const step1Content = (
      <RegisterEmail
        isAuthenticated={isAuthenticated}
        onCompleteStep={this.handleCompleteStep}
      />
    );

    const step2Content = (
      <RegisterInfo onCompleteStep={this.handleCompleteStep} />
    );

    const step3Content = (
      <RegisterPayment
        form={form}
        onCompleteStep={this.handleCompleteStep}
      />
    );

    let currentStepContent;
    switch (activeStep) {
      case 0:
        currentStepContent = step1Content;
        break;
      case 1:
        currentStepContent = step2Content;
        break;
      case 2: case 3:
        currentStepContent = step3Content;
        break;
      default:
        currentStepContent = step1Content;
        break;
    }
    return currentStepContent;
  }

  handleCompleteStep = (step, updatedForm = {}) => {
    const {
      activeStep,
      completedSteps,
      form,
    } = this.state;

    if (this.activeComponent) {
      this.setState({
        activeStep: activeStep + 1,
        completedSteps: [...completedSteps, step],
        form: {
          ...form,
          ...updatedForm,
        },
      });
    }
  };

  render() {
    const {
      isAuthenticated,
    } = this.props;

    const {
      activeStep,
      completedSteps,
    } = this.state;

    const hasCompletedAllSteps = completedSteps.length >= 3;

    /* Children change depending on which step is active */
    return (
      <div
        css={{
          paddingLeft: 0,
          width: '0 auto',
        }}
      >
        <Status />
        <Container>
          <Helmet>
            <title>TMAC | Register</title>
          </Helmet>

          <RegisterStepper
            isAuthenticated={isAuthenticated}
            activeStep={activeStep}
          />

          {this.getCurrentStepContent(isAuthenticated)}

          {!hasCompletedAllSteps && (
            <div style={{ marginTop: '1.5rem' }}>
              * Registration is not complete until payment is received.
            </div>
          )}
        </Container>

        <div
          css={{
            display: 'block',
            [presets.Tablet]: {
              display: 'none',
            },
          }}
        >
          <hr
            css={{
              border: 0,
              height: 2,
              marginTop: 10,
            }}
          />
          <SidebarBody inline yaml={membersSidebar} />
        </div>
      </div>
    );
  }
}

RegisterContent.propTypes = propTypes;

const Register = (props) => (
  // eslint-disable-next-line
  <Layout location={props.location}>
    <RegisterWithContext {...props} />
  </Layout>
);

const RegisterWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <RegisterContent {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default Register;
