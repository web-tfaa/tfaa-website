// External Dependencies
import format from 'date-fns/format';
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
import RegisterButton from './register-button';
import {
  doGetInvoiceId,
  doGetReceiptId,
  doUpdateEntry,
  doUpdateInvoiceId,
  doUpdateReceiptId,
} from '../../firebase/db';
import { currentSchoolYearLong } from '../../utils/helpers';

// Local Variables
const currentDate = format(new Date(), ['M/D/YYYY']);

// This will tell the database action where to put the new record
const collection = 'sponsor';

// Component Definition
class RegisterSponsorPayment extends Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
    onCompleteStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCompletedPayment: false,
      invoiceId: 0,
      paymentDetails: {},
      receiptId: 0,
      value: 'active',
    };

    this.activeComponent = true;
  }

  componentDidMount() {
    if (this.activeComponent) {
      doGetInvoiceId(this.handleGetCurrentInvoiceId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      form,
    } = this.props;

    const {
      invoiceId,
      receiptId,
      value,
    } = this.state;

    const isActive = value === 'active';

    const updatedForm = {
      invoiceDate: currentDate,
      invoiceId,
      MemberType: isActive ? 'Active' : 'Retired',
      receiptId,
    };

    if ((prevState.invoiceId === 0 && invoiceId > 0)
      || (prevState.receiptId === 0 && receiptId > 0)) {
      return doUpdateEntry(updatedForm, collection, form.userId);
    }
  }

  componentWillUnmount() {
    const { hasCompletedPayment } = this.state;

    this.activeComponent = false;

    return hasCompletedPayment
      ? this.handleIncrementReceiptId()
      : Promise.all([
        this.handleIncrementInvoiceId(),
        this.handleCompletePaymentStep(),
      ]);
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

  handleChangeRadioSelection = (event) => {
    const {
      form,
    } = this.props;

    const {
      invoiceId,
      receiptId,
    } = this.state;

    const isActive = event.target.value === 'active';

    const updatedForm = {
      invoiceDate: currentDate,
      invoiceId,
      MemberType: isActive ? 'Active' : 'Retired',
      receiptId,
    };

    if (this.activeComponent) {
      this.setState({ value: event.target.value });

      return doUpdateEntry(updatedForm, collection, form.userId);
    }
  };

  handleCompletePaymentStep = () => {
    if (this.activeComponent) {
      const {
        form,
        onCompleteStep,
      } = this.props;

      const {
        invoiceId,
        paymentDetails,
        receiptId,
        value,
      } = this.state;

      const isActive = value === 'active';

      const documentId = form.userId;

      const updatedForm = {
        PaypalPayerID: paymentDetails.payerId,
        PaypalPaymentID: paymentDetails.paymentId,
        PaymentOption: paymentDetails.paymentId ? 'Paypal' : 'Invoiced',
        AmountPaid: isActive ? '$50.00' : '$30.00',
        invoiceDate: currentDate,
        invoiceId,
        MemberType: isActive ? 'Active' : 'Retired',
        receiptId,
      };

      doUpdateEntry(updatedForm, collection, documentId);
      onCompleteStep(2, updatedForm);
    }
  };

  handleIncrementInvoiceId = () => {
    // Called when unmounting the component if no purchase made
    const {
      form,
    } = this.props;

    const {
      invoiceId,
      paymentDetails,
      receiptId,
      value,
    } = this.state;

    const isActive = value === 'active';

    const documentId = form.userId;

    const updatedForm = {
      ...paymentDetails,
      invoiceDate: currentDate,
      invoiceId,
      MemberType: isActive ? 'Active' : 'Retired',
      receiptId,
    };

    return Promise.all([
      doUpdateEntry(updatedForm, collection, documentId),
      doUpdateInvoiceId(),
    ]);
  };

  handleIncrementReceiptId = () => {
    // Called when unmounting the component when user completed the purchase
    return doUpdateReceiptId();
  };

  handleUpdateCompletedStep = (payment) => {
    if (this.activeComponent) {
      doGetReceiptId(this.handleGetCurrentReceiptId);

      this.setState({
        hasCompletedPayment: true,
        paymentDetails: {
          payerId: payment.payerID,
          paymentId: payment.paymentID,
          receiptDate: currentDate,
        },
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
        <h2>3. Choose Sponsorship level and Make payment</h2>
        <FormHr />
        {hasCompletedPayment
          ? (
            <Fragment>
              <h3 css={{ marginBottom: 24 }}>Successful Payment!</h3>
              <p>{isActive ? 'Active' : 'Retired'} Member - {isActive ? '$50.00' : '$30.00'}</p>
              <p>{form.FirstName} {form.LastName}, {form.District}</p>

              <h3 css={{ marginTop: 48 }}>
                Thank you for sponsoring TMAC for the {currentSchoolYearLong} school year!
              </h3>
              <FormHr />

              <p>Please click below to print a copy of your receipt.</p>

              <ReactToPrint
                content={() => this.printReceipt}
                trigger={() => <RegisterButton red>Print Receipt</RegisterButton>}
              />
              <div css={{ display: 'none' }}>
                <Invoice
                  amount={this.getCurrentAmount()}
                  form={form}
                  isActive={value === 'active'}
                  isInvoice={false}
                  paymentDetails={paymentDetails}
                  receiptId={receiptId}
                  ref={(el) => { this.printReceipt = el; }}
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
                      label="Class Champion $2,000+"
                      value="classChampion"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Gold Medal $1,500-1,999"
                      value="gold"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Silver Medal $1,000-1,499"
                      value="silver"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Bronze Medal $500-999"
                      value="bronze"
                    />
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
                      <li>
                        Send the invoice and payment directly to the TMAC{' '}
                        Treasurer as listed on the invoice.
                      </li>
                    </ol>
                  </div>
                  <ReactToPrint
                    content={() => this.printInvoice}
                    trigger={() => (
                      <RegisterButton red onClick={this.handleIncrementInvoiceId}>
                        Print Invoice
                      </RegisterButton>
                    )}
                  />
                  <div css={{ display: 'none' }}>
                    <Invoice
                      amount={this.getCurrentAmount()}
                      form={form}
                      invoiceId={invoiceId}
                      isActive={value === 'active'}
                      isInvoice
                      ref={(el) => { this.printInvoice = el; }}
                    />
                  </div>
                  <div css={{ marginTop: 24 }}>
                    If your organization requires the IRS W-9 Form for TMAC, then{' '}
                    download or print a copy below.
                  </div>
                  <div css={{ marginTop: 24 }}>
                    <a
                      download
                      href="https://res.cloudinary.com/tmac/image/upload/v1537391621/TMAC__W-9_Form_18-19.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Download W-9
                    </a>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
      </section>
    );
  }
}

export default RegisterSponsorPayment;
