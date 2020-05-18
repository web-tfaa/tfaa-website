// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import RegisterForm from './register-form';
import RegisterSponsorForm from './register-sponsor-form';

// Component Definition
const RegisterInfo = ({ isViewingSponsors, onCompleteStep }) => (
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

RegisterInfo.propTypes = {
  isViewingSponsors: PropTypes.bool,
  onCompleteStep: PropTypes.func.isRequired,
};
RegisterInfo.defaultProps = {
  isViewingSponsors: false,
};

export default RegisterInfo;
