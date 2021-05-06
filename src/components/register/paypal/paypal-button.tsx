/*
Inspiration taken from this blog post
https://www.robinwieruch.de/react-paypal-payment/
*/

// External Dependencies
import React, {
  FC, useEffect, useRef, useState
} from 'react';
import ReactDOM from 'react-dom';

// Local Dependencies
import usePrevious from '../../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  client: any;
  commit: boolean;
  currency: string;
  env: string;
  onCancel: (data: any) => void;
  onError: (data: any) => void;
  onSuccess: (data: any) => void;
  total: number;
}

// Component Definition
const PaypalButton: FC<Props> = ({
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

export default PaypalButton;
