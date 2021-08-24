// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import {
  HandleCompleteSponsorStepType,
  SponsorFormValues,
} from '../../pages/sponsors/register';
import FormHr from '../shared/form-hr';
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
const RegisterSponsorFormWrapper: FC<Props> = ({
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
        2. Register for TMAC Sponsorship
      </h2>

      <FormHr />

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
