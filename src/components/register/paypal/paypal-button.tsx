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
import { logError } from '../../../utils/logError';
import {
  PaypalPayment,
  PaypalPaymentCancel,
} from './paypal-button-wrapper';

// Local Typings
interface Props {
  client: {
    sandbox: string | undefined;
    production: string | undefined;
  };
  env: 'production' | 'sandbox';
  onCancel: (data: PaypalPaymentCancel) => void;
  onError: (error: unknown) => void;
  onSuccess: (data: PaypalPayment) => void;
  total: number;
}

interface Transaction {
  amount: {
    total: number;
    currency: string;
  }
}

interface CreatePaymentPayload {
  transactions: Transaction[];
}

interface PaypalGlobalObject {
  Button: {
    driver: (
      type: string,
      packages: any,
    ) => void;
  }
  rest: {
    payment: {
      create: (
        env: string,
        client: string,
        payload: CreatePaymentPayload,
      ) => void;
    }
  }
}

// Local Variables
const CURRENCY = 'USD';

// Component Definition
const PaypalButton: FC<Props> = ({
  client,
  env,
  onCancel,
  onError,
  onSuccess,
  total,
}) => {
  const paypalRef = useRef<PaypalGlobalObject | null>(null);

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

  if (!showButton) {
    return null;
  }

  const payment = () =>
    paypalRef.current?.rest.payment.create(env, client, {
      transactions: [
        {
          amount: {
            total,
            currency: CURRENCY,
          },
        },
      ],
    });

  const onAuthorize = (data: unknown, actions: unknown) =>
    actions?.payment?.execute()
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
      })
      .catch((error) => {
        logError('PaypalButton : onAuthorize error', error);
      });

  // From the paypal docs here
  // https://github.com/paypal/paypal-checkout/blob/master/docs/frameworks.md#reactjs-element
  const PayPalButton = paypalRef.current?.Button.driver('react', { React, ReactDOM });

  return (
    <PayPalButton
      client={client}
      commit
      env={env}
      onAuthorize={onAuthorize}
      onCancel={onCancel}
      onError={onError}
      payment={payment}
      style={{ label: 'pay', tagline: 'false', size: 'medium' }}
    />
  );
};

export default PaypalButton;
