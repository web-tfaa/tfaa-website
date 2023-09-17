/* eslint-disable react/prefer-stateless-function */
// eslint-disable global-require

// External Dependencies
import React from 'react';

// Internal Dependencies
import colors from './utils/colors';

// Component Definition
export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          {this.props.headComponents}
          <meta charSet="utf-8" />
          <meta
            content="IE=edge"
            httpEquiv="X-UA-Compatible"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color={colors.gatsby}
          />
          <meta
            name="msapplication-config"
            content="/browserconfig.xml"
          />
          <script
            src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
            defer
          />
          <meta
            name="google-site-verification"
            content="zatUmTHTSD3gJPg0iwPub6EGhF5De-kqJHy826gYNh0"
          />
        </head>
        <body {...this.props.bodyAttributes}>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          <script src="https://www.paypalobjects.com/api/checkout.js" />
          <script
            src="https://widget.cloudinary.com/v2.0/global/all.js"
            type="text/javascript"
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
