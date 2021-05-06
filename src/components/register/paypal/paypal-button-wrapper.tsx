/* eslint-disable react/no-unescaped-entities */
// External Dependencies
import {
  Box,
  Collapse,
} from '@material-ui/core';
import React, { FC, ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Local Dependencies
import PaypalButton from './paypal-button';
import EnhancedAlert from '../../shared/EnhancedAlert';

// Local Typings
interface PaypalPayment {
  cancelled: boolean;
  paid: boolean;
  payerID: string;
  paymentID: string;
  paymentToken: string;
  returnUrl: string;
}

interface PaypalPaymentCancel {
  billingID: string;
  // eslint-disable-next-line camelcase
  button_version: string;
  cancelUrl: string;
  intent: string;
  paymentID: string;
  paymentToken: string;
}

interface Props {
  amount: number;
  onSuccessfulPayment: (payment: PaypalPayment) => void;
}

// Local Variables
const useStyles = makeStyles({
  errorSpan: {
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
});

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
const PaypalButtonWrapper: FC<Props> = ({
  amount,
  onSuccessfulPayment,
}) => {
  const classes = useStyles();

  const [paymentError, setPaymentError] = useState<ReactElement | null>(null);

  const errorText = (
    <>
      There was an issue using PayPal. Please try clicking the{' '}
      <span className={classes.errorSpan}>"Pay with PayPal"</span>{' '}
      button again or print an invoice and send payment to the TMAC Treasurer.
    </>
  );

  const handleSuccess = (payment: PaypalPayment) => {
    console.log('Successful payment!', payment);

    onSuccessfulPayment(payment);
  };

  // Not sure about the shape of the Paypal error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    console.log('Erroneous payment OR failed to load script!', error);
    setPaymentError(errorText);
  };

  const handleCancel = (data: PaypalPaymentCancel) => {
    console.log('Canceled payment!', data);
    setPaymentError(errorText);
  };

  return (
    <>
      <Box mt={2}>
        <PaypalButton
          client={CLIENT}
          commit
          currency="USD"
          env={ENV}
          onCancel={handleCancel}
          onError={handleError}
          onSuccess={handleSuccess}
          total={amount}
        />
      </Box>

      <Collapse in={Boolean(paymentError)}>
        <Box mt={2}>
          <EnhancedAlert severity="error">
            {paymentError}
          </EnhancedAlert>
        </Box>
      </Collapse>
    </>
  );
};

export default PaypalButtonWrapper;
