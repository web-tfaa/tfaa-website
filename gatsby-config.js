// Give gatsby access to env keys
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: 'TFAA',
    siteUrl: 'https://texasfineartsadmin.com/',
    description: 'Website for the Texas Fine Arts Administrators',
  },
  plugins: [
    'gatsby-theme-material-ui',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
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
        siteUrl: 'https://texasfineartsadmin.com/',
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
