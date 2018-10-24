// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import RegisterForm from './register-form';
import RegisterSponsorForm from './register-sponsor-form';

// Component Definition
const RegisterInfo = (props) => {
  const {
    isViewingSponsors,
    onCompleteStep,
  } = props;

  return (
    <section>
      <h2>
        2. Register for TMAC
        {isViewingSponsors && ' Sponsorship'}
      </h2>
      <FormHr />
      {isViewingSponsors
        ? <RegisterSponsorForm onCompleteStep={onCompleteStep} />
        : <RegisterForm onCompleteStep={onCompleteStep} />}
    </section>
  );
};

RegisterInfo.propTypes = {
  isViewingSponsors: PropTypes.bool.isRequired,
  onCompleteStep: PropTypes.func.isRequired,
};

export default RegisterInfo;
