// External Dependencies
import React, { Component } from 'react';
import {
  push,
} from 'gatsby';

// Internal Dependencies
import googleConfig from '../../utils/google-config';
import { colors } from '../../utils/presets';
import { options } from '../../utils/typography';
import { removeErrorKeys } from '../../utils/helpers';
// import {
//   auth,
//   firebase,
// } from '../../firebase';

// Local Styles
const labelStyles = {
  display: 'block',
  fontSize: '90%',
  letterSpacing: '0.1rem',
  marginTop: 16,
  textTransform: 'uppercase',
};

// const bottomLabelStyles = {
//   ...labelStyles,
// };

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  padding: '0.3rem',
  minWidth: '70%',
};

// const buttonStyles = {
//   backgroundColor: 'rebeccapurple',
//   border: 0,
//   color: 'white',
//   fontSize: '1.25rem',
//   fontWeight: 'bold',
//   marginTop: '0.5rem',
//   padding: '0.25rem 1rem',
//   transition: 'background-color 150ms linear',
// };

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(`,`),
  marginTop: '0.5rem',
};

// const lastErrorStyles = {
//   ...baseErrorStyles,
//   margin: '16px 0',
// };

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const INITIAL_STATE = {
  isAuthenticated: false,
  First_Name: '',
  First_NameError: '',
  Last_Name: '',
  Last_NameError: '',
  Title: '',
  TitleError: '',
  District: '',
  DistrictError: '',
  Address_1: '',
  Address_1Error: '',
  // Address2 is not required, so cannot have an error
  Address_2: '',
  City: '',
  CityError: '',
  Zip_Code: '',
  Zip_CodeError: '',
  Email: '',
  EmailError: '',
  Office_Phone: '',
  Office_PhoneError: '',
  Cell_Phone: '',
  Cell_PhoneError: '',
  // OfficeFax is not required, so cannot have an error
  Office_Fax: '',
};

const VALUE_INPUT_OPTION = 'USER_ENTERED';

// To check for a valid Email address
const EmailRegex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;
const Zip_CodeRegex = /^\d{5}(?:[-\s]\d{4})?$/i;

// Local Functions
const formatPhone = (phone) => {
  let cleanPhone = phone;
  if (cleanPhone.startsWith('1')) cleanPhone = cleanPhone.slice(1);
  if (cleanPhone.length !== 10) return phone;
  return `(${cleanPhone.substr(0, 3)}) ${cleanPhone.substr(3, 3)}-${cleanPhone.substr(6, 4)}`;
}

const stripPhone = (phone) => phone.replace(/[^0-9]+/g, '');

