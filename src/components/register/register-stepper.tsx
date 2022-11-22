// External Dependencies
import {
  Card,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  activeStep: number;
  isAuthenticated: boolean;
  isViewingSponsors?: boolean;
}

// Local Functions
function getSteps(
  isAuthenticated = false,
  isViewingSponsors = false,
): string[] {
  return [
    isAuthenticated
      ? 'Sign in to the TMAC members area'
      : 'Sign up for TMAC website login',
    isViewingSponsors
      ? 'Complete sponsor form'
      : 'Complete membership form',
    isViewingSponsors
      ? 'Confirm Sponsor level and send payment'
      : 'Pay TMAC dues',
  ];
}

// Local Variables
const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  '.stepLabel': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
    fontSize: '0.9rem',
  },
}));

// Component Definition
const RegisterStepper: FC<Props> = ({
  activeStep,
  isAuthenticated,
  isViewingSponsors = false,
}) => {
  const steps = getSteps(isAuthenticated, isViewingSponsors);

  return (
    <Card variant="outlined">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StyledStepLabel
              classes={{
                label: 'stepLabel',
              }}
            >
              {label}
            </StyledStepLabel>
          </Step>
        ))}
      </Stepper>
    </Card>
  );
};

export default RegisterStepper;
