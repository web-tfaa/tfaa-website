// External Dependencies
import { Helmet } from 'react-helmet';
import React, {
  FC, useEffect, useReducer
} from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import RegisterEmail from '../../components/register/register-email';
import RegisterSponsorFormWrapper from '../../components/register/register-sponsor-form-wrapper';
import RegisterSponsorPayment from '../../components/register/register-sponsor-payment';
import RegisterStepper from '../../components/register/register-stepper';
import Status from '../members/status';
import presets from '../../utils/presets';

// Local Typings
interface Props {
  authUser: {
    uid: string;
  } | null;
  isAuthenticated: boolean;
}
export interface SponsorFormValues {
  AmountDonated: 0 | 1000 | 2000;
  City: string;
  ContactAddress1: string;
  ContactAddress2: string;
  ContactPhone: string;
  Email: string;
  honeypot?: string;
  invoiceDate: string;
  invoiceId: number;
  isAuthenticated?: boolean;
  OrganizationContactName: string;
  OrganizationWebsiteAddress: string;
  PaymentOption?: 'Invoiced' | 'Paypal';
  PaypalPayerID?: string;
  PaypalPaymentID?: string;
  receiptDate: string;
  receiptId: number;
  SponsorLevel: string;
  SponsorOrganization: string;
  State: string;
  Title: string;
  ZipCode: string;
  userId?: string;
}
type Steps = 0 | 1 | 2;
export type HandleCompleteSponsorStepType = (
  step: Steps,
  updatedForm: SponsorFormValues,
) => void;

// Local Variables
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
  invoiceDate: '',
  invoiceId: 0,
  // isAuthenticated: false,
  OrganizationContactName: '',
  OrganizationWebsiteAddress: '',
  PaymentOption: 'Invoiced',
  PaypalPayerID: '',
  PaypalPaymentID: '',
  receiptDate: '',
  receiptId: 0,
  SponsorLevel: 'Silver Medal',
  SponsorOrganization: '',
  State: '',
  Title: '',
  ZipCode: '',
  userId: '',
};

const initialSponsorReducerState = {
  activeStep: 0,
  completedSponsorSteps: COMPLETED_SPONSOR_STEPS_INITIAL_STATE,
  sponsorForm: INITIAL_SPONSOR_FORM_VALUES,
};

// Local Reducers
// actions
const SPONSOR_FORM_ACTIONS = {
  COMPLETE_STEP: 'COMPLETE_STEP',
  UPDATE_ACTIVE_SPONSOR_STEP: 'UPDATE_ACTIVE_SPONSOR_STEP',
  UPDATE_COMPLETED_SPONSOR_STEPS: 'UPDATE_COMPLETED_SPONSOR_STEPS',
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
      // console.log('COMPLETE_STEP : payload', payload);

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
      // console.log('UPDATE_ACTIVE_SPONSOR_STEP : payload', payload);

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
    case SPONSOR_FORM_ACTIONS.UPDATE_COMPLETED_SPONSOR_STEPS: {
      // console.log('UPDATE_COMPLETED_SPONSOR_STEPS : payload', payload);

      return payload;
    }
    case SPONSOR_FORM_ACTIONS.UPDATE_SPONSOR_FORM: {
      // console.log('UPDATE_SPONSOR_FORM : payload', payload);

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
const RegisterSponsorContent: FC<Props> = ({
  authUser,
  isAuthenticated,
}) => {
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

  const hasCompletedAllSteps = completedSponsorSteps?.length >= 3;

  /* Children change depending on which step is active */
  return (
    <div
      css={{
        paddingLeft: 0,
        width: '0 auto',
        [presets.Tablet]: {
          paddingLeft: !isAuthenticated ? '1.5rem' : 0,
        },
      }}
    >
      <Status />

      <Container>
        <Helmet>
          <title>TMAC | Register Sponsor</title>
        </Helmet>

        <RegisterStepper
          isAuthenticated={isAuthenticated}
          isViewingSponsors
          activeStep={activeStep}
        />

        {activeStep === 0 && (
          <RegisterEmail
            isAuthenticated={isAuthenticated}
            onCompleteStep={handleCompleteSponsorStep}
          />
        )}
        {activeStep === 1 && (
          <RegisterSponsorFormWrapper
            authenticatedUserId={authUser?.uid}
            initialSponsorFormValues={INITIAL_SPONSOR_FORM_VALUES}
            onCompleteSponsorStep={handleCompleteSponsorStep}
            onUpdateSponsorForm={handleUpdateSponsorForm}
            sponsorForm={sponsorForm}
          />
        )}
        {[2, 3].includes(activeStep) && (
          <RegisterSponsorPayment
            authenticatedUserId={authUser?.uid}
            onCompleteSponsorStep={handleCompleteSponsorStep}
            onUpdateSponsorForm={handleUpdateSponsorForm}
            sponsorForm={sponsorForm}
          />
        )}

        {!hasCompletedAllSteps && (
          <div style={{ marginTop: '1.5rem' }}>
            * Sponsor Registration is not complete until payment is received.
          </div>
        )}
      </Container>
    </div>
  );
};

const RegisterSponsorWithContext: FC = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <RegisterSponsorContent
        {...props}
        authUser={authUser}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

const RegisterSponsor: FC<{
  location: unknown,
}> = (props) => (
  // eslint-disable-next-line react/destructuring-assignment
  <Layout location={props.location}>
    <RegisterSponsorWithContext {...props} />
  </Layout>
);

export default RegisterSponsor;
