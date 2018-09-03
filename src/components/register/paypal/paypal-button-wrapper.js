// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Local Dependencies
import PaypalButton from './paypal-button';

// Local Variables
const CLIENT = {
  // Currently using the sandbox id from this paypal demo
  // https://github.com/paypal/paypal-checkout-demo/blob/master/src/react.htm
  sandbox: process.env.GATSBY_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.GATSBY_PAYPAL_CLIENT_ID_PRODUCTION,
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

// Component Definition
class PaypalButtonWrapper extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    onSuccessfulPayment: PropTypes.func.isRequired,
  };

  handleSuccess = (payment) => {
    const {
      onSuccessfulPayment,
    } = this.props;

    console.log('Successful payment!', payment);

    onSuccessfulPayment(payment)
  };

  handleError = (error) => {
    console.log('Erroneous payment OR failed to load script!', error);
  };

  handleCancel = (data) => {
    console.log('Cancelled payment!', data);
  };

  render() {
    const {
      amount,
    } = this.props;


    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit
          currency="USD"
          total={amount}
          onSuccess={this.handleSuccess}
          onError={this.handleError}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default PaypalButtonWrapper;
