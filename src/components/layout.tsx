// External Dependencies
import { Helmet } from 'react-helmet';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import React, { FC, ReactElement } from 'react';
import clsx from 'clsx';

// Internal Dependencies
import { appName, appNameShort } from '../utils/app-constants';
import Footer from './footer';
import TopNav from './nav/top-nav';
import withAuthentication from './session/withAuthentication';
import theme from '../gatsby-theme-material-ui-top-layout/theme';

// Helpers
import presets from '../utils/presets';

// Import global styles, including custom fonts
import '../../styles/global.css';

// Other fonts
import 'typeface-spectral';
import 'typeface-space-mono';

// Local Typings
interface Props {
  children: ReactElement;
  isAuthenticated: boolean;
  location: Location;
  pageTitle?: string;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.main-body': {
    [presets.Desktop]: {
      minHeight: 'calc(100vh - 5rem)',
    },
    [theme.breakpoints.down('lg')]: {
      margin: 'inherit',
    },
    display: 'flex',
    flex: 1,
    paddingTop: 0,
    minHeight: 'calc(100vh - 5rem)',
  },

  '.main-content': {
    [theme.breakpoints.up('mobile')]: {
      paddingLeft: 0,
    },
    [presets.Desktop]: {
      paddingLeft: 0,
      paddingRight: theme.spacing(3),
    },
    width: '100vw',
  },

  '.sponsors': {
    [theme.breakpoints.up('mobile')]: {
      margin: '0 auto',
    },
    backgroundColor: theme.palette.altBackground,
  },

  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
}));

// Component Definition
const DefaultLayout: FC<Props> = ({
  children,
  location: {
    pathname,
  },
  pageTitle,
}) => {
  return (
    <StyledComponentsThemeProvider theme={theme}>
      <Helmet defaultTitle={appName}>
        <meta
          name="twitter:site"
          content="@TXMusicLeaders"
        />
        <meta
          name="og:type"
          content="website"
        />
        <meta
          name="og:site_name"
          content={appName}
        />
        <html lang="en" />
        {pageTitle && <title>{appNameShort} | {pageTitle}</title>}
      </Helmet>

      <StyledRoot>
        <TopNav pathname={pathname} />

        <div
          className={
            clsx(
              'main-body',
            )
          }
        >
          <main className="main-content">
            {children}
          </main>
        </div>

        <Footer />
      </StyledRoot>
    </StyledComponentsThemeProvider>
  );
};

export default withAuthentication(DefaultLayout);
