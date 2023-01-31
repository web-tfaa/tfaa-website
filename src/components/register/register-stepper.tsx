// External Dependencies
import {
  Card,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

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
      ? `Sign in to the ${appNameShort} members area`
      : `Sign up for ${appNameShort} website login`,
    isViewingSponsors
      ? 'Complete sponsor form'
      : 'Complete membership form',
    isViewingSponsors
      ? 'Confirm Sponsor level and send payment'
      : `Pay ${appNameShort} dues`,
  ];
}

// Local Variables
const StyledCard = styled(Card)(({ theme }) => ({
  '.stepLabel': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
    fontSize: '0.9rem',
  },

  padding: theme.spacing(1, 0),
}));

// Component Definition
const RegisterStepper: FC<Props> = ({
  activeStep,
  isAuthenticated,
  isViewingSponsors = false,
}) => {
  const steps = getSteps(isAuthenticated, isViewingSponsors);

  return (
    <StyledCard variant="outlined">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{
                label: 'stepLabel',
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </StyledCard>
  );
};

export default RegisterStepper;
