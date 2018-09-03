// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material-UI Dependencies
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// Local Variables
const propTypes = {
  activeStep: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

// Local Functions
function getSteps(isAuthenticated = false) {
  return [
    // We show a different message if the user is already logged in
    isAuthenticated
      ? 'Login to the TMAC members area'
      : 'Sign up for TMAC website login',
    'Complete registration form',
    'Pay TMAC dues',
  ];
}

// Component Definition
class RegisterStepper extends Component {
  render() {
    const { activeStep, isAuthenticated } = this.props;

    const steps = getSteps(isAuthenticated);

    return (
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

RegisterStepper.propTypes = propTypes;
export default RegisterStepper;
