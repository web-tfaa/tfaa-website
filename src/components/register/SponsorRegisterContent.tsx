// External Dependencies
import Box from '@mui/material/Box';
import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { useGetAuthUser } from '../../utils/hooks/useGetAuthUser';
import Container from '../shared/container';
import RegisterEmail from './RegisterEmail';
import RegisterSponsorFormWrapper from '../../components/register/register-sponsor-form-wrapper';
import RegisterSponsorPayment from '../../components/register/register-sponsor-payment';
import RegisterStepper from './RegisterStepper';

// Local Typings
export interface SponsorFormValues {
  AmountDonated: 0 | 1000 | 2000;
  City: string;
  ContactAddress1: string;
  ContactAddress2: string;
  ContactPhone: string;
  Email: string;
  OrganizationContactName: string;
  OrganizationWebsiteAddress: string;
  PaymentOption?: 'Invoiced' | 'Paypal';
  PaypalPayerID?: string;
  PaypalPaymentID?: string;
  SponsorLevel: string;
  SponsorOrganization: string;
  State: string;
  Title: string;
  ZipCode: string;
  honeypot?: string;
  invoiceDate: string;
  invoiceId: number;
  receiptDate: string;
  receiptId: number;
  userId?: string;
}
type Steps = 0 | 1 | 2;
export type HandleCompleteSponsorStepType = (
  step: Steps,
  updatedForm: SponsorFormValues,
) => void;

// Local Variables
const StyledRoot = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});


const COMPLETED_SPONSOR_STEPS_INITIAL_STATE: Steps[] = [];

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const INITIAL_SPONSOR_FORM_VALUES: SponsorFormValues = {
  AmountDonated: 1000,
  City: '',
  ContactAddress1: '',
  ContactAddress2: '',
  ContactPhone: '',
  Email: '',
  OrganizationContactName: '',
  OrganizationWebsiteAddress: '',
  PaymentOption: 'Invoiced',
  PaypalPayerID: '',
  PaypalPaymentID: '',
  SponsorLevel: 'Silver Medal',
  SponsorOrganization: '',
  State: '',
  Title: '',
  ZipCode: '',
  invoiceDate: '',
  invoiceId: 0,
  receiptDate: '',
  receiptId: 0,
  userId: '',
};

const initialSponsorReducerState = {
  activeStep: 2,
  completedSponsorSteps: COMPLETED_SPONSOR_STEPS_INITIAL_STATE,
  sponsorForm: INITIAL_SPONSOR_FORM_VALUES,
};

// Local Reducers
// actions
const SPONSOR_FORM_ACTIONS = {
  COMPLETE_STEP: 'COMPLETE_STEP',
  UPDATE_ACTIVE_SPONSOR_STEP: 'UPDATE_ACTIVE_SPONSOR_STEP',
  UPDATE_SPONSOR_FORM: 'UPDATE_SPONSOR_FORM',
};

// function used to initialize state
function createSponsorFormReducerState({
  activeStep = 0,
  completedSponsorSteps = COMPLETED_SPONSOR_STEPS_INITIAL_STATE,
  sponsorForm = INITIAL_SPONSOR_FORM_VALUES,
} = {}) {
  return {
    activeStep,
    completedSponsorSteps,
    sponsorForm,
  };
}

function sponsorFormReducer(state, { type, payload }) {
  switch (type) {
    case SPONSOR_FORM_ACTIONS.COMPLETE_STEP: {
      const {
        completedStep,
        updatedForm,
      } = payload;

      return {
        ...state,
        activeStep: state.activeStep + 1,
        completedSponsorSteps: [
          ...state.completedSponsorSteps,
          completedStep,
        ],
        sponsorForm: {
          ...state.sponsorForm,
          ...updatedForm,
        }
      };
    }
    case SPONSOR_FORM_ACTIONS.UPDATE_ACTIVE_SPONSOR_STEP: {
      const { newStep } = payload;
      return {
        ...state,
        activeStep: newStep,
        completedSponsorSteps: [
          ...state.completedSponsorSteps,
          // We add the previous step to the completed
          //  list when switching to a new step
          newStep - 1,
        ],
      };
    }
    case SPONSOR_FORM_ACTIONS.UPDATE_SPONSOR_FORM: {
      const { updatedForm } = payload;

      return {
        ...state,
        sponsorForm: {
          ...state.sponsorForm,
          ...updatedForm,
        },
      };
    }
    default: {
      throw new Error(
        `Unexpected sponsorFormReducer reducer action: ${type}`
      );
    }
  }
}

// Component Definition
const SponsorRegisterContent: React.FC = () => {
  const { currentAuthUser } = useGetAuthUser();

  const isAuthenticated = Boolean(currentAuthUser);

  const [
    sponsorFormState,
    dispatch,
  ] = useReducer(
    sponsorFormReducer,
    initialSponsorReducerState,
    createSponsorFormReducerState,
  );

  const {
    activeStep,
    sponsorForm,
    completedSponsorSteps,
  } = sponsorFormState;

  const handleUpdateActiveStep = (newStep: number) => {
    dispatch({
      type: SPONSOR_FORM_ACTIONS.UPDATE_ACTIVE_SPONSOR_STEP,
      payload: { newStep },
    });
  };

  const handleCompleteSponsorStep = (
    step: number,
    updatedForm: SponsorFormValues,
  ) => {
    dispatch({
      type: SPONSOR_FORM_ACTIONS.COMPLETE_STEP,
      payload: {
        completedStep: step,
        updatedForm,
      },
    });
  };

  const handleUpdateSponsorForm = (updatedForm: SponsorFormValues) => {
    dispatch({
      type: SPONSOR_FORM_ACTIONS.UPDATE_SPONSOR_FORM,
      payload: {
        updatedForm,
      },
    });
  };

  useEffect(() => {
    // The user can skip the "sign in" step if they are already signed in
    if (activeStep === 0 && isAuthenticated) {
      handleUpdateActiveStep(1);
    }
  }, [activeStep, isAuthenticated]);

  const hasCompletedAllSponsorSteps = completedSponsorSteps?.length >= 3;

  /* Children change depending on which step is active */
  return (
    <StyledRoot>
      <RegisterStepper
        isAuthenticated={isAuthenticated}
        isViewingSponsors
        activeStep={activeStep}
      />

      <Container>
        {activeStep === 0 && (
          <RegisterEmail
            isAuthenticated={isAuthenticated}
            onCompleteStep={handleCompleteSponsorStep}
          />
        )}
        {activeStep === 1 && (
          <RegisterSponsorFormWrapper
            authenticatedUserId={currentAuthUser?.uid}
            initialSponsorFormValues={INITIAL_SPONSOR_FORM_VALUES}
            onCompleteSponsorStep={handleCompleteSponsorStep}
            onUpdateSponsorForm={handleUpdateSponsorForm}
            sponsorForm={sponsorForm}
          />
        )}
        {[2, 3].includes(activeStep) && (
          <RegisterSponsorPayment
            authenticatedUserId={currentAuthUser?.uid}
            onUpdateSponsorForm={handleUpdateSponsorForm}
            sponsorForm={sponsorForm}
          />
        )}

        {!hasCompletedAllSponsorSteps && (
          <Box marginTop={2}>
            * Sponsorship is not complete until payment is received.
          </Box>
        )}
      </Container>
    </StyledRoot>
  );
};

export default SponsorRegisterContent;
