// External Dependencies
import IconButton from '@material-ui/core/IconButton';
import Print from '@material-ui/icons/Print';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Receipt from '@material-ui/icons/Receipt';
import Tooltip from '@material-ui/core/Tooltip';

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

  const actionElements = [];
  let receiptElement;
  let invoiceElement;

  if (user) {
    receiptElement = (
      <div key={`print-receipt-${user.userId}`}>
        <ReactToPrint
          content={() => componentRef.current}
          trigger={() => (
            <Tooltip title="Print Receipt">
              <IconButton aria-label="Print receipt">
                <Receipt />
              </IconButton>
            </Tooltip>
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
      </div>
    );

    invoiceElement = (
      <div key={`print-invoice-${user.userId}`}>
        <ReactToPrint
          content={() => componentRef.current}
          trigger={() => (
            <Tooltip title="Print Invoice">
              <IconButton aria-label="Print invoice">
                <Print />
              </IconButton>
            </Tooltip>
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
      </div>
    );
  }

  if (user && user.PaymentOption && user.PaymentOption.toLowerCase() === 'paypal') {
    actionElements.push(receiptElement);
  } else if (user && user.PaymentOption && user.PaymentOption.toLowerCase() === 'invoiced') {
    actionElements.push(invoiceElement);
  }

  return actionElements;
};

MemberListTable.propTypes = propTypes;
MemberListTable.defaultProps = defaultProps;

export default MemberListTable;
