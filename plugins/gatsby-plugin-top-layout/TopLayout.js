// External Dependencies
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@material-ui/styles';

// Internal Dependencies
import theme from '../../src/theme';

// Component Definition
export default function TopLayout(props) {
  const { children } = props;
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:200,300,400|Source+Sans+Pro:400,700,900"
          rel="stylesheet"
          type="text/css"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node,
};
