# TMAC

Texas Music Administrators Conference ([link](https://www.texasmusicadmin.com/))

This website was constructed for Jeff Turner, Mario Luna, and the Texas Music Administrators Conference. Planning began in January 2018 with building starting in mid-February 2018.

## Tools

- GatsbyJS
- React
- Contentful (as CMS)
- Cloudinary (as CDN)
- Firebase for authentication
- Firestore for data storage
- Google Scripts to sync with Firebase data
- MUI
- TypeScript (partially implemented)

### Gatsby Plugins

- `gatsby-theme-material-ui`
  - This provides up-to-date MUI components and theming. Some components like `Link` have been updated to work with Gatsby.
- `@sentry/gatsby`
  - Adds ability for Sentry to catch exceptions that users encounter on the site. Check the attached Sentry account for info on specific errors.
  - All Sentry packages need to be on the same version.
- `gatsby-source-contentful`
  - These parts of the site fetch data from Contentful at build time:
    - Officers
    - Area Representatives
    - Some Events
  - If the Contentful data is updated, a TMAC dev needs to re-deploy the site on Netliy for the changes to go live.
- `gatsby-plugin-emotion`
  - This allowed an easy way to switch from the old `glamor` way of using `css={{}}` passed to component props. The `glamor` plugin stopped working with Gatsby v4.
- `gatsby-plugin-typography`
  - Allows adding custom fonts
- `gatsby-plugin-canonical-urls`
  - Inserts a `link` tag in the head of each page with `rel="canonical"` added. This helps ensure that all saved pages everywhere will point to the `https` address for this site.

## Inspiration

Heavily inspired by the Gatsby v1 documentation website.

## Running in development

1. Clone this repo
1. Add `.env` file based on `example.env`. Get secret values from another TMAC dev.
2. Install dependencies → `yarn`
3. Start the development server → `yarn dev`

## Version History

- v1
  - An old WordPress site. The person in charge of it somehow deleted it completely.
  - Mike Mathew sifted through the Internet Archive to find older content to fit into the redesigned site.
- v2
  - A Gatsby site represented by this repository.
  - Gatsby v1 through v3 were built 2018-2022
  - Gatsby v4 update was November 2022
- v3 (coming soon)
  - The organization's name changed to Texas Fine Arts Administrators (TFAA) in Fall 2022.
  - A modernized Gatsby site with a fresh coat of paint from Luis Velasquez at [LV Branding](https://www.lvbranding.com/)

:musical_note: :trumpet: :saxophone:
