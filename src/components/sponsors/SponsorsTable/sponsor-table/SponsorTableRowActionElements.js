// External Dependencies
import {
  IconButton,
  Tooltip,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import ReceiptIcon from '@mui/icons-material/Receipt';
import styled from 'styled-components';

// Internal Dependencies
import Invoice from '../../../register/invoice';

// Local Variables
const propTypes = {
  user: PropTypes.shape({
    PaymentOption: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

const StyledRoot = styled.div({
  '.icon': {
    height: 24,
    width: 24,
  },
  '.invoiceWrapper': {
    display: 'none',
  },
});

// Component Definition
const MemberTableRowActionElements = ({ user }) => {
  const componentRef = useRef();

  const hasReceipt = user && user.PaymentOption && user.PaymentOption.toLowerCase() === 'paypal';
  const hasInvoice = user && user.PaymentOption && user.PaymentOption.toLowerCase() === 'invoiced';

  const handlePrintReceipt = useCallback(() => (
    <Tooltip title="Print receipt">
      <IconButton aria-label="Print receipt">
        <ReceiptIcon className="icon" />
      </IconButton>
    </Tooltip>
  ), []);

  const handlePrintInvoice = useCallback(() => (
    <Tooltip title="Print invoice">
      <IconButton aria-label="Print invoice">
        <PrintIcon className="icon" />
      </IconButton>
    </Tooltip>
  ), []);

  if (hasReceipt) {
    return (
      <StyledRoot key={`print-receipt-${user.userId}`}>
        <ReactToPrint
          content={() => componentRef.current}
          trigger={handlePrintReceipt}
        />

        <div className="invoiceWrapper">
          <Invoice
            amount={user.AmountDonated}
            form={user}
            isInvoice={false}
            receiptId={user.receiptId}
            ref={componentRef}
            sponsorLevel={user.SponsorLevel}
          />
        </div>
      </StyledRoot>
    );
  }

  if (hasInvoice) {
    return (
      <StyledRoot key={`print-invoice-${user.userId}`}>
        <ReactToPrint
          content={() => componentRef.current}
          trigger={handlePrintInvoice}
        />

        <div className="invoiceWrapper">
          <Invoice
            amount={user.AmountDonated}
            form={user}
            invoiceId={user.invoiceId || 1}
            isInvoice
            ref={componentRef}
            sponsorLevel={user.SponsorLevel}
          />
        </div>
      </StyledRoot>
    );
  }
  return null;
};

MemberTableRowActionElements.propTypes = propTypes;
MemberTableRowActionElements.defaultProps = defaultProps;

export default MemberTableRowActionElements;
