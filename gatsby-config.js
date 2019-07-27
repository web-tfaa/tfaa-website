// Give gatsby access to env keys
require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: 'TMAC',
    siteUrl: 'https://www.texasmusicadmin.com',
    description: 'Website for the Texas Music Administrators Conference',
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
    'gatsby-plugin-glamor',
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
    'gatsby-plugin-sharp',
  ],
};
