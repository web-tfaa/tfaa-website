/*
  Inspiration taken from this blog post
  https://www.robinwieruch.de/react-paypal-payment/
  Only changs were to use `componentDidUpdate` instead of `componentWillRecieveProps`
*/

// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

// Component Definition
class PaypalButton extends React.Component {
  static propTypes = {
    client: PropTypes.shape({}).isRequired,
    commit: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
    env: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    if (typeof window !== 'undefined') {
      window.React = React;
      window.ReactDOM = ReactDOM;

      this.paypal = window.paypal;
    }
  }

  componentDidMount() {
    if (this.paypal) {
      this.setState({ showButton: true });
    }
  }

  /* eslint-disable react/no-did-update-set-state */
  componentDidUpdate(prevProps, prevState) {
    if (this.paypal && !prevState.showButton) {
      this.setState({ showButton: true });
    }
  }

  render() {
    const {
      client,
      commit,
      currency,
      env,
      onCancel,
      onError,
      onSuccess,
      total,
    } = this.props;

    const {
      showButton,
    } = this.state;

    const payment = () =>
      this.paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            cancelled: false,
            paid: true,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          onSuccess(payment);
        });

    // From the paypal docs here
    // https://github.com/paypal/paypal-checkout/blob/master/docs/frameworks.md#reactjs-element
    const PayPalButton = this.paypal.Button.driver('react', { React, ReactDOM });

    return (
      <div>
        {showButton && (
          <PayPalButton
            client={client}
            commit={commit}
            env={env}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
            payment={payment}
            style={{ label: 'pay', tagline: 'false', size: 'medium' }}
          />)
        }
      </div>
    );
  }
}

export default PaypalButton;
