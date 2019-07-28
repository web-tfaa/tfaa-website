// External Dependencies
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { Component, Fragment } from 'react';
import ReactToPrint from 'react-to-print';
import format from 'date-fns/format';
import { css } from 'glamor';

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
import { options } from '../../utils/typography';
import { currentSchoolYearLong } from '../../utils/helpers';

// Local Variables
const currentDate = format(new Date(), ['M/D/YYYY']);

const labelStyles = {
  display: 'block',
  fontSize: '90%',
  letterSpacing: '0.1rem',
  marginTop: 16,
  textTransform: 'uppercase',
  width: '80%',
};

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  marginTop: 4,
  minWidth: '75%',
  padding: '0.3rem',
  width: '100%',
};

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(','),
  marginLeft: 26,
};

// Adds animation to the input that appears when selecting "Yes"
//  radio button for event attendance
const slideInTop = css.keyframes({
  '0%': { transform: 'translateY(-20px)', opacity: 0 },
  '100%': { transform: 'translateY(0)', opacity: 1 },
});

// This will tell the database action where to put the new record
const collection = 'sponsor';

// Component Definition
class RegisterSponsorPayment extends Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
    initialLevel: PropTypes.string.isRequired,
    onCompleteStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    console.log('initialLevel', props.initialLevel);

    this.state = {
      // This is used to send the final donation amount to the db
      donationAmount: this.getInitialDonationAmount(props.initialLevel),
      hasCompletedPayment: false,
      invoiceId: 0,
      paymentDetails: {},
      receiptId: 0,
      value: props.initialLevel,
      valueBronze: 500,
      valueBronzeError: '',
      valueChampion: 2000,
      valueChampionError: '',
      valueGold: 1500,
      valueGoldError: '',
      valueSilver: 1000,
      valueSilverError: '',
    };
  }

  componentDidMount() {
    this.activeComponent = true;

    if (this.activeComponent) {
      doGetInvoiceId(this.handleGetCurrentInvoiceId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      form,
    } = this.props;

    const {
      donationAmount,
      invoiceId,
      receiptId,
      value,
    } = this.state;

    const updatedForm = {
      AmountDonated: donationAmount,
      invoiceDate: currentDate,
      invoiceId,
      SponsorLevel: value,
      receiptId,
    };

    if ((prevState.invoiceId === 0 && invoiceId > 0)
      || (prevState.receiptId === 0 && receiptId > 0)) {
      console.log('0');
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

  getInitialDonationAmount = (level) => {
    switch (level) {
      case 'Class Champion':
        return 2000;
      case 'Gold Medal':
        return 1500;
      case 'Silver Medal':
        return 1000;
      case 'Bronze Medal':
        return 500;
      default: break;
    }
  };

  getDonationAmount = (level) => {
    const {
      valueBronze,
      valueChampion,
      valueGold,
      valueSilver,
    } = this.state;

    switch (level) {
      case 'Class Champion':
        return valueChampion || 2000;
      case 'Gold Medal':
        return valueGold || 1500;
      case 'Silver Medal':
        return valueSilver || 1000;
      case 'Bronze Medal':
        return valueBronze || 500;
      default: break;
    }
  };

  handleChangeRadioSelection = (event) => {
    const {
      form,
    } = this.props;

    const {
      invoiceId,
      receiptId,
    } = this.state;

    const updatedForm = {
      AmountDonated: this.getDonationAmount(event.target.value),
      invoiceDate: currentDate,
      invoiceId,
      SponsorLevel: event.target.value,
      receiptId,
    };

    if (this.activeComponent) {
      this.setState({
        donationAmount: this.getDonationAmount(event.target.value),
        value: event.target.value,
      });

      console.log('1');
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
        donationAmount,
        invoiceId,
        paymentDetails,
        receiptId,
        // value,
      } = this.state;

      console.log('handleCompletePaymentStep : donationAmount : ', donationAmount);

      const documentId = form.userId;

      const updatedForm = {
        AmountDonated: donationAmount,
        PaypalPayerID: paymentDetails.payerId,
        PaypalPaymentID: paymentDetails.paymentId,
        PaymentOption: paymentDetails.paymentId ? 'Paypal' : 'Invoiced',
        invoiceDate: currentDate,
        invoiceId,
        receiptId,
      };

      console.log('2');
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
      // value,
    } = this.state;

    const documentId = form.userId;

    const updatedForm = {
      ...paymentDetails,
      invoiceDate: currentDate,
      invoiceId,
      receiptId,
    };

    return Promise.all([
      !console.log('3') && doUpdateEntry(updatedForm, collection, documentId),
      doUpdateInvoiceId(),
    ]);
  };

  handleIncrementReceiptId = () => {
    // Called when unmounting the component after user completed the purchase
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

  handleUpdate = (event) => {
    if (this.activeComponent) {
      const {
        name,
        value,
      } = event.target;

      console.log('handleUpdate : event : ', parseInt(value, 10));

      this.setState({
        // We check for empty value and cast it to a string to avoid setting to NaN
        [name]: !value ? '' : parseInt(value, 10),
      }, () => this.handleUpdateInputError(name, value));
    }
  };

  handleUpdateInputError = (name, value) => {
    if (this.activeComponent) {
      const {
        form,
      } = this.props;

      // These values are the PREVIOUS state
      // We have to compare against the incoming "value", too
      const {
        valueBronze,
        valueChampion,
        valueGold,
        valueSilver,
      } = this.state;

      const numberValue = !value ? 0 : parseInt(value, 10);

      switch (name) {
        case 'valueChampion':
          if (valueChampion && value) {
            if (numberValue < 2000) {
              this.setState({ valueChampionError: 'Class Champion Sponsorship is $2,000+' });
            } else if (numberValue >= 2000) {
              this.setState({
                donationAmount: numberValue,
                valueChampionError: '',
              });
              return doUpdateEntry({ AmountDonated: numberValue }, collection, form.userId);
            }
          } else if (!valueChampion && !value) {
            this.setState({ valueChampionError: 'Donation amount is required' });
          }
          break;
        case 'valueGold':
          if (valueGold && value) {
            if ((numberValue < 1500 || numberValue > 1999)) {
              this.setState({ valueGoldError: 'Gold Medal Sponsorship is $1,500-1,999' });
            } else if (numberValue >= 1500 || numberValue <= 1999) {
              this.setState({
                donationAmount: numberValue,
                valueGoldError: '',
              });
              return doUpdateEntry({ AmountDonated: numberValue }, collection, form.userId);
            }
          } else if (!valueGold && !value) {
            this.setState({ valueGoldError: 'Donation amount is required' });
          }
          break;
        case 'valueSilver':
          if (valueSilver && value) {
            if ((numberValue < 1000 || numberValue > 1499)) {
              this.setState({ valueSilverError: 'Silver Medal Sponsorship is $1,000-1,499' });
            } else if (numberValue >= 1000 || numberValue <= 1499) {
              this.setState({
                donationAmount: numberValue,
                valueSilverError: '',
              });
              return doUpdateEntry({ AmountDonated: numberValue }, collection, form.userId);
            }
          } else if (!valueSilver && !value) {
            this.setState({ valueSilverError: 'Donation amount is required' });
          }
          break;
        case 'valueBronze':
          if (valueBronze && value) {
            if ((numberValue < 500 || numberValue > 999)) {
              this.setState({ valueBronzeError: 'Bronze Medal Sponsorship is $500-999' });
            } else if (numberValue >= 500 || numberValue <= 999) {
              this.setState({
                donationAmount: numberValue,
                valueBronzeError: '',
              });
              return doUpdateEntry({ AmountDonated: numberValue }, collection, form.userId);
            }
          } else if (!valueBronze && !value) {
            this.setState({ valueBronzeError: 'Donation amount is required' });
          }
          break;
        default:
          break;
      }
    }
  };

  render() {
    const {
      form,
    } = this.props;

    const {
      donationAmount,
      hasCompletedPayment,
      invoiceId,
      paymentDetails,
      receiptId,
      value,
      valueBronze,
      valueBronzeError,
      valueChampion,
      valueChampionError,
      valueGold,
      valueGoldError,
      valueSilver,
      valueSilverError,
    } = this.state;

    return (
      <section>
        <h2>3. Choose Sponsorship level and Make payment</h2>
        <FormHr />
        {hasCompletedPayment
          ? (
            <Fragment>
              <h3 css={{ marginBottom: 24 }}>Successful Payment!</h3>
              <p>{value} Sponsor - $1000</p>
              <p>{form.OrganizationContactName}, {form.SponsorOrganization}</p>

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
                  amount={donationAmount}
                  form={form}
                  isInvoice={false}
                  paymentDetails={paymentDetails}
                  receiptId={receiptId}
                  ref={(el) => { this.printReceipt = el; }}
                  sponsorLevel={value}
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
                    Choose your sponsorship level below
                  </FormLabel>
                  <RadioGroup
                    aria-label="TMAC sponsorship levels"
                    name="sponsorshipLevels"
                    onChange={this.handleChangeRadioSelection}
                    value={value}
                  >
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Class Champion — $2,000+"
                      value="Class Champion"
                    />
                    {value === 'Class Champion' && [
                      <div
                        key="classChampInput"
                        css={css({
                          animation: `${slideInTop} 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                          marginLeft: 24,
                        })}
                      >
                        <label css={labelStyles} htmlFor="valueChampion">
                          Donation Amount
                          <input
                            css={inputStyles}
                            min="2000"
                            name="valueChampion"
                            onChange={this.handleUpdate}
                            placeholder=""
                            type="number"
                            value={valueChampion}
                          />
                        </label>
                      </div>,
                      <div
                        css={baseErrorStyles}
                        key="classChampInputError"
                      >
                        {valueChampionError}
                      </div>,
                    ]}
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Gold Medal — $1,500-1,999"
                      value="Gold Medal"
                    />
                    {value === 'Gold Medal' && [
                      <div
                        key="goldInput"
                        css={css({
                          animation: `${slideInTop} 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                          marginLeft: 24,
                        })}
                      >
                        <label css={labelStyles} htmlFor="valueGold">
                          Donation Amount
                          <input
                            css={inputStyles}
                            max="1999"
                            min="1500"
                            name="valueGold"
                            onChange={this.handleUpdate}
                            placeholder=""
                            type="number"
                            value={valueGold}
                          />
                        </label>
                      </div>,
                      <div
                        css={baseErrorStyles}
                        key="goldInputError"
                      >
                        {valueGoldError}
                      </div>,
                    ]}
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Silver Medal — $1,000-1,499"
                      value="Silver Medal"
                    />
                    {value === 'Silver Medal' && [
                      <div
                        key="silverInput"
                        css={css({
                          animation: `${slideInTop} 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                          marginLeft: 24,
                        })}
                      >
                        <label css={labelStyles} htmlFor="valueSilver">
                          Donation Amount
                          <input
                            css={inputStyles}
                            min="1000"
                            max="1499"
                            name="valueSilver"
                            onChange={this.handleUpdate}
                            placeholder=""
                            type="number"
                            value={valueSilver}
                          />
                        </label>
                      </div>,
                      <div
                        css={baseErrorStyles}
                        key="silverInputError"
                      >
                        {valueSilverError}
                      </div>,
                    ]}
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Bronze Medal — $500-999"
                      value="Bronze Medal"
                    />
                    {value === 'Bronze Medal' && [
                      <div
                        key="bronzeInput"
                        css={css({
                          animation: `${slideInTop} 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                          marginLeft: 24,
                        })}
                      >
                        <label css={labelStyles} htmlFor="valueBronze">
                          Donation Amount
                          <input
                            css={inputStyles}
                            min="500"
                            max="999"
                            name="valueBronze"
                            onChange={this.handleUpdate}
                            placeholder=""
                            type="number"
                            value={valueBronze}
                          />
                        </label>
                      </div>,
                      <div
                        css={baseErrorStyles}
                        key="bronzeInputError"
                      >
                        {valueBronzeError}
                      </div>,
                    ]}
                    <PaypalButtonWrapper
                      amount={donationAmount}
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
                      amount={donationAmount}
                      form={form}
                      invoiceId={invoiceId}
                      isInvoice
                      ref={(el) => { this.printInvoice = el; }}
                      sponsorLevel={value}
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
