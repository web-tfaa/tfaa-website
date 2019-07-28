// External Dependencies
import IconButton from '@material-ui/core/IconButton';
import Print from '@material-ui/icons/Print';
import PropTypes from 'prop-types';
import React, { Fragment, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Receipt from '@material-ui/icons/Receipt';

// Internal Dependencies
import Invoice from '../../../components/register/invoice';

// Local Variables
const propTypes = {
  user: PropTypes.shape({}),
};

const defaultProps = {
  user: null,
};

// Component Definition
const MemberListTable = (props) => {
  const {
    user,
  } = props;
  const componentRef = useRef();

  const hasReceipt = user && user.PaymentOption && user.PaymentOption.toLowerCase() === 'paypal';
  const hasInvoice = user && user.PaymentOption && user.PaymentOption.toLowerCase() === 'invoiced';

  if (hasReceipt) {
    return (
      <Fragment key={`print-receipt-${user.userId}`}>
        <ReactToPrint
          content={() => componentRef.current}
          trigger={() => (
            <IconButton aria-label="Print receipt">
              <Receipt />
            </IconButton>
          )}
        />
        <div css={{ display: 'none' }}>
          <Invoice
            amount={user.AmountPaid}
            form={user}
            isActive={user.MemberType === 'Active'}
            isInvoice={false}
            receiptId={user.receiptId}
            ref={componentRef}
          />
        </div>
      </Fragment>
    );
  }
  if (hasInvoice) {
    return (
      <Fragment key={`print-invoice-${user.userId}`}>
        <ReactToPrint
          content={() => componentRef.current}
          trigger={() => (
            <IconButton aria-label="Print invoice">
              <Print />
            </IconButton>
          )}
        />
        <div css={{ display: 'none' }}>
          <Invoice
            amount={user.AmountPaid}
            form={user}
            invoiceId={user.invoiceId || 1}
            isActive={user.MemberType === 'Active'}
            isInvoice
            ref={componentRef}
          />
        </div>
      </Fragment>
    );
  }
  return null;
};

MemberListTable.propTypes = propTypes;
MemberListTable.defaultProps = defaultProps;

export default MemberListTable;
