// External Dependencies
import React from 'react';

// Internal Dependencies
import {
  HandleCompleteSponsorStepType,
  SponsorFormValues,
} from './SponsorRegisterContent';
import FormDivider from '../shared/FormDivider';
import FormTitle from '../shared/FormTitle';
import RegisterSponsorForm from './register-sponsor-form';
import { appNameShort } from '../../utils/app-constants';

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
      <FormTitle>
        2. Join {appNameShort} as a Sponsor
      </FormTitle>

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
