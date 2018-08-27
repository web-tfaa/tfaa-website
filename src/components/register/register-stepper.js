// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material-UI Dependencies
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// Local Variables
const propTypes = {
  activeStep: PropTypes.number.isRequired,
};

// Local Functions
function getSteps() {
  return ['Sign up for TMAC website login', 'Complete registration form', 'Pay TMAC dues'];
}

// Component Definition
class RegisterStepper extends Component {
  render() {
    const {
      activeStep,
    } = this.props;

    const steps = getSteps();

    return (
      <div sss={{ width: '90%' }}>
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
