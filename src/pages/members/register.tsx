/*
  Main container for the Membership process
*/

// External Dependencies
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import React, {
  FC, useEffect, useReducer
} from 'react';
import styled from 'styled-components';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import RegisterEmail from '../../components/register/register-email';
import RegisterMemberFormWrapper from '../../components/register/register-member-form-wrapper';
import RegisterMemberPayment from '../../components/register/register-member-payment';
import RegisterStepper from '../../components/register/register-stepper';
import { GatsbyContextProps } from '../../types/shared';

// Sidebar Data
import membersSidebar from './members-links.yml';
import MobileDivider from '../../components/shared/MobileDivider';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';

// Local Typings
interface Props {
  authUserId?: string;
  isAuthenticated: boolean;
}
export interface MemberFormValues {
  Address1: string;
  Address2?: string;
  AmountPaid: 0 | 30 | 50;
  CellPhone: string;
  City: string;
  District: string;
  Email: string;
  FirstName: string;
  LastName: string;
  MemberType: 'Active' | 'Retired';
  NewToTMAC: boolean;
  OfficePhone: string;
  PaymentOption?: 'Invoiced' | 'Paypal';
  PaypalPayerID?: string;
  PaypalPaymentID?: string;
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
export type HandleCompleteMemberStepType = (
  step: Steps,
  updatedMemberForm: MemberFormValues,
) => void;

// Local Variables
const StyledRoot = styled.div({
  paddingLeft: 0,
  width: '0 auto',
});

const COMPLETED_MEMBER_STEPS_INITIAL_STATE: Steps[] = [];

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const INITIAL_MEMBER_FORM_VALUES: MemberFormValues = {
  Address1: '',
  Address2: '',
  AmountPaid: 0,
  CellPhone: '',
  City: '',
  District: '',
  Email: '',
  FirstName: '',
  LastName: '',
  MemberType: 'Active',
  NewToTMAC: false,
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
const RegisterMemberContent: FC<Props> = ({
  authUserId,
  isAuthenticated,
}) => {
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

  const handleUpdateActiveMemberStep = (newMemberStep: number) => {
    dispatch({
      type: MEMBER_FORM_ACTIONS.UPDATE_ACTIVE_MEMBER_STEP,
      payload: { newMemberStep },
    });
  };

  const handleCompleteMemberStep = (
    step: number,
    updatedMemberForm: MemberFormValues,
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

  /* Children change depending on which step is active */
  return (
    <StyledRoot>
      <Container>
        <Helmet>
          <title>TMAC | Membership</title>
        </Helmet>

        <RegisterStepper
          isAuthenticated={isAuthenticated}
          activeStep={activeMemberStep}
        />

        {activeMemberStep === 0 && (
          <RegisterEmail
            isAuthenticated={isAuthenticated}
            onCompleteStep={handleCompleteMemberStep}
          />
        )}
        {activeMemberStep === 1 && (
          <RegisterMemberFormWrapper
            authenticatedUserId={authUserId}
            initialMemberFormValues={INITIAL_MEMBER_FORM_VALUES}
            onCompleteMemberStep={handleCompleteMemberStep}
          />
        )}
        {[2, 3].includes(activeMemberStep) && (
          <RegisterMemberPayment
            authenticatedUserId={authUserId}
            onCompleteMemberStep={handleCompleteMemberStep}
            onUpdateMemberForm={handleUpdateMemberForm}
            memberForm={memberForm}
          />
        )}

        {!hasCompletedAllMemberSteps && (
          <Box marginTop={2}>
            * Membership is not complete until payment is received.
          </Box>
        )}
      </Container>

      <MobileDivider>
        <SidebarBody
          inline
          yaml={membersSidebar}
        />
      </MobileDivider>
    </StyledRoot>
  );
};

const RegisterMemberWithContext: FC = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => {
      const isAuthenticated = Boolean(authUser);
      const authUserEmail = authUser ? authUser.email : undefined;

      return (
        <RegisterMemberContent
          {...props}
          authUserId={authUserEmail}
          isAuthenticated={isAuthenticated}
        />
      );
    }}
  </AuthUserContext.Consumer>
);

const RegisterMember: FC<{
  location: Location,
}> = ({ location, ...otherProps }: GatsbyContextProps) => (
  <Layout location={location}>
    <RegisterMemberWithContext {...otherProps} />
  </Layout>
);

export default RegisterMember;
