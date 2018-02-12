module.exports = {
  siteMetadata: {
    title: `TMAC`,
    siteUrl: `https://www.texasmusicadministrators.com`,
    description: `Website for the Texas Music Administrators Conference`,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: 'f9p2z2e3hcys',
        accessToken: '868b50738a280398c2e1067f1e980c54205a8563ff92957ba23352b0a47edbb4',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
};
