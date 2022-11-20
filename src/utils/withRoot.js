// External Dependencies
import { MuiThemeProvider } from '@mui/styles';
import { CssBaseline } from '@mui/material';
import JssProvider from 'react-jss/lib/JssProvider';
import React from 'react';

// Local Dependencies
import getPageContext from './getPageContext';

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
          <MuiThemeProvider
            sheetsManager={this.muiPageContext.sheetsManager}
            theme={this.muiPageContext.theme}
          >
            <CssBaseline />

            <Component {...this.props} />
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  return WithRoot;
}

export default withRoot;
