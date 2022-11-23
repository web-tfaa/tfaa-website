// External Dependencies
import { Helmet } from 'react-helmet';
import { FC, ReactElement } from 'react';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import clsx from 'clsx';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import AuthUserContext from './session/AuthUserContext';
import Footer from './footer';
import MobileNav from './nav/mobile-nav';
import SidebarBody from './shared/sidebar/SidebarBody';
import TopNav from './nav/top-nav';
import withAuthentication from './session/withAuthentication';
import theme from '../gatsby-theme-material-ui-top-layout/theme';

// Sidebar data
import aboutSidebar from '../pages/about/about-links.yml';
import eventsSidebar from '../pages/events/events-links.yml';
import membersSidebar from '../pages/members/members-links.yml';
import resourcesSidebar from '../pages/resources/resources-links.yml';

// Helpers
import { rhythm } from '../utils/typography';
import presets, { colors } from '../utils/presets';

// Import Futura PT typeface
import '../fonts/Webfonts/futurapt_book_macroman/stylesheet.css';
import '../fonts/Webfonts/futurapt_bookitalic_macroman/stylesheet.css';
import '../fonts/Webfonts/futurapt_demi_macroman/stylesheet.css';
import '../fonts/Webfonts/futurapt_demiitalic_macroman/stylesheet.css';

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
    [presets.Tablet]: {
      paddingTop: 0,
    },
  },
  '.main-body': {
    [presets.Desktop]: {
      minHeight: 'calc(100vh - 4rem)',
    },
    [presets.Tablet]: {
      margin: 'inherit',
      paddingTop: presets.headerHeight,
    },
    display: 'flex',
    flex: 1,
    paddingTop: 0,
    minHeight: 'calc(100vh - 4rem)',
  },

  '.main-content': {
    [presets.Tablet]: {
      paddingLeft: $hasSidebar ? theme.spacing(25) : 0,
    },
    [presets.Desktop]: {
      paddingLeft: $hasSidebar ? theme.spacing(31.5) : 0,
    },
  },

  '.sidebar': {
    [presets.Desktop]: {
      padding: rhythm(1),
      paddingBottom: rhythm(3.5),
      width: rhythm(10),
    },
    backgroundColor: theme.palette.ui.whisper,
    borderRight: `1px solid ${theme.palette.ui.light}`,
    boxShadow: `inset 0 4px 5px 0 ${hex2rgba(
      colors.gatsby,
      presets.shadowKeyPenumbraOpacity,
    )}, inset 0 1px 10px 0 ${hex2rgba(
      colors.lilac,
      presets.shadowAmbientShadowOpacity,
    )}, inset 0 2px 4px -1px ${hex2rgba(
      colors.lilac,
      presets.shadowKeyUmbraOpacity,
    )}`,
    display: 'none',
    height: `calc(100vh - ${presets.headerHeight} + 1px)`,
    overflowY: 'auto',
    paddingBottom: rhythm(3.5),
    position: 'fixed',
    top: `calc(${presets.headerHeight} - 1px)`,
    width: rhythm(8),
    WebkitOverflowScrolling: 'touch',
    '::-webkit-scrollbar': {
      height: '6px',
      width: '6px',
    },
    '::-webkit-scrollbar-thumb': {
      background: colors.ui.bright,
    },
    '::-webkit-scrollbar-track': {
      background: colors.ui.light,
    },
  },

  '.sidebar.show-sidebar': {
    [presets.Tablet]: {
      display: 'block',
    },
  },

  '.sponsors': {
    [presets.Tablet]: {
      margin: '0 auto',
    },
    backgroundColor: theme.palette.altBackground,
  },

  display: 'flex',
  flexDirection: 'column',
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
  const isSponsors = path.slice(0, 9) === '/sponsors';
  const isAbout = path.slice(0, 6) === '/about';
  const isEvents = path.slice(0, 7) === '/events';
  const isResources = path.slice(0, 10) === '/resources';
  const isMembers = path.slice(0, 8) === '/members';

  const hasSidebar = isAbout || isEvents || isResources
    || (isAuthenticated && isMembers);

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <StyledRoot
        $hasSidebar={hasSidebar}
        className={isHome ? 'is-homepage' : ''}
      >
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

        <TopNav />

        <div
          className={
            clsx(
              'main-body',
              hasSidebar ? 'has-sidebar' : '',
              isSponsors ? 'sponsors' : '',
              isHome ? 'hide-header' : '',
            )
          }
        >
          {/* TODO Move this under about/index.js once Gatsby supports
            multiple levels of layouts */}
          <div
            className={clsx('sidebar', isAbout ? 'show-sidebar' : '')}
          >
            <SidebarBody yaml={aboutSidebar} />
          </div>

          {/* TODO Move this under events/index.js once Gatsby supports
            multiple levels of layouts */}
          <div
            className={clsx('sidebar', isEvents ? 'show-sidebar' : '')}
          >
            <SidebarBody yaml={eventsSidebar} />
          </div>

          {/* TODO Move this under resources/index.js once Gatsby supports
            multiple levels of layouts */}
          <div
            className={clsx('sidebar', isResources ? 'show-sidebar' : '')}
          >
            <SidebarBody yaml={resourcesSidebar} />
          </div>

          {/* TODO Move this under members/index.js once Gatsby supports
            multiple levels of layouts */}
          {isAuthenticated && (
            <div
              className={clsx('sidebar', isMembers ? 'show-sidebar' : '')}
            >
              <SidebarBody yaml={membersSidebar} />
            </div>
          )}

          {/* Main container */}
          <main className="main-content">
            {children}
          </main>
        </div>

        <MobileNav />

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
