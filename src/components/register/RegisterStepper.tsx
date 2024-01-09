// External Dependencies
import React from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { isTodayAfterJuly31st } from '../../utils/helpers';
import DrumBanner from '../shared/DrumBanner';
import EnhancedCard from '../shared/EnhancedCard';

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
      ? `${appNameShort} Website Login`
      : `${appNameShort} Sponsor Level`,
    isViewingSponsors
      ? 'Sponsor Info'
      : 'Member Info',
    isViewingSponsors
      ? 'Confirm Sponsor Level & Send Payment'
      : 'Make Payment or Get Invoice',
  ];
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.memberStepper': {
    '.MuiStepConnector-root': {
      left: 'calc(-50% + 64px)',
      top: 42,
      right: 'calc(50% + 64px)',
    },
    '.MuiStepConnector-lineHorizontal': {
      borderColor: theme.palette.tfaa.resources,
      borderWidth: 2,
    },
    '.MuiStepLabel-iconContainer': {
      '.MuiSvgIcon-root': {
        '&.Mui-active': {
          color: theme.palette.tfaa.signIn,
        },
        '&.Mui-completed': {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.tfaa.resources,
        },
        border: `2px solid ${theme.palette.common.white}`,
        borderRadius: 50,
        color: theme.palette.tfaa.membership,
        fontWeight: 500,
        height: 84,
        width: 84,
      },
    },
    '.stepLabel': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
      },
      color: theme.palette.common.white,
      display: 'flex',
      fontSize: '0.9rem',
      justifyContent: 'center',
    },
  },
  '.memberStepperTitle': {
    color: theme.palette.common.white,
    fontSize: 34,
    fontWeight: 700,
    marginBottom: theme.spacing(3),
  },
  '.stepperCard': {
    backgroundColor: theme.palette.tfaa.membership,
    borderColor: theme.palette.tfaa.resources,
    borderWidth: 2,
  },

  backgroundColor: theme.palette.tfaa.membership,
  padding: theme.spacing(6, 8, 4),
  width: '100%',
}));

// Component Definition
const RegisterStepper: React.FC<Props> = ({
  activeStep,
  isAuthenticated,
  isViewingSponsors = false,
}) => {
  const steps = getSteps(isAuthenticated, isViewingSponsors);

  // We normally shut down registration and sponsorship after TMEA each year and open it up on 8/1
  if (isTodayAfterJuly31st) {
    return <DrumBanner drumBannerTitle="Registration Closed" />;
  }

  return (
    <StyledRoot>
      <Typography
        className="memberStepperTitle"
        component="h2"
      >
        Membership sign up
      </Typography>

      <EnhancedCard className="stepperCard">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className="memberStepper"
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
      </EnhancedCard>
    </StyledRoot>
  );
};

export default RegisterStepper;
