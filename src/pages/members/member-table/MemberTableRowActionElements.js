// External Dependencies
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

// Internal Dependencies
import Invoice from '../../../components/register/invoice';

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
    height: 28,
    width: 28,
  },
  '.invoiceWrapper': {
    display: 'none',
  },
});

// Component Definition
const MemberTableRowActionElements = ({ user }) => {
  const componentRef = useRef();

  console.log('MemberTableRowActionElements');

  const hasReceipt = user?.PaymentOption?.toLowerCase() === 'paypal'
    || user?.PaypalPaymentID;
  const hasInvoice = user?.PaymentOption?.toLowerCase() === 'invoiced'
    && !user?.PaypalPaymentID;

  const handlePrintReceipt = useCallback(() => (
    <Tooltip
      arrow
      title="Print Receipt"
    >
      <IconButton aria-label="Print receipt">
        <ReceiptIcon className="icon" />
      </IconButton>
    </Tooltip>
  ), []);

  const handlePrintInvoice = useCallback(() => (
    <Tooltip
      arrow
      title="Print Invoice"
    >
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
            amount={user.AmountPaid}
            form={user}
            isActive={user.MemberType === 'Active'}
            isInvoice={false}
            receiptId={user.receiptId}
            ref={componentRef}
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
            amount={user.AmountPaid}
            form={user}
            invoiceId={user.invoiceId || 1}
            isActive={user.MemberType === 'Active'}
            isInvoice
            ref={componentRef}
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
