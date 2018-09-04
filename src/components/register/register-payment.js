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
} from '../../firebase/db'

// Component Definition
class RegisterPayment extends Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
    onCompleteStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCompletedPayment: false,
      hasCompletedRegisterPaymentStep: false,
      invoiceId: '',
      paymentDetails: {},
      receiptId: '',
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
    this.activeComponent = false;
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
        onCompleteStep,
      } = this.props;

      const {
        hasCompletedPayment,
        hasCompletedRegisterPaymentStep,
      } = this.state;

      console.log('hasCompletedPayment', hasCompletedPayment);

      if (hasCompletedRegisterPaymentStep) {
        setTimeout(() => onCompleteStep(2), 4000);
      }
    }
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
  }

  handleGetCurrentReceiptId = (receiptId) => {
    if (this.activeComponent) {
      this.setState({
        receiptId,
      });
    }
  }

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

    return (
      <section>
        <h2>3. Pay TMAC Dues</h2>
        <FormHr />
        {hasCompletedPayment
          ? (
            <Fragment>
              <h3 css={{ marginBottom: 24 }}>Successful Payment!</h3>
              <ReactToPrint
                content={() => this.printInvoice}
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
                  ref={(el) => { this.printInvoice = el; } }
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
                  trigger={() => <button type="button">Print Invoice</button>}
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
