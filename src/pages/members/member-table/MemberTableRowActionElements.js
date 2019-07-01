// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

// Material-UI Dependencies
import IconButton from '@material-ui/core/IconButton';
import Print from '@material-ui/icons/Print';
import Receipt from '@material-ui/icons/Receipt';
import Tooltip from '@material-ui/core/Tooltip';

// Internal Dependencies
import Invoice from '../../../components/register/invoice';

// Component Definition
class MemberListTable extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
  };

  static defaultProps = {
    user: null,
  };

  render() {
    const {
      user,
    } = this.props;

    const actionElements = [];
    let receiptElement;
    let invoiceElement;

    if (user) {
      receiptElement = (
        <div key={`print-receipt-${user.userId}`}>
          <ReactToPrint
            content={() => this.printReceipt}
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
        </div>
      );

      invoiceElement = (
        <div key={`print-invoice-${user.userId}`}>
          <ReactToPrint
            content={() => this.printInvoice}
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
              invoiceId={user.invoiceId || 1}
              isActive={user.MemberType === 'Active'}
              isInvoice
              ref={(el) => { this.printInvoice = el; }}
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
  }
}

export default MemberListTable;
