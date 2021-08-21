// External Dependencies
import { Helmet } from 'react-helmet';
import React, { FC, useEffect, useState } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import RegisterEmail from '../../components/register/register-email';
import RegisterFormWrapper from '../../components/register/register-form-wrapper';
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
  AmountDonated: 1000 | 2000 | null;
  City: string;
  CityError: string;
  ContactAddress1: string;
  ContactAddress1Error: string;
  ContactAddress2: string;
  ContactPhone: string;
  ContactPhoneError: string;
  Email: string;
  EmailError: string;
  honeypot: string;
  invoiceDate: string;
  invoiceId: number;
  isAuthenticated?: boolean;
  OrganizationContactName: string;
  OrganizationContactNameError: string;
  OrganizationWebsiteAddress: string;
  OrganizationWebsiteAddressError: string;
  PaymentOption: 'Invoiced' | 'Paypal';
  PaypalPayerID: string;
  PaypalPaymentID: string;
  receiptDate: string;
  receiptId: number;
  SponsorLevel: string;
  SponsorOrganization: string;
  SponsorOrganizationError: string;
  State: string;
  StateError: string;
  Title: string;
  TitleError: string;
  ZipCode: string;
  ZipCodeError: string;
}
type Steps = 0 | 1 | 2;
export type HandleCompleteSponsorStepType = (step: Steps) => void;

// Local Variables
const COMPLETED_SPONSOR_STEPS_INITIAL_STATE: Steps[] = [];

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const INITIAL_SPONSOR_FORM_VALUES: SponsorFormValues = {
  AmountDonated: 1000,
  City: '',
  CityError: '',
  ContactAddress1: '',
  ContactAddress1Error: '',
  ContactAddress2: '',
  ContactPhone: '',
  ContactPhoneError: '',
  Email: '',
  EmailError: '',
  honeypot: '',
  invoiceDate: '',
  invoiceId: 0,
  // isAuthenticated: false,
  OrganizationContactName: '',
  OrganizationContactNameError: '',
  OrganizationWebsiteAddress: '',
  OrganizationWebsiteAddressError: '',
  PaymentOption: 'Invoiced',
  PaypalPayerID: '',
  PaypalPaymentID: '',
  receiptDate: '',
  receiptId: 0,
  SponsorLevel: 'Silver Medal',
  SponsorOrganization: '',
  SponsorOrganizationError: '',
  State: '',
  StateError: '',
  Title: '',
  TitleError: '',
  ZipCode: '',
  ZipCodeError: '',
};

// Component Definition
const RegisterSponsorContent: FC<Props> = ({
  authUser,
  isAuthenticated,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [sponsorForm, setSponsorForm] = useState<
    SponsorFormValues
  >(INITIAL_SPONSOR_FORM_VALUES);
  const [
    completedSponsorSteps,
    setCompletedSponsorSteps,
  ] = useState(COMPLETED_SPONSOR_STEPS_INITIAL_STATE);

  useEffect(() => {
    // The user can skip the "sign in" step if they are already signed in
    if (activeStep === 0 && isAuthenticated) {
      setActiveStep(1);
    }
  }, [activeStep, isAuthenticated]);

  const handleCompleteSponsorStep: HandleCompleteSponsorStepType = (step) => {
    setActiveStep(activeStep + 1);
    setCompletedSponsorSteps([
      ...completedSponsorSteps,
      step,
    ]);
  };

  const getCurrentStepContent = (isAuthenticated) => {
    const stepOneContent = (
      <RegisterEmail
        isAuthenticated={isAuthenticated}
        onCompleteStep={handleCompleteSponsorStep}
      />
    );

    const stepTwoContent = (
      <RegisterFormWrapper
        initialSponsorFormValues={INITIAL_SPONSOR_FORM_VALUES}
        isViewingSponsors
        onCompleteStep={handleCompleteSponsorStep}
        onSetSponsorForm={setSponsorForm}
        sponsorForm={sponsorForm}
      />
    );

    const stepThreeContent = (
      <RegisterSponsorPayment
        authenticatedUserId={authUser?.uid}
        form={sponsorForm}
        isViewingSponsors
        onCompleteStep={handleCompleteSponsorStep}
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

  const hasCompletedAllSteps = completedSponsorSteps.length >= 3;

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

        {getCurrentStepContent(isAuthenticated)}

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
