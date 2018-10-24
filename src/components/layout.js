// External Dependencies
import Helmet from 'react-helmet';
import hex2rgba from 'hex2rgba';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import AuthUserContext from './session/AuthUserContext';
import Footer from './footer';
import MobileNav from './nav/mobile-nav';
import SidebarBody from './shared/sidebar/sidebar-body';
import TopNav from './nav/top-nav';
import withAuthentication from './session/withAuthentication';

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

// Local Variables
const sidebarStyles = {
  backgroundColor: colors.ui.whisper,
  borderRight: `1px solid ${colors.ui.light}`,
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
  width: rhythm(10),
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
  [presets.Desktop]: {
    padding: rhythm(1),
    paddingBottom: rhythm(3.5),
    width: rhythm(12),
  },
};

// Component Definition
const DefaultLayout = (props) => {
  const {
    children,
    isAuthenticated,
    location: {
      pathname: path,
    },
  } = props;

  const isHome = path === '/';
  const isSponsors = path.slice(0, 9) === '/sponsors';
  const isAbout = path.slice(0, 6) === '/about';
  const isEvents = path.slice(0, 7) === '/events';
  const isResources = path.slice(0, 10) === '/resources';
  const isMembers = path.slice(0, 8) === '/members';

  const hasSidebar = isAbout || isEvents || isResources
    || (isAuthenticated && isMembers);

  const leftPadding = rhythmSize => (hasSidebar ? rhythm(rhythmSize) : 0);

  return (
    <div
      className={isHome ? 'is-homepage' : ''}
      css={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Helmet defaultTitle="Texas Music Administrators Conference">
        <meta name="twitter:site" content="@TXMusicLeaders" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="TMAC" />
        <html lang="en" amp />
      </Helmet>
      <TopNav />
      <div
        className={hasSidebar ? 'main-body has-sidebar' : 'main-body'}
        css={{
          backgroundColor: isSponsors && '#f5f5f5',
          display: 'flex',
          flex: 1,
          paddingTop: 0,
          minHeight: 'calc(100vh - 4rem)',
          [presets.Tablet]: {
            margin: isSponsors ? '0 auto' : '',
            paddingTop: isHome ? 0 : presets.headerHeight,
          },
          [presets.Desktop]: {
            minHeight: 'calc(100vh - 4rem)',
          },
        }}
      >
        {/* TODO Move this under about/index.js once Gatsby supports
          multiple levels of layouts */}
        <div
          css={{
            ...sidebarStyles,
            [presets.Tablet]: {
              display: path.slice(0, 6) === '/about' ? 'block' : 'none',
            },
          }}
        >
          <SidebarBody yaml={aboutSidebar} />
        </div>

        {/* TODO Move this under events/index.js once Gatsby supports
          multiple levels of layouts */}
        <div
          css={{
            ...sidebarStyles,
            [presets.Tablet]: {
              display: path.slice(0, 7) === '/events' ? 'block' : 'none',
            },
          }}
        >
          <SidebarBody yaml={eventsSidebar} />
        </div>

        {/* TODO Move this under resources/index.js once Gatsby supports
          multiple levels of layouts */}
        <div
          css={{
            ...sidebarStyles,
            [presets.Tablet]: {
              display: path.slice(0, 10) === '/resources' ? 'block' : 'none',
            },
          }}
        >
          <SidebarBody yaml={resourcesSidebar} />
        </div>

        {/* TODO Move this under members/index.js once Gatsby supports
          multiple levels of layouts */}
        {isAuthenticated && (
          <div
            css={{
              ...sidebarStyles,
              [presets.Tablet]: {
                display: path.slice(0, 8) === '/members' ? 'block' : 'none',
              },
            }}
          >
            <SidebarBody yaml={membersSidebar} />
          </div>
        )}

        {/* Main container */}
        <div
          css={{
            [presets.Tablet]: {
              paddingLeft: leftPadding(10),
            },
            [presets.Desktop]: {
              paddingLeft: leftPadding(12),
            },
          }}
        >
          {children}
        </div>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
};
DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const DefaultLayoutWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <DefaultLayout {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default withAuthentication(DefaultLayoutWithContext);
