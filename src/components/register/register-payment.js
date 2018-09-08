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
import { firebase } from '../../firebase';
// import {
  // doGetInvoiceId,
  // doGetReceiptId,
  // doUpdateEntry,
  // doUpdateInvoiceId,
  // doUpdateReceiptId,
// } from '../../firebase/db'

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
      invoiceId: null,
      paymentDetails: {},
      receiptId: null,
      value: 'active',
    };

    this.activeComponent = true;
  }

  componentDidMount() {
    // We need the 'window' to be defined
    //  which is only once a component is mounted
    this.db = firebase.database();

    this.invoiceDocRef = this.db &&
      this.db.collection('Document_ID').doc('invoice_18-19');
    this.receiptDocRef = this.db &&
      this.db.collection('Document_ID').doc('receipt_18-19');

    if (this.activeComponent) {
      this.doGetInvoiceId(this.handleGetCurrentInvoiceId);
      this.doGetReceiptId(this.handleGetCurrentReceiptId);
    }
  }

  componentWillUnmount() {
    const { hasCompletedPayment } = this.state;

    this.activeComponent = false;

    return hasCompletedPayment
      ? this.handleIncrementReceiptId()
      : this.handleIncrementInvoiceId();
  }

  doUpdateEntry = (form, documentId) => {
    if (this.db) {
      this.db.collection('registration_18-19')
        .doc(documentId)
        .update({
          Payment_Method: form.paymentId ? 'paypal' : 'invoiced',
          Level: form.level,
          Amount_Paid: form.amount,
        })
        .then(() => {
          console.log(`Updating payment info for ${form.First_Name} ${form.Last_Name} was successful`);
        })
        .catch(err =>{
          console.log(`Error updating payment info for ${form.First_Name} ${form.Last_Name} document`, err);
        });
    }
  };

  doGetInvoiceId = (callback) => {
    if (this.db) {
      this.db.collection('Document_ID')
        .doc('invoice_18-19')
        .get()
        .then((doc) => {
          if (!doc.exists) {
            // doc.data() will be undefined in this case
            console.log('no such document for invoice');
          } else {
            callback(doc.data().currentInvoiceId);
          }
        })
        .catch((err) => {
          console.log('Error getting document for invoice:', err);
        });
    }
  };

  doGetReceiptId = (callback) => {
    if (this.db) {
      this.db.collection('Document_ID')
        .doc('receipt_18-19')
        .get()
        .then((doc) => {
          if (!doc.exists) {
            // doc.data() will be undefined in this case
            console.log('no such document for receipt');
          } else {
            callback(doc.data().currentReceiptId);
          }
        })
        .catch((err) => {
          console.log('Error getting document for receipt:', err);
        });
    }
  };

  doUpdateInvoiceId = () => {
    if (this.db) {
      this.db.runTransaction((transaction) =>
        transaction
          .get(this.invoiceDocRef)
          .then((doc) => {
            if (!doc.exists) {
              // doc.data() will be undefined in this case
              console.log('no such document for invoice');
            } else {
              const newInvoiceId = doc.data().currentInvoiceId + 1;
              transaction.update(this.invoiceDocRef, { currentInvoiceId: newInvoiceId });
            }
          })
          .catch((err) => {
            console.log('Error getting document for invoice:', err);
          }),
        )
        .then(() => {
          console.log('transaction successfully committed');
        })
        .catch((err) => {
          console.log('transaction failed', err);
        });
    }
  };

  doUpdateReceiptId = () => {
    if (this.db) {
      this.db.runTransaction((transaction) =>
        transaction
          .get(this.receiptDocRef)
          .then((doc) => {
            if (!doc.exists) {
              // doc.data() will be undefined in this case
              console.log('no such document for receipt');
            } else {
              const newReceiptId = doc.data().currentReceiptId + 1;
              transaction.update(this.receiptDocRef, { currentReceiptId: newReceiptId });
            }
          })
          .catch((err) => {
            console.log('Error getting document for receipt:', err);
          }),
        )
        .then(() => {
          console.log('transaction successfully committed');
        })
        .catch((err) => {
          console.log('transaction failed', err);
        });
    }
  };

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
        onCompleteStep,
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

      onCompleteStep(2, updatedForm);
      this.doUpdateEntry(updatedForm, documentId);
    }
  };

  handleIncrementInvoiceId = () => {
    // Called when unmounting the component if no purchase made
    return this.doUpdateInvoiceId();
  };

  handleIncrementReceiptId = () => {
    // Called when unmounting the component when user completed the purchase
    return this.doUpdateReceiptId();
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
              <p>{form.First_Name} {form.Last_Name}, {form.District}</p>

              <h3 css={{ marginTop: 48 }}>Thank you for joining TMAC for this school year!</h3>
              <FormHr />

              <p>Please click below to print a copy of your receipt.</p>

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
