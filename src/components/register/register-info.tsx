// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import {
  HandleCompleteStepType,
  IRegisterForm,
} from '../../pages/members/register';
import FormHr from '../shared/form-hr';
import RegisterForm from './register-form';
import RegisterSponsorForm from './register-sponsor-form';

// Local Typings
interface Props {
  isViewingSponsors?: boolean;
  onCompleteStep: HandleCompleteStepType;
  onSetForm: (form: IRegisterForm) => void;
  registerForm: IRegisterForm;
}

// Component Definition
const RegisterInfo: FC<Props> = ({
  isViewingSponsors = false,
  onCompleteStep,
  onSetForm,
  registerForm,
}) => (
  <section>
    <h2>
      2. Register for TMAC
      {isViewingSponsors && ' Sponsorship'}
    </h2>

    <FormHr />

    {isViewingSponsors ? (
      <RegisterSponsorForm onCompleteStep={onCompleteStep} />
    ) : (
      <RegisterForm
        onCompleteStep={onCompleteStep}
        onSetForm={onSetForm}
        registerForm={registerForm}
      />
    )}
  </section>
);

export default RegisterInfo;
