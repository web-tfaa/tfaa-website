// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import RegisterForm from './register-form';
import RegisterSponsorForm from './register-sponsor-form';

// Local Typings
interface Props {
  isViewingSponsors?: boolean;
  onCompleteStep: (step: number, form: unknown) => void;
}

// Component Definition
const RegisterInfo: FC<Props> = ({
  isViewingSponsors = false,
  onCompleteStep,
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
      <RegisterForm onCompleteStep={onCompleteStep} />
    )}
  </section>
);

export default RegisterInfo;
