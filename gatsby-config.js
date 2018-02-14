module.exports = {
  siteMetadata: {
    title: `TMAC`,
    siteUrl: `https://www.texasmusicadministrators.com`,
    description: `Website for the Texas Music Administrators Conference`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-react-next`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.gatsbyjs.org`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Texas Music Administrators Conference website`,
        short_name: `TMAC`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        navigateFallback: null,
        navigateFallbackWhitelist: [],
      },
    },
  ],
};
