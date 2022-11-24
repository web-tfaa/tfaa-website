// Give gatsby access to env keys
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: 'TMAC',
    siteUrl: 'https://www.texasmusicadmin.com',
    description: 'Website for the Texas Music Administrators Conference',
  },
  plugins: [
    'gatsby-theme-material-ui',
    'gatsby-plugin-styled-components',
    // {
    //   resolve: '@sentry/gatsby',
    //   options: {
    //     dsn: process.env.GATSBY_SENTRY_DSN,
    //     tracesSampleRate: 0.7,
    //   },
    // },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        // Accepts the following options,
        //  all of which are defined by `@emotion/babel-plugin` plugin.
        // The values for each key in this example are the defaults the plugin uses.
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.texasmusicadmin.com',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: '@sentry/gatsby',
    },
  ],
};
