// External Dependencies
import { Helmet } from 'react-helmet';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import React, { FC, ReactElement } from 'react';
import clsx from 'clsx';

// Internal Dependencies
import AuthUserContext from './session/AuthUserContext';
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
interface StyledRootProps {
  $hasSidebar: boolean;
}

// Local Variables
const StyledRoot = styled.div<StyledRootProps>(({
  $hasSidebar,
  theme,
}) => ({
  '.hide-header': {
    [theme.breakpoints.up('mobile')]: {
      paddingTop: 0,
    },
  },
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
      paddingLeft: $hasSidebar ? theme.spacing(25) : 0,
    },
    [presets.Desktop]: {
      paddingLeft: $hasSidebar ? theme.spacing(38) : 0,
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
  isAuthenticated,
  location: {
    pathname: path,
  },
  pageTitle,
}) => {
  const isHome = path === '/';
  // const isSponsors = path.slice(0, 9) === '/sponsors';
  const isAbout = path.slice(0, 6) === '/about';
  const isEvents = path.slice(0, 7) === '/events';
  const isResources = path.slice(0, 10) === '/resources';
  const isMembers = path.slice(0, 8) === '/members';

  const hasSidebar = isAbout || isEvents || isResources
    || (isAuthenticated && isMembers);

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <Helmet defaultTitle="Texas Music Administrators Conference">
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
          content="TMAC"
        />
        <html lang="en" />
        {pageTitle && <title>TMAC | {pageTitle}</title>}
      </Helmet>

      <StyledRoot
        $hasSidebar={hasSidebar}
        className={isHome ? 'is-homepage' : ''}
      >
        <TopNav />

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

const DefaultLayoutWithContext = (props: unknown) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <DefaultLayout
        {...props}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default withAuthentication(DefaultLayoutWithContext);
