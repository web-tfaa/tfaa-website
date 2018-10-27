/*
  Main container for the Registration process
*/

// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import RegisterEmail from '../../components/register/register-email';
import RegisterInfo from '../../components/register/register-info';
import RegisterPayment from '../../components/register/register-payment';
import RegisterStepper from '../../components/register/register-stepper';
import Status from '../members/status';

// Sidebar Data
// import membersSidebar from './members-links.yml';
// import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Component Definition
class RegisterSponsorContent extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      // Possible completed steps are [0, 1, 2]
      completedSteps: [],
      form: {},
    };

    this.activeComponent = true;
  }

  componentDidMount() {
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
      location: {
        state: {
          level,
        },
      },
    } = this.props;

    console.log('level clicked:', level);

    const {
      activeStep,
      form,
    } = this.state;

    const isViewingSponsors = window && window.location.href.includes('sponsors');

    const step1Content = (
      <RegisterEmail
        isAuthenticated={isAuthenticated}
        onCompleteStep={this.handleCompleteStep}
      />
    );

    const step2Content = (
      <RegisterInfo
        isViewingSponsors={isViewingSponsors}
        onCompleteStep={this.handleCompleteStep}
      />
    );

    const step3Content = (
      <RegisterPayment
        form={form}
        isViewingSponsors={isViewingSponsors}
        initialLevel={level}
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
          [presets.Tablet]: {
            paddingLeft: !isAuthenticated ? '1.5rem' : 0,
          },
        }}
      >
        <Status />
        <Container>
          <Helmet>
            <title>TMAC | Register Sponsor</title>
          </Helmet>

          <RegisterStepper
            isAuthenticated={isAuthenticated}
            activeStep={activeStep}
          />

          {this.getCurrentStepContent(isAuthenticated)}

          {!hasCompletedAllSteps && (
            <div style={{ marginTop: '1.5rem' }}>
              * Sponsor Registration is not complete until payment is received.
            </div>
          )}
        </Container>

        {/* <div
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
        </div> */}
      </div>
    );
  }
}

const RegisterSponsor = props => (
  // eslint-disable-next-line
  <Layout location={props.location}>
    <RegisterSponsorWithContext {...props} />
  </Layout>
);

const RegisterSponsorWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <RegisterSponsorContent {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default RegisterSponsor;
