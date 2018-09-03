// eslint-disable global-require
// eslint-disable react/prefer-stateless-function

// External Dependencies
import React from 'react';

// Internal Dependencies
import colors from './utils/colors';

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../publicstyles.css`);
  } catch (err) {
    console.log(err);
  }
}

// Component Definition
export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <link
            rel="preload"
            href="/static/ftn45-webfont.c2439033.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/spectral-latin-400.d9fdfd34.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/static/ftn65-webfont.0ddc10d2.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          {this.props.headComponents}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`/favicon-16x16.png`}
          />
          <link
            rel="mask-icon"
            href={`/safari-pinned-tab.svg`}
            color={colors.gatsby}
          />
          <meta name="msapplication-config" content={`/browserconfig.xml`} />
          <script
            src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
            defer
          />
        </head>
        <body {...this.props.bodyAttributes}>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          <script
            src="https://apis.google.com/js/api.js"
            type="text/javascript"
          />
          <script src="https://www.paypalobjects.com/api/checkout.js" />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
