/*
Inspiration taken from this blog post
https://www.robinwieruch.de/react-paypal-payment/
*/

// External Dependencies
import React, {
  FC, useEffect, useRef, useState
} from 'react';
// import ReactDOM from 'react-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';

// Local Dependencies
import usePrevious from '../../../utils/hooks/usePrevious';
import { logError } from '../../../utils/logError';

// Local Typings
interface Props {
  // client: string;
  // commit: boolean;
  currency: string;
  // env: string;
  onCancel: (data: unknown) => void;
  onError: (error: unknown) => void;
  onSuccess: (data: unknown) => void;
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

// Component Definition
const PaypalButton: FC<Props> = ({
  // client,
  // commit,
  currency,
  // env,
  onCancel,
  onError,
  onSuccess,
  total,
}) => {
  const paypalRef = useRef<PaypalGlobalObject>(null);
  console.log('paypalRef', paypalRef.current);

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

  const onCreateOrder = (
    data: unknown,
    actions: unknown,
  ) =>
    actions.order.create({
      purchase_units: [{
        amount: {
          value: total,
        },
      }],
    });

  const onAuthorize = (data: unknown, actions: unknown) =>
    actions?.payment?.execute()
      .then(() => {
        const payment = {
          cancelled: false,
          paid: true,
          payerID: data?.payerID,
          paymentID: data?.paymentID,
          paymentToken: data?.paymentToken,
          returnUrl: data?.returnUrl,
        };

        onSuccess(payment);
      })
      .catch((error) => {
        logError('PaypalButton : onAuthorize error', error);
      });

  // From the paypal docs here
  // https://github.com/paypal/paypal-checkout/blob/master/docs/frameworks.md#reactjs-element
  // const PayPalButton = paypalRef.current?.Button.driver('react', { React, ReactDOM });

  return showButton ? (
    <PayPalButtons
      // client={client}
      // commit={commit}
      // env={env}
      createOrder={onCreateOrder}
      onCancel={onCancel}
      onError={onError}
      // payment={payment}
      style={{
        color: 'gold',
        label: 'pay',
        shape: 'pill',
        tagline: false,
        // size: 'medium',
      }}
    />
    // <PayPalButton
    //   client={client}
    //   commit={commit}
    //   env={env}
    //   onAuthorize={onAuthorize}
    //   onCancel={onCancel}
    //   onError={onError}
    //   payment={payment}
    //   style={{ label: 'pay', tagline: 'false', size: 'medium' }}
    // />
  ) : null;
};

export default PaypalButton;
