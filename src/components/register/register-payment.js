// External Dependencies
// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';

// Local Variables
import PaypalButtonWrapper from './paypal/paypal-button-wrapper';

// Component Definition
class RegisterPayment extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <section>
        <h2>3. Pay TMAC Dues</h2>
        <FormHr />
        Click button for magic to happen!

        <PaypalButtonWrapper />

      </section>
    );
  }
}

export default RegisterPayment;
