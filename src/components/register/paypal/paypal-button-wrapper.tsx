/* eslint-disable react/no-unescaped-entities */
// External Dependencies
import {
  Box,
  Collapse,
} from '@mui/material';
import React, { FC, ReactElement, useState } from 'react';
import styled from 'styled-components';

// Local Dependencies
import { appNameShort } from '../../../utils/app-constants';
import { logError } from '../../../utils/logError';
import PaypalButton from './paypal-button';
import EnhancedAlert from '../../shared/EnhancedAlert';

// Local Typings
export interface PaypalPayment {
  cancelled: boolean;
  paid: boolean;
  payerID: string;
  paymentID: string;
  paymentToken: string;
  returnUrl: string;
}

export interface PaypalPaymentCancel {
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
  noMargin?: boolean;
  onSuccessfulPayment: (payment: PaypalPayment) => void;
}

// Local Variables
const StyledSpan = styled.span({
  fontWeight: 500,
  whiteSpace: 'nowrap',
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
  noMargin,
  onSuccessfulPayment,
}) => {
  const [
    paymentError,
    setPaymentError,
  ] = useState<ReactElement | null>(null);

  if (!amount) {
    return null;
  }

  const errorText = (
    <>
      There was an issue using PayPal. Please try clicking the{' '}
      <StyledSpan>"Pay with PayPal"</StyledSpan>{' '}
      button again.
      <br />
      You can also print an invoice and
      send payment to the {appNameShort} Executive Secretary.
    </>
  );

  const handleSuccess = (payment: PaypalPayment) => {
    onSuccessfulPayment(payment);
  };

  // Not sure about the shape of the Paypal error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (err: unknown) => {
    setPaymentError(errorText);
    logError('Erroneous payment OR failed to load script', err as Error);
  };

  const handleCancel = (data: PaypalPaymentCancel) => {
    console.log('Canceled payment', data);
    setPaymentError(errorText);
  };

  return (
    <Box
      alignItems={noMargin ? 'flex-end' : 'inherit'}
      display="flex"
      flexDirection="column"
    >
      <Collapse in={Boolean(amount)}>
        <Box mt={noMargin ? 0 : 2}>
          <PaypalButton
            client={CLIENT}
            env={ENV}
            onCancel={handleCancel}
            onError={handleError}
            onSuccess={handleSuccess}
            total={amount}
          />
        </Box>
      </Collapse>

      <Collapse in={Boolean(paymentError)}>
        <Box mt={2}>
          <EnhancedAlert severity="error">
            {paymentError}
          </EnhancedAlert>
        </Box>
      </Collapse>
    </Box>
  );
};

export default PaypalButtonWrapper;
