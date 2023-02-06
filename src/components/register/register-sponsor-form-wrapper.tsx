// External Dependencies
import React from 'react';

// Internal Dependencies
import {
  HandleCompleteSponsorStepType,
  SponsorFormValues,
} from './SponsorRegisterContent';
import FormDivider from '../shared/FormDivider';
import RegisterSponsorForm from './register-sponsor-form';

// Local Typings
interface Props {
  authenticatedUserId?: string;
  initialSponsorFormValues: SponsorFormValues;
  onCompleteSponsorStep: HandleCompleteSponsorStepType;
  onUpdateSponsorForm: (form: SponsorFormValues) => void;
  sponsorForm: SponsorFormValues;
}

// Component Definition
const RegisterSponsorFormWrapper: React.FC<Props> = ({
  authenticatedUserId,
  initialSponsorFormValues,
  onCompleteSponsorStep,
  onUpdateSponsorForm,
  sponsorForm,
}) => {
  if (!authenticatedUserId) {
    return null;
  }

  return (
    <section>
      <h2>
        2. Join TMAC as a Sponsor
      </h2>

      <FormDivider />

      <RegisterSponsorForm
        authenticatedUserId={authenticatedUserId}
        initialSponsorFormValues={initialSponsorFormValues}
        onCompleteSponsorStep={onCompleteSponsorStep}
        onUpdateSponsorForm={onUpdateSponsorForm}
        sponsorForm={sponsorForm}
      />
    </section>
  );
};

export default RegisterSponsorFormWrapper;