// Component Definition
class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    // 1. Load the JavaScript client library.
    // window.gapi.load("client:auth2", this.initClient);
  }

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: googleConfig.apiKey,
        clientId: googleConfig.clientId,
        discoveryDocs: googleConfig.discoveryDocs,
        scope: googleConfig.scopes,
      })
      .then((res) => {
        console.log('1 res', res);
      // 3. Initialize and make the API request.

      var user = window.gapi.auth2.getAuthInstance().currentUser.get();

      var oauthToken = user.getAuthResponse().access_token;

      console.log('oauthToken', oauthToken);

      // this.handleClientLoad(this.onload);
    });
  }

  handleClientLoad = () => {
    console.log('inside handleClientLoad');
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GATSBY_SPREADSHEET_ID,
      majorDimension: 'COLUMNS',
      range: 'Sheet1!A2:A500',
    })
    .then((res) => {
      console.log('response →', res);
    });
  }

  onLoad = (data, error) => {
    if (data) {
      console.log('data');
      const cars = data.cars;
      this.setState({ cars });
    } else {
      console.log('error');
      this.setState({ error });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleUpdate = (event) => {
    if (event.target.name.endsWith('Phone') || event.target.name.endsWith('Fax')) {
      this.setState({
        [event.target.name]: stripPhone(event.target.value),
      }, this.handleUpdateErrors(event.target.name, event.target.value));
    }
    else this.setState({
      [event.target.name]: event.target.value,
    }, this.handleUpdateErrors(event.target.name, event.target.value));
  }

  handleClickSubmitButton = (event) => {
    const originalForm = this.state;

    const form = removeErrorKeys(originalForm);
    console.log('no errors!', form);

    const body = {
      values: [
        [form.First_Name],
        [form.Last_Name],
        [form.Title],
        [form.District],
        [form.Address_1],
        [form.Address_2],
        [form.City],
        [form.Zip_Code],
        [form.Email],
        [form.Office_Phone],
        [form.Cell_Phone],
        [form.Office_Fax],
      ],
    };

    console.log('JSON.stringify', JSON.stringify(form));

    // window.gapi.client.sheets.spreadsheets.values.update({
    //   spreadsheetId: process.env.GATSBY_SPREADSHEET_ID,
    //   range: 'Sheet1!A2:A500',
    //   valueInputOption: VALUE_INPUT_OPTION,
    //   resource: body,
    // })
    // .then((res) => {
    //   const result = res.result;
    //   console.log(`${result.updatedCells} cells updated.`);
    // });

    // auth.doSignInWithEmailAndPassword(Email, password)
    //   .then(() => {
    //     this.setState(() => ({
    //       ...INITIAL_STATE,
    //       isAuthenticated: true,
    //     }));
    //   })
    //   .catch(err => {
    //     this.setState({ error: err });
    //   });
  }

  handleUpdateErrors = (name, value) => {
    if (name === 'Email') this.handleUpdateEmailError(value);
    else if (name === 'Zip_Code') this.handleUpdateZip_CodeError(value);
    else this.handleUpdateInputError(name, value);
  }

  handleUpdateEmailError = (value) => {
    if (!value) {
      this.setState({
        EmailError: 'Email is required',
      });
    } else if (value && EmailRegex.test(value)) {
      this.setState({
        EmailError: '',
      });
    } else if (value && !EmailRegex.test(value)) {
      this.setState({
        EmailError: 'Use a valid Email',
      });
    }
  }

  handleUpdateZip_CodeError = (value) => {
    if (!value) {
      this.setState({
        Zip_CodeError: 'ZIP Code is required',
      });
    } else if (value && Zip_CodeRegex.test(value)) {
      this.setState({
        Zip_CodeError: '',
      });
    } else if (value && !Zip_CodeRegex.test(value)) {
      this.setState({
        Zip_CodeError: 'Use a valid ZIP Code',
      });
    }
  }

  handleUpdateInputError = (name, value) => {
    const {
      First_Name,
      Last_Name,
      Title,
      District,
      Address_1,
      City,
      Office_Phone,
      Cell_Phone,
    } = this.state;

    switch (name) {
      case 'First_Name':
        if (!First_Name && value) {
          this.setState({ First_NameError: '' });
        } else if (First_Name && !value) {
          this.setState({ First_NameError: 'First Name is required' });
        }
        break;
      case 'Last_Name':
        if (!Last_Name && value) {
          this.setState({ Last_NameError: '' });
        } else if (Last_Name && !value) {
          this.setState({ Last_NameError: 'Last Name is required' });
        }
        break;
      case 'Title':
        if (!Title && value) {
          this.setState({ TitleError: '' });
        } else if (Title && !value) {
          this.setState({ TitleError: 'Title is required' });
        }
        break;
      case 'District':
        if (!District && value) {
          this.setState({ DistrictError: '' });
        } else if (District && !value) {
          this.setState({ DistrictError: 'District is required' });
        }
        break;
      case 'Address_1':
        if (!Address_1 && value) {
          this.setState({ Address_1Error: '' });
        } else if (Address_1 && !value) {
          this.setState({ Address_1Error: 'Address 1 is required' });
        }
        break;
      case 'City':
        if (!City && value) {
          this.setState({ CityError: '' });
        } else if (City && !value) {
          this.setState({ CityError: 'City is required' });
        }
        break;
      case 'Office_Phone':
        if (!Office_Phone && value) {
          this.setState({ Office_PhoneError: '' });
        } else if (Office_Phone && !value) {
          this.setState({ Office_PhoneError: 'Office Phone is required' });
        }
        break;
      case 'Cell_Phone':
        if (!Cell_Phone && value) {
          this.setState({ Cell_PhoneError: '' });
        } else if (Cell_Phone && !value) {
          this.setState({ Cell_PhoneError: 'Cell Phone is required' });
        }
        break;
      default:
        break;
    }
  }

  render() {
    const {
      isAuthenticated,
      First_Name,
      First_NameError,
      Last_Name,
      Last_NameError,
      Title,
      TitleError,
      District,
      DistrictError,
      Address_1,
      Address_1Error,
      Address_2,
      City,
      CityError,
      Zip_Code,
      Zip_CodeError,
      Email,
      EmailError,
      Office_Phone,
      Office_PhoneError,
      Cell_Phone,
      Cell_PhoneError,
      Office_Fax,
    } = this.state;

    if (isAuthenticated) push('/members');

    const hasInput = First_Name !== ''
      && Last_Name !== ''
      && Title !== ''
      && District !== ''
      && Address_1 !== ''
      && City !== ''
      && Zip_Code !== ''
      && Email !== ''
      && Office_Phone !== ''
      && Cell_Phone !== '';

    const hasValidInput = hasInput;

    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>

          {/* FIRST NAME */}
          <label css={labelStyles}>
            First Name
          </label>
          <input
            css={inputStyles}
            type="text"
            name="First_Name"
            onChange={this.handleUpdate}
            placeholder="e.g. Sally"
            value={First_Name}
          />
          <div css={baseErrorStyles}>
            {First_NameError}
          </div>

          {/* LAST NAME */}
          <label css={labelStyles}>
            Last Name
          </label>
          <input
            css={inputStyles}
            name="Last_Name"
            onChange={this.handleUpdate}
            placeholder="e.g. Drumm"
            value={Last_Name}
          />
          <div css={baseErrorStyles}>
            {Last_NameError}
          </div>

          {/* TITLE */}
          <label css={labelStyles}>
            Title
          </label>
          <input
            css={inputStyles}
            name="Title"
            onChange={this.handleUpdate}
            placeholder="e.g. Director of Fine Arts"
            value={Title}
          />
          <div css={baseErrorStyles}>
            {TitleError}
          </div>

          {/* DISTRICT */}
          <label css={labelStyles}>
            District
          </label>
          <input
            css={inputStyles}
            name="District"
            onChange={this.handleUpdate}
            placeholder="e.g. Texas ISD"
            value={District}
          />
          <div css={baseErrorStyles}>
            {DistrictError}
          </div>

          {/* ADDRESS 1 */}
          <label css={labelStyles}>
            Address 1
          </label>
          <input
            css={inputStyles}
            name="Address_1"
            onChange={this.handleUpdate}
            placeholder="e.g. 123 Main St."
            value={Address_1}
          />
          <div css={baseErrorStyles}>
            {Address_1Error}
          </div>

          {/* ADDRESS 2 */}
          <label css={labelStyles}>
            Address 2
          </label>
          <input
            css={inputStyles}
            name="Address_2"
            onChange={this.handleUpdate}
            placeholder="e.g. Suite 19"
            value={Address_2}
          />

          {/* CITY */}
          <label css={labelStyles}>
            City
          </label>
          <input
            css={inputStyles}
            name="City"
            onChange={this.handleUpdate}
            placeholder="e.g. Dallas"
            value={City}
          />
          <div css={baseErrorStyles}>
            {CityError}
          </div>

          {/* ZIP */}
          <label css={labelStyles}>
            ZIP Code
          </label>
          <input
            css={inputStyles}
            name="Zip_Code"
            onChange={this.handleUpdate}
            placeholder="e.g. 75150"
            value={Zip_Code}
          />
          <div css={baseErrorStyles}>
            {Zip_CodeError}
          </div>

          {/* EMAIL */}
          <label css={labelStyles}>
            Email
          </label>
          <input
            css={inputStyles}
            name="Email"
            onChange={this.handleUpdate}
            placeholder="e.g. music@austinisd.edu"
            value={Email}
          />
          <div css={baseErrorStyles}>
            {EmailError}
          </div>

          {/* OFFICE PHONE */}
          <label css={labelStyles}>
            Office Phone
          </label>
          <input
            css={inputStyles}
            name="Office_Phone"
            onChange={this.handleUpdate}
            placeholder="e.g. (512) 555-1919"
            value={formatPhone(Office_Phone)}
          />
          <div css={baseErrorStyles}>
            {Office_PhoneError}
          </div>

          {/* CELL PHONE */}
          <label css={labelStyles}>
            Cell Phone
          </label>
          <input
            css={inputStyles}
            name="Cell_Phone"
            onChange={this.handleUpdate}
            placeholder="e.g. (512) 555-1919"
            value={formatPhone(Cell_Phone)}
          />
          <div css={baseErrorStyles}>
            {Cell_PhoneError}
          </div>

          {/* OFFICE FAX */}
          <label css={labelStyles}>
            Office Fax
          </label>
          <input
            css={inputStyles}
            name="Office_Fax"
            onChange={this.handleUpdate}
            placeholder="e.g. (512) 555-1919"
            value={formatPhone(Office_Fax)}
          />

          {/* SUBMIT BUTTON */}
          <div
            css={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              css={{
                marginTop: '2rem',
                padding: '8px 12px',
              }}
              disabled={!hasValidInput}
              type="submit"
              onClick={this.handleClickSubmitButton}
              style={{
                color: `${!hasValidInput ? 'lightsteelblue' : 'inherit'}`,
              }}
            >
              Continue to Step 2
            </button>
          </div>

        </form>
      </div>
    );
  }
}

export default RegisterForm;
