/* eslint-disable camelcase */

// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css } from 'glamor';
import { navigate } from 'gatsby';

// Material-UI Dependencies
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// Internal Dependencies
import AuthUserContext from '../session/AuthUserContext';
import RegisterButton from './register-button';
import { options } from '../../utils/typography';
import {
  emailRegex,
  removeErrorKeys,
  zipCodeRegex,
} from '../../utils/helpers';
import {
  doCreateEntry,
} from '../../firebase/db';

// Local Styles
const labelStyles = {
  display: 'block',
  fontSize: '90%',
  letterSpacing: '0.1rem',
  marginTop: 16,
  textTransform: 'uppercase',
};

const insideLabelStyles = {
  ...labelStyles,
  width: '80%',
};

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  marginTop: 4,
  minWidth: '75%',
  padding: '0.3rem',
};

const insideInputStyles = {
  ...inputStyles,
  width: '100%',
};

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(','),
  marginTop: '0.5rem',
};

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const INITIAL_STATE = {
  AmountPaid: 0,
  City: '',
  CityError: '',
  ContactAddress1: '',
  ContactAddress1Error: '',
  // ContactAddress2 is not required, so cannot have an error
  ContactAddress2: '',
  ContactPhone: '',
  ContactPhoneError: '',
  Email: '',
  EmailError: '',
  FallRetreatIntent: true,
  FallRetreatOtherAttendees: '',
  honeypot: '',
  ImageUrl: '',
  ImageUrlError: '',
  invoiceDate: '',
  invoiceId: 0,
  isAuthenticated: false,
  OrganizationContactName: '',
  OrganizationContactNameError: '',
  PaymentOption: 'Invoiced',
  PaypalPayerID: '',
  PaypalPaymentID: '',
  receiptDate: '',
  receiptId: 0,
  SponsorLevel: '',
  SponsorOrganization: '',
  SponsorOrganizationError: '',
  SpringRoundTableIntent: true,
  SpringRoundTableOtherAttendees: '',
  State: '',
  StateError: '',
  Title: '',
  TitleError: '',
  ZipCode: '',
  ZipCodeError: '',
};

// Local Functions
const formatPhone = (phone) => {
  let cleanPhone = phone;
  if (cleanPhone.startsWith('1')) cleanPhone = cleanPhone.slice(1);
  if (cleanPhone.length !== 10) return phone;
  return `(${cleanPhone.substr(0, 3)}) ${cleanPhone.substr(
    3,
    3,
  )}-${cleanPhone.substr(6, 4)}`;
};

const stripPhone = phone => phone.replace(/[^0-9]+/g, '');

// Component Definition
class RegisterSponsorForm extends Component {
  static propTypes = {
    authUser: PropTypes.shape({}).isRequired,
    onCompleteStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      hasCompletedRegisterSponsorForm: false,
      radioValueFallRetreat: 'Yes',
      radioValueSpringRoundTable: 'Yes',
      // eslint-disable-next-line
      userId: props.authUser.uid,
    };

