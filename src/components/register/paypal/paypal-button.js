/*
  Inspiration taken from this blog post
  https://www.robinwieruch.de/react-paypal-payment/
  Only changs were to use `componentDidUpdate` instead of `componentWillRecieveProps`
*/

// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

// Component Definition
class PaypalButton extends React.Component {
  static propTypes = {
    client: PropTypes.shape({}).isRequired,
    commit: PropTypes.bool.isRequired,
    currency: PropTypes.number.isRequired,
    env: PropTypes.string.isRequired,
    isScriptLoaded: PropTypes.bool.isRequired,
    isScriptLoadSucceed: PropTypes.bool.isRequired,
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

    window.React = React;
    window.ReactDOM = ReactDOM;

    this.paypal = window.paypal;
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  /* eslint-disable react/no-did-update-set-state */
  componentDidUpdate(prevProps) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = this.props;

    const {
      showButton,
    } = this.state;

    const isLoadedButWasntLoadedBefore =
      !showButton &&
      !prevProps.isScriptLoaded &&
      isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
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
            paid: true,
            cancelled: false,
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
            env={env}
            client={client}
            commit={commit}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />)
        }
      </div>
    );
  }
}

export default scriptLoader(
  'https://www.paypalobjects.com/api/checkout.js'
)(PaypalButton);
