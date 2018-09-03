// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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

// Component Definition
class RegisterPayment extends Component {
  static propTypes = {
    onCompleteStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCompletedPayment: false,
      hasCompletedRegisterPaymentStep: false,
      value: 'active',
    };

    this.activeComponent = true;
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
        setTimeout(() => onCompleteStep(2), 3500);
      }
    }
  };

  handleUpdateCompletedStep = () => {
    if (this.activeComponent) {
      this.setState({
        hasCompletedRegisterPaymentStep: true,
      }, () => this.handleCompletePaymentStep());
    }
  };

  render() {
    const {
      value,
    } = this.state;

    return (
      <section>
        <h2>3. Pay TMAC Dues</h2>
        <FormHr />

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
              label="Active $50"
              value="active"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label="Retired $30"
              value="retired"
            />
            {/* <FormControlLabel
              control={<Radio color="primary" />}
              label="Sponsor $0"
              value="sponsor"
            /> */}
            <PaypalButtonWrapper amount={this.getCurrentAmount()} />
          </RadioGroup>
        </FormControl>

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
            trigger={() => <button type="button">Print Invoice</button>}
            content={() => this.printInvoice}
          />
          <div css={{ display: 'none' }}>
            <Invoice
              ref={(el) => { this.printInvoice = el; } }
              amount={this.getCurrentAmount()}
              isInvoice
            />
          </div>
        </div>
      </section>
    );
  }
}

export default RegisterPayment;
