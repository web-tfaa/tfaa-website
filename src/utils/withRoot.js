// External Dependencies
import { MuiThemeProvider } from '@material-ui/core/styles';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';

/* CssBaseline
 kickstart an elegant, consistent, and simple baseline to build upon. */

// Local Dependencies
import getPageContext from './getPageContext';

// Local Variables
const CLIENT_ID = {
  // Currently using the sandbox id from this paypal demo
  // https://github.com/paypal/paypal-checkout-demo/blob/master/src/react.htm
  sandbox: process.env.GATSBY_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.GATSBY_PAYPAL_CLIENT_ID_PRODUCTION,
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

function withRoot(Component) {
  class WithRoot extends React.Component {
    constructor(props) {
      super(props);
      this.muiPageContext = getPageContext();
    }

    componentDidMount() {
      let jssStyles;

      if (typeof document !== 'undefined') {
        // Remove the server-side injected CSS.
        jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles && jssStyles.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles);
        }
      }
    }

    render() {
      return (
        <JssProvider generateClassName={this.muiPageContext.generateClassName}>
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            sheetsManager={this.muiPageContext.sheetsManager}
            theme={this.muiPageContext.theme}
          >
            <PayPalScriptProvider
              options={{
                'client-id': ENV === 'production'
                  ? CLIENT_ID.production
                  : CLIENT_ID.sandbox
              }}
            >
              <CssBaseline />
              <Component
                {...this.props}
              />
            </PayPalScriptProvider>
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  return WithRoot;
}

export default withRoot;
