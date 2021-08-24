/*
  Main container for the Member Registration process
*/

// External Dependencies
import { Helmet } from 'react-helmet';
// import { navigate } from 'gatsby';
import React, { FC, useEffect, useReducer } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import RegisterEmail from '../../components/register/register-email';
import RegisterMemberFormWrapper from '../../components/register/register-member-form-wrapper';
import RegisterMemberPayment from '../../components/register/register-member-payment';
import RegisterStepper from '../../components/register/register-stepper';
import Status from './status';
import presets from '../../utils/presets';

// Sidebar Data
import membersSidebar from './members-links.yml';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';

// Local Typings
interface Props {
  authUser: {
    uid: string;
  } | null;
  isAuthenticated: boolean;
}
export interface MemberFormValues {
  Address1: string;
  Address1Error: string;
  Address2?: string;
  AmountPaid: 0;
  CellPhone: string;
  CellPhoneError: string;
  City: string;
  CityError: string;
  District: string;
  DistrictError: string;
  Email: string;
  EmailError: string;
  FirstName: string;
  FirstNameError: string;
  LastName: string;
  LastNameError: string;
  MemberType: string;
  NewToTMAC: 'Yes' | 'No';
  OfficePhone: string;
  OfficePhoneError: string;
  PaymentOption: string;
  PaypalPayerID: string;
  PaypalPaymentID: string;
  State: string;
  StateError: string;
  Title: string;
  TitleError: string;
  ZipCode: string;
  ZipCodeError: string;
  hasCompletedRegisterInfoForm: boolean;
  honeypot: string;
  invoiceDate: string;
  invoiceId: number;
  isAuthenticated: boolean;
  receiptDate: string;
  receiptId: number;
}
type Steps = 0 | 1 | 2;
export type HandleCompleteMemberStepType = (
  step: Steps,
  updatedMemberForm: MemberFormValues,
) => void;

// Local Variables
const COMPLETED_MEMBER_STEPS_INITIAL_STATE: Steps[] = [];

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const INITIAL_MEMBER_FORM_VALUES: MemberFormValues = {
  Address1: '',
  Address1Error: '',
  // Address2 is not required, so cannot have an error
  Address2: '',
  AmountPaid: 0,
  CellPhone: '',
  CellPhoneError: '',
  City: '',
  CityError: '',
  District: '',
  DistrictError: '',
  Email: '',
  EmailError: '',
  FirstName: '',
  FirstNameError: '',
  LastName: '',
  LastNameError: '',
  MemberType: '',
  NewToTMAC: 'Yes',
  OfficePhone: '',
  OfficePhoneError: '',
  PaymentOption: 'Invoiced',
  PaypalPayerID: '',
  PaypalPaymentID: '',
  State: '',
  StateError: '',
  Title: '',
  TitleError: '',
  ZipCode: '',
  ZipCodeError: '',
  hasCompletedRegisterInfoForm: false,
  honeypot: '',
  invoiceDate: '',
  invoiceId: 0,
  isAuthenticated: false,
  receiptDate: '',
  receiptId: 0,
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

// function used to initialize state
function createMemberFormReducerState({
  activeMemberStep = 0,
  completedMemberSteps = COMPLETED_MEMBER_STEPS_INITIAL_STATE,
  memberForm = INITIAL_MEMBER_FORM_VALUES,
} = {}) {
  return {
    activeMemberStep,
    completedMemberSteps,
    memberForm,
  };
}

function memberFormReducer(state, { type, payload }) {
  switch (type) {
    case MEMBER_FORM_ACTIONS.COMPLETE_MEMBER_STEP: {
      console.log('COMPLETE_MEMBER_STEP : payload', payload);

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
      console.log('UPDATE_ACTIVE_MEMBER_STEP : payload', payload);

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
      console.log('UPDATE_MEMBER_FORM : payload', payload);

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
  authUser,
  isAuthenticated,
}) => {
  const [
    memberFormState,
    dispatch,
  ] = useReducer(
    memberFormReducer,
    initialMemberReducerState,
    createMemberFormReducerState,
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
  }, []);

  const hasCompletedAllMemberSteps = completedMemberSteps.length >= 3;

  /* Children change depending on which step is active */
  return (
    <div
      css={{
        paddingLeft: 0,
        width: '0 auto',
      }}
    >
      <Status />

      <Container>
        <Helmet>
          <title>TMAC | Member Register</title>
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
            authenticatedUserId={authUser?.uid}
            initialMemberFormValues={INITIAL_MEMBER_FORM_VALUES}
            memberForm={memberForm}
            onCompleteMemberStep={handleCompleteMemberStep}
            onUpdateMemberForm={handleUpdateMemberForm}
          />
        )}
        {[2, 3].includes(activeMemberStep) && (
          <RegisterMemberPayment
            authenticatedUserId={authUser?.uid}
            onCompleteSponsorStep={handleCompleteMemberStep}
            onUpdateSponsorForm={handleUpdateMemberForm}
            sponsorForm={memberForm}
          />
        )}

        {!hasCompletedAllMemberSteps && (
          <div style={{ marginTop: '1.5rem' }}>
            * Registration is not complete until payment is received.
          </div>
        )}
      </Container>

      <div
        css={{
          display: 'block',
          [presets.Tablet]: {
            display: 'none',
          },
        }}
      >
        <hr
          css={{
            border: 0,
            height: 2,
            marginTop: 10,
          }}
        />
        <SidebarBody inline yaml={membersSidebar} />
      </div>
    </div>
  );
};

const RegisterMemberWithContext: FC = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <RegisterMemberContent
        {...props}
        authUser={authUser}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

const RegisterMember: FC<{
  location: unknown,
}> = (props) => (
  // eslint-disable-next-line react/destructuring-assignment
  <Layout location={props.location}>
    <RegisterMemberWithContext {...props} />
  </Layout>
);

export default RegisterMember;
