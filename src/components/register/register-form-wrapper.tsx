// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import {
  HandleCompleteStepType,
  IRegisterForm,
} from '../../pages/members/register';
import {
  HandleCompleteSponsorStepType,
  SponsorFormValues,
} from '../../pages/sponsors/register';
import FormHr from '../shared/form-hr';
import RegisterForm from './register-form';
import RegisterSponsorForm from './register-sponsor-form';

// Local Typings
interface Props {
  initialFormValues?: IRegisterForm;
  initialSponsorFormValues?: SponsorFormValues;
  isViewingSponsors?: boolean;
  onCompleteStep: HandleCompleteStepType | HandleCompleteSponsorStepType;
  onSetForm?: (form: IRegisterForm) => void;
  onSetSponsorForm?: (form: SponsorFormValues) => void;
  registerForm?: IRegisterForm;
  sponsorForm?: SponsorFormValues;
}

// Component Definition
const RegisterFormWrapper: FC<Props> = ({
  initialFormValues,
  initialSponsorFormValues,
  isViewingSponsors = false,
  onCompleteStep,
  onSetForm,
  onSetSponsorForm,
  registerForm,
  sponsorForm,
}) => (
  <section>
    <h2>
      2. Register for TMAC
      {isViewingSponsors && ' Sponsorship'}
    </h2>

    <FormHr />

    {isViewingSponsors && initialSponsorFormValues
      && onSetSponsorForm && sponsorForm && (
      <RegisterSponsorForm
        initialSponsorFormValues={initialSponsorFormValues}
        onCompleteStep={onCompleteStep}
        onSetSponsorForm={onSetSponsorForm}
        sponsorForm={sponsorForm}
      />
    )}

    {!isViewingSponsors && initialFormValues
      && registerForm && onSetForm && (
      <RegisterForm
        initialFormValues={initialFormValues}
        onCompleteStep={onCompleteStep}
        onSetForm={onSetForm}
        registerForm={registerForm}
      />
    )}
  </section>
);

export default RegisterFormWrapper;