    this.activeComponent = true;
  }

  componentWillUnmount() {
    this.activeComponent = false;
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleClickSubmitButton = (event) => {
    event.preventDefault();

    const originalForm = this.state;

    // The Google Sheet doesn't need these values
    const form = removeErrorKeys(originalForm);
    delete form.isAuthenticated;
    delete form.honeypot;
    delete form.hasCompletedRegisterSponsorForm;

    // We set the "FallRetreatIntent" value to the radio button value
    form.FallRetreatIntent = form.radioValueFallRetreat;
    delete form.radioValueFallRetreat;

    // We set the "SpringRoundTableIntent" value to the radio button value
    form.SpringRoundTableIntent = form.radioValueSpringRoundTable;
    delete form.radioValueSpringRoundTable;

    // Send phone values in formatted
    form.ContactPhone = formatPhone(form.ContactPhone);

    // This will identify each row in the database and serve as the document name
    const documentId = form.userId;

    doCreateEntry(form, documentId, this.handleUpdateCompletedStep);

    // Update the form data and advance the steps with the above callback function
  };

  handleCompleteInfoStep = (form) => {
    if (this.activeComponent) {
      const { onCompleteStep } = this.props;

      setTimeout(() => onCompleteStep(0, form), 4000);
    }
  };

  handleUpdateCompletedStep = (form) => {
    if (this.activeComponent) {
      this.setState({
        hasCompletedRegisterSponsorForm: true,
      }, () => this.handleCompleteInfoStep(form));
    }
  }

  handleUpdate = (event) => {
    if (this.activeComponent) {
      if (event.target.name.endsWith('Phone')) {
        this.setState({
          [event.target.name]: stripPhone(event.target.value),
        }, this.handleUpdateErrors(event.target.name, event.target.value));
      } else {
        this.setState({
          [event.target.name]: event.target.value,
        }, this.handleUpdateErrors(event.target.name, event.target.value));
      }
    }
  };

  handleUpdateErrors = (name, value) => {
    if (name === 'Email') this.handleUpdateEmailError(value);
    else if (name === 'ZipCode') this.handleUpdateZipCodeError(value);
    else this.handleUpdateInputError(name, value);
  };

  handleUpdateEmailError = (value) => {
    if (this.activeComponent) {
      if (!value) {
        this.setState({
          EmailError: 'Email is required',
        });
      } else if (value && emailRegex.test(value)) {
        this.setState({
          EmailError: '',
        });
      } else if (value && !emailRegex.test(value)) {
        this.setState({
          EmailError: 'Use a valid Email',
        });
      }
    }
  };

  handleUpdateZipCodeError = (value) => {
    if (this.activeComponent) {
      if (!value) {
        this.setState({
          ZipCodeError: 'ZIP Code is required',
        });
      } else if (value && zipCodeRegex.test(value)) {
        this.setState({
          ZipCodeError: '',
        });
      } else if (value && !zipCodeRegex.test(value)) {
        this.setState({
          ZipCodeError: 'Use a valid ZIP Code',
        });
      }
    }
  };

  handleUpdateInputError = (name, value) => {
    if (this.activeComponent) {
      const {
        City,
        ContactAddress1,
        ContactPhone,
        ImageUrl,
        OrganizationContactName,
        SponsorOrganization,
        State,
        Title,
      } = this.state;

      switch (name) {
        case 'SponsorOrganization':
          if (!SponsorOrganization && value) {
            this.setState({ SponsorOrganizationError: '' });
          } else if (SponsorOrganization && !value) {
            this.setState({ SponsorOrganizationError: 'First Name is required' });
          }
          break;
        case 'ImageUrl':
          if (!ImageUrl && value) {
            this.setState({ ImageUrlError: '' });
          } else if (ImageUrl && !value) {
            this.setState({ ImageUrlError: 'Image URL is required' });
          }
          break;
        case 'OrganizationContactName':
          if (!OrganizationContactName && value) {
            this.setState({ OrganizationContactNameError: '' });
          } else if (OrganizationContactName && !value) {
            this.setState({ OrganizationContactNameError: 'Contact Name is required' });
          }
          break;
        case 'Title':
          if (!Title && value) {
            this.setState({ TitleError: '' });
          } else if (Title && !value) {
            this.setState({ TitleError: 'Title is required' });
          }
          break;
        case 'ContactAddress1':
          if (!ContactAddress1 && value) {
            this.setState({ ContactAddress1Error: '' });
          } else if (ContactAddress1 && !value) {
            this.setState({ ContactAddress1Error: 'Contact Address 1 is required' });
          }
          break;
        case 'City':
          if (!City && value) {
            this.setState({ CityError: '' });
          } else if (City && !value) {
            this.setState({ CityError: 'City is required' });
          }
          break;
        case 'State':
          if (!City && value) {
            this.setState({ StateError: '' });
          } else if (State && !value) {
            this.setState({ StateError: 'State is required' });
          }
          break;
        case 'ContactPhone':
          if (!ContactPhone && value) {
            this.setState({ ContactPhoneError: '' });
          } else if (ContactPhone && !value) {
            this.setState({ ContactPhoneError: 'Contact Phone is required' });
          }
          break;
        default:
          break;
      }
    }
  };

  handleChangeFallRetreatIntent = (event) => {
    this.setState({ radioValueFallRetreat: event.target.value });
  };

  handleChangeSpringRoundTableIntent = (event) => {
    this.setState({ radioValueSpringRoundTable: event.target.value });
  };

  validateHuman = (data) => {
    if (data) return false;
    return true;
  };

  render() {
    const {
      City,
      CityError,
      ContactAddress1,
      ContactAddress1Error,
      ContactAddress2,
      ContactPhone,
      ContactPhoneError,
      Email,
      EmailError,
      FallRetreatOtherAttendees,
      hasCompletedRegisterSponsorForm,
      honeypot,
      ImageUrl,
      ImageUrlError,
      isAuthenticated,
      OrganizationContactName,
      OrganizationContactNameError,
      radioValueFallRetreat,
      radioValueSpringRoundTable,
      SponsorOrganization,
      SponsorOrganizationError,
      SpringRoundTableOtherAttendees,
      State,
      StateError,
      Title,
      TitleError,
      ZipCode,
      ZipCodeError,
    } = this.state;

    if (isAuthenticated) navigate('/members');

    const hasInput = SponsorOrganization !== ''
      && OrganizationContactName !== ''
      && Title !== ''
      && ContactAddress1 !== ''
      && City !== ''
      && ZipCode !== ''
      && Email !== ''
      && ContactPhone !== '';

    const hasValidInput = hasInput && this.validateHuman(honeypot);

    // Adds animation to the input that appears when selecting "Yes"
    //  radio button for event attendance
    const slideInTop = css.keyframes({
      '0%': { transform: 'translateY(-20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    });

    return (
      <div className="login-form">
        {hasCompletedRegisterSponsorForm
          ? (
            <div
              css={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                margin: 32,
              }}
            >
              <h2>Sponsor Information Form Complete</h2>
              <p css={{ marginBottom: 32 }}>Now loading step 3...</p>
              <CircularProgress size={64} thickness={4} />
            </div>
          )
          : (
            <form onSubmit={this.handleSubmit}>

              {/* Sponsor Organization */}
              <label css={labelStyles} htmlFor="SponsorOrganization">
                Sponsor Organization
                <input
                  css={inputStyles}
                  name="SponsorOrganization"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Presto Music"
                  required
                  type="text"
                  value={SponsorOrganization}
                />
              </label>
              <div css={baseErrorStyles}>{SponsorOrganizationError}</div>

              {/* Image Url */}
              <label css={labelStyles} htmlFor="ImageUrl">
                Organization&apos;s logo (provide the URL)
                <input
                  css={inputStyles}
                  name="ImageUrl"
                  onChange={this.handleUpdate}
                  placeholder="e.g. https://www.tmea.org/templates/tmeamainsite/images/header_logo.png"
                  required
                  type="text"
                  value={ImageUrl}
                />
              </label>
              <div css={baseErrorStyles}>{ImageUrlError}</div>

              {/* Organization Contact Name */}
              <label css={labelStyles} htmlFor="OrganizationContactName">
                Organization Contact Name
                <input
                  css={inputStyles}
                  name="OrganizationContactName"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Dan Drum"
                  required
                  type="text"
                  value={OrganizationContactName}
                />
              </label>
              <div css={baseErrorStyles}>{OrganizationContactNameError}</div>

              {/* Title */}
              <label css={labelStyles} htmlFor="Title">
                Title
                <input
                  css={inputStyles}
                  name="Title"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Director of Marketing"
                  required
                  type="text"
                  value={Title}
                />
              </label>
              <div css={baseErrorStyles}>{TitleError}</div>

              {/* Contact Address 1 */}
              <label css={labelStyles} htmlFor="ContactAddress1">
                Contact Address 1
                <input
                  css={inputStyles}
                  name="ContactAddress1"
                  onChange={this.handleUpdate}
                  placeholder="e.g. 1100 Congress Ave."
                  required
                  type="text"
                  value={ContactAddress1}
                />
              </label>
              <div css={baseErrorStyles}>{ContactAddress1Error}</div>

              {/* Contact Address 2 */}
              <label css={labelStyles} htmlFor="ContactAddress2">
                Contact Address 2
                <input
                  css={inputStyles}
                  name="ContactAddress2"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Suite 1845"
                  type="text"
                  value={ContactAddress2}
                />
              </label>

              {/* City */}
              <label css={labelStyles} htmlFor="City">
                City
                <input
                  css={inputStyles}
                  name="City"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Austin"
                  required
                  type="text"
                  value={City}
                />
              </label>
              <div css={baseErrorStyles}>{CityError}</div>

              {/* State */}
              <label css={labelStyles} htmlFor="State">
                State
                <input
                  css={inputStyles}
                  name="State"
                  onChange={this.handleUpdate}
                  placeholder="e.g. TX"
                  required
                  type="text"
                  value={State}
                />
              </label>
              <div css={baseErrorStyles}>{StateError}</div>

              {/* ZIP Code */}
              <label css={labelStyles} htmlFor="ZipCode">
                ZIP Code
                <input
                  css={inputStyles}
                  name="ZipCode"
                  onChange={this.handleUpdate}
                  placeholder="e.g. 78701"
                  required
                  type="text"
                  value={ZipCode}
                />
              </label>
              <div css={baseErrorStyles}>{ZipCodeError}</div>

              {/* Email */}
              <label css={labelStyles} htmlFor="Email">
                Email
                <input
                  css={inputStyles}
                  name="Email"
                  onChange={this.handleUpdate}
                  placeholder="e.g. dan@presto.music"
                  required
                  type="email"
                  value={Email}
                />
              </label>
              <div css={baseErrorStyles}>{EmailError}</div>

              {/* Contact Phone */}
              <label css={labelStyles} htmlFor="ContactPhone">
                Contact Phone
                <input
                  css={inputStyles}
                  name="ContactPhone"
                  onChange={this.handleUpdate}
                  placeholder="e.g. (512) 555-1845"
                  required
                  type="text"
                  value={formatPhone(ContactPhone)}
                />
              </label>
              <div css={baseErrorStyles}>{ContactPhoneError}</div>

              <hr css={{ color: 'blue', height: 3, marginTop: 32 }} />

              {/* Fall Retreat Intent */}
              <FormControl component="fieldset">
                {/* eslint-disable-next-line */}
                <label css={labelStyles} htmlFor="FallRetreatIntent">
                  Will you (or another company representative) be present{' '}
                  at the Fall Retreat in Austin - November 14-16, 2018?
                  <RadioGroup
                    aria-label="FallRetreatIntent"
                    name="FallRetreatIntent"
                    value={radioValueFallRetreat}
                    onChange={this.handleChangeFallRetreatIntent}
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    {radioValueFallRetreat === 'Yes' && (
                      <div
                        css={css({
                          animation: `${slideInTop} 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                          margin: '0 24px 24px',
                        })}
                      >
                        <label css={insideLabelStyles} htmlFor="FallRetreatOtherAttendees">
                          Please list any other company representatives that will{' '}
                          attend the event
                          <input
                            css={insideInputStyles}
                            name="FallRetreatOtherAttendees"
                            onChange={this.handleUpdate}
                            placeholder="e.g. Aaron Copland, Leonard Bernstein"
                            type="text"
                            value={FallRetreatOtherAttendees}
                          />
                        </label>
                      </div>
                    )}
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                    <FormControlLabel value="Uncertain" control={<Radio />} label="Uncertain" />
                  </RadioGroup>
                </label>
              </FormControl>

              <hr css={{ color: 'blue', height: 3, marginTop: 32 }} />

              {/* Spring Round Table Intent */}
              <FormControl component="fieldset">
                {/* eslint-disable-next-line */}
                <label css={labelStyles} htmlFor="SpringRoundTableIntent">
                  Will you (or another company representative) be present{' '}
                  at the TMEA Round Table in San Antonio - February 13, 2019?
                  <RadioGroup
                    aria-label="SpringRoundTableIntent"
                    name="SpringRoundTableIntent"
                    value={radioValueSpringRoundTable}
                    onChange={this.handleChangeSpringRoundTableIntent}
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    {radioValueSpringRoundTable === 'Yes' && (
                      <div
                        css={css({
                          animation: `${slideInTop} 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                          margin: '0 24px 24px',
                        })}
                      >
                        <label css={insideLabelStyles} htmlFor="SpringRoundTableOtherAttendees">
                          Please list any other company representatives that will{' '}
                          attend the event
                          <input
                            css={insideInputStyles}
                            name="SpringRoundTableOtherAttendees"
                            onChange={this.handleUpdate}
                            placeholder="e.g. Eric Whitacre, Lin-Manuel Miranda"
                            type="text"
                            value={SpringRoundTableOtherAttendees}
                          />
                        </label>
                      </div>
                    )}
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                    <FormControlLabel value="Uncertain" control={<Radio />} label="Uncertain" />
                  </RadioGroup>
                </label>
              </FormControl>

              {/* Hidden input to help curtail spam */}
              <input
                css={{ opacity: 0, height: 1, width: 1 }}
                id="honeypot"
                name="honeypot"
                onChange={this.handleUpdate}
                type="text"
                value={honeypot}
              />

              {/* SUBMIT BUTTON */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: 24,
              }}
              >
                <RegisterButton
                  isDisabled={!hasValidInput}
                  onClick={this.handleClickSubmitButton}
                  buttonType="submit"
                >
                  Continue to Step 3
                </RegisterButton>
              </div>
            </form>
          )}
      </div>
    );
  }
}

const RegisterSponsorFormWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <RegisterSponsorForm {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default RegisterSponsorFormWithContext;
