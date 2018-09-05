// External Dependencies
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ReactToPrint from 'react-to-print';

// Material-UI Dependencies
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import Invoice from './invoice';
import PaypalButtonWrapper from './paypal/paypal-button-wrapper';
import {
  doGetInvoiceId,
  doGetReceiptId,
  doUpdateEntry,
  doUpdateInvoiceId,
  doUpdateReceiptId,
} from '../../firebase/db'

// Component Definition
class RegisterPayment extends Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
    // onCompleteStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCompletedPayment: false,
      invoiceId: null,
      paymentDetails: {},
      receiptId: null,
      value: 'active',
    };

    this.activeComponent = true;
  }

  componentDidMount() {
    if (this.activeComponent) {
      doGetInvoiceId(this.handleGetCurrentInvoiceId);
      doGetReceiptId(this.handleGetCurrentReceiptId);
    }
  }

  componentWillUnmount() {
    const { hasCompletedPayment } = this.state;

    this.activeComponent = false;

    return hasCompletedPayment
      ? this.handleIncrementReceiptId()
      : this.handleIncrementInvoiceId();
  }

  getCurrentAmount = () => {
    const {
      value,
    } = this.state;

    switch (value) {
      case 'active':
        return 50;
      case 'retired':
        return 30;
      default:
        return 50;
    }
  }

  handleChangeRadioSelection = event => {
    if (this.activeComponent) {
      this.setState({ value: event.target.value });
    }
  };

  handleCompletePaymentStep = () => {
    if (this.activeComponent) {
      const {
        form,
      } = this.props;

      const {
        paymentDetails,
        value,
      } = this.state;

      const isActive = value === 'active';

      const documentId = `${form.First_Name}_${form.Last_Name}`;

      const updatedForm = {
        ...paymentDetails,
        level: isActive ? 'Active' : 'Retired',
        amount: isActive ? 50.00 : 30.00,
      }

      doUpdateEntry(updatedForm, documentId)
    }
  };

  handleIncrementInvoiceId = () => {
    // Called when unmounting the component if no purchase made
    return doUpdateInvoiceId();
  };

  handleIncrementReceiptId = () => {
    // Called when unmounting the component when user completed the purchase
    return doUpdateReceiptId();
  };

  handleUpdateCompletedStep = (payment) => {
    if (this.activeComponent) {
      this.setState({
        hasCompletedPayment: true,
        paymentDetails: {
          payerId: payment.payerID,
          paymentId: payment.paymentID,
        }
      }, () => this.handleCompletePaymentStep());
    }
  };

  handleGetCurrentInvoiceId = (invoiceId) => {
    if (this.activeComponent) {
      this.setState({
        invoiceId,
      });
    }
  };

  handleGetCurrentReceiptId = (receiptId) => {
    if (this.activeComponent) {
      this.setState({
        receiptId,
      });
    }
  };

  render() {
    const {
      form,
    } = this.props;

    const {
      hasCompletedPayment,
      invoiceId,
      paymentDetails,
      receiptId,
      value,
    } = this.state;

    const isActive = value === 'active';

    return (
      <section>
        <h2>3. Pay TMAC Dues</h2>
        <FormHr />
        {hasCompletedPayment
          ? (
            <Fragment>
              <h3 css={{ marginBottom: 24 }}>Successful Payment!</h3>
              <p>{isActive ? 'Active' : 'Retired'} Member - {isActive ? '$50.00' : '$30.00'}</p>
              <strong>Thank you for joining TMAC for this school year!</strong>
              <ReactToPrint
                content={() => this.printReceipt}
                trigger={() => <button type="button">Print Receipt</button>}
              />
              <div css={{ display: 'none' }}>
                <Invoice
                  amount={this.getCurrentAmount()}
                  form={form}
                  isActive={value === 'active'}
                  isInvoice={false}
                  paymentDetails={paymentDetails}
                  receiptId={receiptId}
                  ref={(el) => { this.printReceipt = el; } }
                />
              </div>
            </Fragment>
          )
        : (
          <Fragment>
            <div css={{ marginBottom: 48 }}>
              <h3 css={{ marginBottom: 24 }}>
                Pay now with Paypal
              </h3>

              <FormControl component="fieldset" style={{ marginLeft: 32 }}>
                <FormLabel
                  component="legend"
                  style={{ marginBottom: 12 }}
                >
                  Choose your membership level below
                </FormLabel>
                <RadioGroup
                  aria-label="TMAC membership levels"
                  name="membershipLevels"
                  onChange={this.handleChangeRadioSelection}
                  value={value}
                >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Active $50.00"
                    value="active"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Retired $30.00"
                    value="retired"
                  />
                  {/* <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Sponsor $0"
                    value="sponsor"
                  /> */}
                  <PaypalButtonWrapper
                    amount={this.getCurrentAmount()}
                    onSuccessfulPayment={this.handleUpdateCompletedStep}
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div>
              <h3>
                Need to pay later?
              </h3>

              <div css={{ marginLeft: 32, marginTop: 24 }}>
                <div css={{ marginBottom: 24 }}>
                  Follow these easy steps:
                  <ol>
                    <li>Click the button below to print an invoice.</li>
                    <li>Send the invoice and payment directly to the TMAC Treasurer.</li>
                  </ol>
                </div>
                <ReactToPrint
                  content={() => this.printInvoice}
                  trigger={() => (
                    <button
                      type="button"
                      onClick={() => this.handleIncrementInvoiceId()}
                    >
                      Print Invoice
                    </button>
                  )}
                />
                <div css={{ display: 'none' }}>
                  <Invoice
                    amount={this.getCurrentAmount()}
                    form={form}
                    invoiceId={invoiceId}
                    isActive={value === 'active'}
                    isInvoice
                    ref={(el) => { this.printInvoice = el; } }
                  />
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </section>
    );
  }
}

export default RegisterPayment;
