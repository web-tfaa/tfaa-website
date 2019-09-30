// External Dependencies
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import React from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

// Local Variables
const propTypes = {
  activeStep: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isViewingSponsors: PropTypes.bool,
};

const defaultProps = {
  isViewingSponsors: false,
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
    <Card>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Card>
  );
};

RegisterStepper.propTypes = propTypes;
RegisterStepper.defaultProps = defaultProps;

export default RegisterStepper;
