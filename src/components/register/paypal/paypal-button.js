/*
Inspiration taken from this blog post
https://www.robinwieruch.de/react-paypal-payment/
Only changes were to use `componentDidUpdate` instead of `componentWillRecieveProps`
*/

// External Dependencies
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// Local Dependencies
import usePrevious from '../../../utils/hooks/usePrevious';

// Local Variables
const propTypes = {
  client: PropTypes.shape({}).isRequired,
  commit: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  env: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

// Component Definition
const PaypalButton = ({
  client,
  commit,
  currency,
  env,
  onCancel,
  onError,
  onSuccess,
  total,
}) => {
  const paypalRef = useRef(null);

  console.log('paypalRef', paypalRef);

  const [showButton, setShowButton] = useState(false);
  const previousShowButton = usePrevious(showButton);

  // Check for window to make sure the site is built and deployed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      paypalRef.current = window.paypal;
    }
  }, []);

  // If the paypal ref exists and showButton was false, we show the button
  useEffect(() => {
    if (paypalRef.current && !previousShowButton) {
      setShowButton(true);
    }
  }, [paypalRef.current, previousShowButton]);

  const payment = () =>
    paypalRef.current?.rest.payment.create(env, client, {
      transactions: [
        {
          amount: {
            total,
            currency,
          },
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
  const PayPalButton = paypalRef.current?.Button.driver('react', { React, ReactDOM });

  return showButton ? (
    <PayPalButton
      client={client}
      commit={commit}
      env={env}
      onAuthorize={onAuthorize}
      onCancel={onCancel}
      onError={onError}
      payment={payment}
      style={{ label: 'pay', tagline: 'false', size: 'medium' }}
    />
  ) : null;
};

PaypalButton.propTypes = propTypes;

export default PaypalButton;
