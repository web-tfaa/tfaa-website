// External Dependencies
import Box from '@mui/material/Box';
import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { TfaaMemberData } from '../../utils/hooks/useGetAllMembers';
import { isTodayAfterJuly31st } from '../../utils/helpers';
import { useGetAuthUser } from '../../utils/hooks/useGetAuthUser';
import Container from '../shared/container';
import RegisterEmail from './RegisterEmail';
import RegisterMemberFormWrapper from './register-member-form-wrapper';
import RegisterMemberPayment from './register-member-payment';
import RegisterStepper from './RegisterStepper';

// Local Typings
export interface MemberFormValues extends TfaaMemberData {
  honeypot?: string;
}
type Steps = 0 | 1 | 2;
export type HandleCompleteMemberStepType = (
  step: Steps,
  updatedMemberForm: MemberFormValues,
) => void;


// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

const COMPLETED_MEMBER_STEPS_INITIAL_STATE: Steps[] = [];

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
export const INITIAL_MEMBER_FORM_VALUES: MemberFormValues = {
  Address1: '',
  Address2: '',
  AmountPaid: 0,
  CellPhone: '',
  City: '',
  District: '',
  Email: '',
  FirstName: '',
  IsRegisteredForFallConference: false,
  LastName: '',
  MemberType: 'Active',
  NewToTMAC: 'No',
  OfficePhone: '',
  PaymentOption: 'Invoiced',
  PaypalPayerID: '',
  PaypalPaymentID: '',
  State: '',
  Title: '',
  ZipCode: '',
  invoiceDate: '',
  invoiceId: 0,
  receiptDate: '',
  receiptId: 0,
  userId: '',
};

const initialMemberReducerState = {
  activeMemberStep: 0,
  completedMemberSteps: COMPLETED_MEMBER_STEPS_INITIAL_STATE,
  memberForm: INITIAL_MEMBER_FORM_VALUES,
};

// Local Reducers
// actions
const MEMBER_FORM_ACTIONS = {
  COMPLETE_MEMBER_STEP: 'COMPLETE_MEMBER_STEP',
  UPDATE_ACTIVE_MEMBER_STEP: 'UPDATE_ACTIVE_MEMBER_STEP',
  UPDATE_MEMBER_FORM: 'UPDATE_MEMBER_FORM',
};

function memberFormReducer(state, { type, payload }) {
  switch (type) {
    case MEMBER_FORM_ACTIONS.COMPLETE_MEMBER_STEP: {
      const {
        completedStep,
        updatedMemberForm,
      } = payload;

      return {
        ...state,
        activeMemberStep: state.activeMemberStep + 1,
        completedMemberSteps: [
          ...state.completedMemberSteps,
          completedStep,
        ],
        memberForm: {
          ...state.memberForm,
          ...updatedMemberForm,
        }
      };
    }
    case MEMBER_FORM_ACTIONS.UPDATE_ACTIVE_MEMBER_STEP: {
      const { newMemberStep } = payload;

      return {
        ...state,
        activeMemberStep: newMemberStep,
        completedMemberSteps: [
          ...state.completedMemberSteps,
          // We add the previous step to the completed
          //  list when switching to a new step
          newMemberStep - 1,
        ],
      };
    }
    case MEMBER_FORM_ACTIONS.UPDATE_MEMBER_FORM: {
      const { updatedMemberForm } = payload;

      return {
        ...state,
        memberForm: {
          ...state.memberForm,
          ...updatedMemberForm,
        },
      };
    }
    default: {
      throw new Error(
        `Unexpected memberFormReducer reducer action: ${type}`
      );
    }
  }
}

// Component Definition
const MemberRegisterContent: React.FC = () => {
  const { currentAuthUser } = useGetAuthUser();

  const isAuthenticated = Boolean(currentAuthUser);

  // Local Reducers
  const [
    memberFormState,
    dispatch,
  ] = useReducer(
    memberFormReducer,
    initialMemberReducerState,
  );

  const {
    activeMemberStep,
    memberForm,
    completedMemberSteps,
  } = memberFormState;

  // Local Handlers
  const handleUpdateActiveMemberStep = (newMemberStep: number) => {
    dispatch({
      type: MEMBER_FORM_ACTIONS.UPDATE_ACTIVE_MEMBER_STEP,
      payload: { newMemberStep },
    });
  };

  const handleCompleteMemberStep = (
    step: number,
    updatedMemberForm?: MemberFormValues,
  ) => {
    dispatch({
      type: MEMBER_FORM_ACTIONS.COMPLETE_MEMBER_STEP,
      payload: {
        completedStep: step,
        updatedMemberForm,
      },
    });
  };

  const handleUpdateMemberForm = (updatedMemberForm: MemberFormValues) => {
    dispatch({
      type: MEMBER_FORM_ACTIONS.UPDATE_MEMBER_FORM,
      payload: {
        updatedMemberForm,
      },
    });
  };

  useEffect(() => {
    // The user can skip the "sign in" step if they are already signed in
    if (activeMemberStep === 0 && isAuthenticated) {
      handleUpdateActiveMemberStep(1);
    }
  }, [activeMemberStep, isAuthenticated]);

  const hasCompletedAllMemberSteps = completedMemberSteps.length >= 3;

  // We normally shut down registration and sponsorship after TMEA each year and open it up on 8/1.
  // This might change, so we need to talk to the Executive Secretary for the most up-to-date info.
  const showMembershipCompleteNote = isTodayAfterJuly31st;

  const userId = `${currentAuthUser?.email}-${currentAuthUser?.uid}`;

  /* Children change depending on which step is active */
  return (
    <StyledRoot>
      {isAuthenticated && (
        <RegisterStepper
          isAuthenticated={isAuthenticated}
          activeStep={activeMemberStep}
        />
      )}

      <Container>
        {activeMemberStep === 0 && (
          <RegisterEmail
            isAuthenticated={isAuthenticated}
            onCompleteStep={handleCompleteMemberStep}
          />
        )}
        {activeMemberStep === 1 && (
          <RegisterMemberFormWrapper
            authenticatedUserId={userId}
            initialMemberFormValues={INITIAL_MEMBER_FORM_VALUES}
            onCompleteMemberStep={handleCompleteMemberStep}
          />
        )}
        {[2, 3].includes(activeMemberStep) && (
          <RegisterMemberPayment
            authenticatedUserId={userId}
            onCompleteMemberStep={handleCompleteMemberStep}
            onUpdateMemberForm={handleUpdateMemberForm}
            memberForm={memberForm}
          />
        )}

        {!hasCompletedAllMemberSteps && showMembershipCompleteNote && (
          <Box marginTop={2}>
            * Membership is not complete until payment is received.
          </Box>
        )}
      </Container>
    </StyledRoot>
  );
};

export default MemberRegisterContent;
