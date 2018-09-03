// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material-UI Dependencies
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
// import green from '@material-ui/core/colors/green';

// Internal Dependencies
import FormHr from '../shared/form-hr';
// import { colors } from '../../utils/presets';

// Local Dependencies
import PaypalButtonWrapper from './paypal/paypal-button-wrapper';

// Local Variables
const styles = {
  label: {
    marginBottom: 12,
  },
};

// Component Definition
class RegisterPayment extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    advanceToNextStep: PropTypes.func.isRequired,
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
        advanceToNextStep,
      } = this.props;

      const {
        hasCompletedPayment,
        hasCompletedRegisterPaymentStep,
      } = this.state;

      console.log('hasCompletedPayment', hasCompletedPayment);

      if (hasCompletedRegisterPaymentStep) {
        setTimeout(() => advanceToNextStep(2), 3500);
      }
    }
  }

  handleUpdateCompletedStep = () => {
    if (this.activeComponent) {
      this.setState({
        hasCompletedRegisterPaymentStep: true,
      }, () => this.handleCompletePaymentStep());
    }
  }

  render() {
    const {
      classes,
      value,
    } = this.state;

    console.log('props', classes);

    return (
      <section>
        <h2>3. Pay TMAC Dues</h2>
        <FormHr />

        <FormControl component="fieldset">
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

      </section>
    );
  }
}

export default withStyles(styles)(RegisterPayment);
