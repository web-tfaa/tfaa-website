// External Dependencies
import React, { Component } from 'react';

// Local Dependencies
import PaypalButton from './paypal-button';

// Local Variables
const CLIENT = {
  sandbox: process.env.GATSBY_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.GATSBY_PAYPAL_CLIENT_ID_PRODUCTION,
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

// Component Definition
class PaypalButtonWrapper extends Component {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit
          currency="USD"
          total={100}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default PaypalButtonWrapper;
