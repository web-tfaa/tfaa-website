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
    `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
};
