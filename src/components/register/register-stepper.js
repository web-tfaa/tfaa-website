// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Material-UI Dependencies
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

// Local Variables
const propTypes = {
  activeStep: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isViewingSponsors: PropTypes.bool.isRequired,
};

// Local Functions
function getSteps(isAuthenticated = false, isViewingSponsors = false) {
  return [
    // We show a different message if the user is already logged in
    isAuthenticated
      ? 'Login to the TMAC members area'
      : 'Sign up for TMAC website login',
    'Complete registration form',
    isViewingSponsors
      ? 'Choose Sponsorship level and make payment'
      : 'Pay TMAC dues',
  ];
}

// Component Definition
const RegisterStepper = (props) => {
  const {
    activeStep,
    isAuthenticated,
    isViewingSponsors,
  } = props;

  const steps = getSteps(isAuthenticated, isViewingSponsors);

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

RegisterStepper.propTypes = propTypes;
export default RegisterStepper;
