// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

// Material-UI Dependencies
import Receipt from '@material-ui/icons/Receipt';
import Print from '@material-ui/icons/Print';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import Invoice from '../../../components/register/invoice';

// Component Definition
class MemberListTable extends Component {
  static propTypes = {
    // classes: PropTypes.shape({}).isRequired,
    user: PropTypes.shape({}).isRequired,
  };

  render() {
    const {
      // classes,
      user,
    } = this.props;

    const actionElements = [];

    const receiptElement = (
      <>
        <ReactToPrint
          content={() => this.printReceipt}
          key="print-receipt"
          trigger={() => (
            <Tooltip
              title="Print Receipt"
            >
              <IconButton>
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
            ref={(el) => { this.printReceipt = el; }}
          />
        </div>
      </>
    );

    const invoiceElement = (
      <>
        <ReactToPrint
          content={() => this.printInvoice}
          key="print-invoice"
          trigger={() => (
            <Tooltip
              title="Print Invoice"
            >
              <IconButton>
                <Print />
              </IconButton>
            </Tooltip>
          )}
        />
        <div css={{ display: 'none' }}>
          <Invoice
            amount={user.AmountPaid}
            form={user}
            invoiceId={user.invoiceId}
            isActive={user.MemberType === 'Active'}
            isInvoice
          />
        </div>
      </>
    );

    if (user && user.PaymentOption.toLowerCase() === 'paypal') {
      actionElements.push(receiptElement);
    } else if (user && user.PaymentOption.toLowerCase() === 'invoiced') {
      actionElements.push(invoiceElement);
    }

    return actionElements;
  }
}

export default MemberListTable;
