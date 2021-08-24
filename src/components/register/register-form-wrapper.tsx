// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  RegisterMemberForm,
} from '../../pages/members/register';
import FormHr from '../shared/form-hr';
import RegisterForm from './register-form';

// Local Typings
interface Props {
  initialFormValues: RegisterMemberForm;
  onCompleteStep: HandleCompleteMemberStepType ;
  onSetForm: (form: RegisterMemberForm) => void;
  registerForm: RegisterMemberForm;
}

// Component Definition
const RegisterFormWrapper: FC<Props> = ({
  initialFormValues,
  onCompleteStep,
  onSetForm,
  registerForm,
}) => (
  <section>
    <h2>
      2. Register for TMAC
    </h2>

    <FormHr />

    <RegisterForm
      initialFormValues={initialFormValues}
      onCompleteStep={onCompleteStep}
      onSetForm={onSetForm}
      registerForm={registerForm}
    />
  </section>
);

export default RegisterFormWrapper;
