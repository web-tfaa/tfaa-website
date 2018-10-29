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

const errorText = 'There was an issue using PayPal. Please try clicking the "Pay with PayPal" button again or print an invoice to send to the TMAC Treasurer.';

// Component Definition
class PaypalButtonWrapper extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    onSuccessfulPayment: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      paymentError: '',
    };
  }

  handleSuccess = (payment) => {
    const {
      onSuccessfulPayment,
    } = this.props;

    console.log('Successful payment!', payment);

    onSuccessfulPayment(payment);
  };

  handleError = (error) => {
    console.log('Erroneous payment OR failed to load script!', error);
    this.setState({ paymentError: errorText });
  };

  handleCancel = (data) => {
    console.log('Cancelled payment!', data);
    this.setState({ paymentError: errorText });
  };

  render() {
    const {
      amount,
    } = this.props;

    const {
      paymentError,
    } = this.state;

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
        {paymentError && (
          <div
            css={{
              background: '#fafafa',
              border: '1px solid red',
              borderRadius: 5,
              maxWidth: '75%',
              padding: 8,
              color: 'red',
            }}
          >
            {paymentError}
          </div>
        )}
      </div>
    );
  }
}

export default PaypalButtonWrapper;
