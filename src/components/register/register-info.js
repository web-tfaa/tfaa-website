// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import RegisterForm from './register-form';

// Component Definition
const RegisterInfo = (props) => {
  const {
    onCompleteStep,
  } = props;

  return (
    <section>
      <h2>2. Register for TMAC</h2>
      <FormHr />
      <RegisterForm onCompleteStep={onCompleteStep} />
    </section>
  );
};

RegisterInfo.propTypes = {
  onCompleteStep: PropTypes.func.isRequired,
};

export default RegisterInfo;
