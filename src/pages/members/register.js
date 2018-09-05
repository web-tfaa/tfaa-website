/*
  Main container for the Registration process
*/

// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import RegisterEmail from '../../components/register/register-email';
import RegisterInfo from '../../components/register/register-info';
import RegisterPayment from '../../components/register/register-payment';
import RegisterStepper from '../../components/register/register-stepper';
import Status from './status';
import { firebase } from '../../firebase';

// Sidebar Data
import membersSidebar from './members-links.yml';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Component Definition
class Register extends Component {
  static propTypes = {
    location: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      authUser: null,
      form: {},
      // Possible completed steps are [0, 1, 2]
      completedSteps: [],
    };

    this.activeComponent = true;
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(
      authUser =>
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null })),
    );
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
      case 2:
        currentStepContent = step3Content;
        break;
      default:
        currentStepContent = step1Content;
        break;
    }
    return currentStepContent;
  }

  handleCompleteStep = (step, updatedForm) => {
    const {
      activeStep,
      completedSteps,
      form,
    } = this.state;

    if (this.activeComponent) {
      this.setState({
        activeStep: activeStep + 1,
        completedSteps: [...completedSteps, ...step],
        form: {
          ...form,
          ...updatedForm,
        },
      });
    }
  };

  render() {
    const { location } = this.props;
    const {
      activeStep,
      authUser,
      completedSteps,
    } = this.state;

    const isAuthenticated = Boolean(authUser);

    const hasCompletedAllSteps = completedSteps.length === 3;

    return (
      <Layout location={location}>
        <div
          css={{
            paddingLeft: 0,
            width: `0 auto`,
            [presets.Tablet]: {
              paddingLeft: !isAuthenticated ? '1.5rem' : 0,
            },
          }}>
          <Status authUser={authUser} />
          <Container>
            <Helmet>
              <title>TMAC | Register</title>
            </Helmet>

            {/* Children change depending on which step is active */}

            <RegisterStepper
              isAuthenticated={isAuthenticated}
              activeStep={activeStep}
            />

            {this.getCurrentStepContent(isAuthenticated)}

            {!hasCompletedAllSteps && <div style={{ marginTop: '1.5rem' }}>
              * Registration is not complete until payment is received.
            </div>}
          </Container>

          <div
            css={{
              display: `block`,
              [presets.Tablet]: {
                display: `none`,
              },
            }}>
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
      </Layout>
    );
  }
}

export default Register;
