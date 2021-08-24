/*
  Main container for the Registration process
*/

// External Dependencies
import { Helmet } from 'react-helmet';
// import { navigate } from 'gatsby';
import React, { FC, useEffect, useState } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import RegisterEmail from '../../components/register/register-email';
import RegisterFormWrapper from '../../components/register/register-form-wrapper';
import RegisterPayment from '../../components/register/register-payment';
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
export interface RegisterMemberForm {
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
export type HandleCompleteMemberStepType = (step: Steps) => void;

// Local Variables
const COMPLETED_STEPS_INITIAL_STATE: Steps[] = [];

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const INITIAL_MEMBER_FORM_VALUES: RegisterMemberForm = {
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

// Component Definition
const RegisterMemberContent: FC<Props> = ({
  authUser,
  isAuthenticated,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(INITIAL_MEMBER_FORM_VALUES);
  const [completedSteps, setCompletedSteps] = useState(COMPLETED_STEPS_INITIAL_STATE);

  useEffect(() => {
    if (activeStep === 0 && isAuthenticated) {
      setActiveStep(1);
    }
  }, []);

  const handleCompleteStep: HandleCompleteMemberStepType = (step) => {
    setActiveStep(activeStep + 1);
    setCompletedSteps([...completedSteps, step]);
  };

  const getCurrentStepContent = () => {
    const stepOneContent = (
      <RegisterEmail
        isAuthenticated={isAuthenticated}
        onCompleteStep={handleCompleteStep}
      />
    );

    const stepTwoContent = (
      <RegisterFormWrapper
        initialFormValues={INITIAL_MEMBER_FORM_VALUES}
        registerForm={form}
        onCompleteStep={handleCompleteStep}
        onSetForm={setForm}
      />
    );

    const stepThreeContent = (
      <RegisterPayment
        authenticatedUserId={authUser?.uid}
        form={form}
        onCompleteStep={handleCompleteStep}
      />
    );

    let currentStepContent;
    switch (activeStep) {
      case 0:
        currentStepContent = stepOneContent;
        break;
      case 1:
        currentStepContent = stepTwoContent;
        break;
      case 2: case 3:
        currentStepContent = stepThreeContent;
        break;
      default:
        currentStepContent = stepOneContent;
        break;
    }
    return currentStepContent;
  };

  const hasCompletedAllSteps = completedSteps.length >= 3;

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
          <title>TMAC | Register</title>
        </Helmet>

        <RegisterStepper
          isAuthenticated={isAuthenticated}
          activeStep={activeStep}
        />

        {getCurrentStepContent()}

        {!hasCompletedAllSteps && (
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
