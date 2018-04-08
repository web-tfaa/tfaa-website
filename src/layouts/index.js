// External Dependencies
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import Footer from '../components/footer';
import TopNav from '../components/nav/top-nav';
import SidebarBody from '../components/shared/sidebar/sidebar-body';
import MobileNav from '../components/nav/mobile-nav';

// Sidebar data
import aboutSidebar from '../pages/about/about-links.yml';
import membersSidebar from '../pages/members/members-links.yml';
import resourcesSidebar from '../pages/resources/resources-links.yml';

// Helpers
import { rhythm, scale } from '../utils/typography';
import presets, { colors } from '../utils/presets';

// from Gatsby www project
import '../css/prism-coy.css';

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
  borderRight: `1px solid ${colors.ui.light}`,
  backgroundColor: colors.ui.whisper,
  boxShadow: `inset 0 4px 5px 0 ${hex2rgba(
    colors.gatsby,
    presets.shadowKeyPenumbraOpacity
  )}, inset 0 1px 10px 0 ${hex2rgba(
    colors.lilac,
    presets.shadowAmbientShadowOpacity
  )}, inset 0 2px 4px -1px ${hex2rgba(
    colors.lilac,
    presets.shadowKeyUmbraOpacity
  )}`,
  display: `none`,
  height: `calc(100vh - ${presets.headerHeight} + 1px)`,
  overflowY: `auto`,
  position: `fixed`,
  top: `calc(${presets.headerHeight} - 1px)`,
  width: rhythm(10),
  paddingBottom: rhythm(3.5),
  WebkitOverflowScrolling: `touch`,
  "::-webkit-scrollbar": {
    height: `6px`,
    width: `6px`,
  },
  "::-webkit-scrollbar-thumb": {
    background: colors.ui.bright,
  },
  "::-webkit-scrollbar-track": {
    background: colors.ui.light,
  },
  [presets.Desktop]: {
    padding: rhythm(1),
    paddingBottom: rhythm(3.5),
    width: rhythm(12),
  },
}

// Component Definition
class DefaultLayout extends Component {
  render() {
    const {
      children,
      location,
      // user,
    } = this.props;

    const path = location.pathname;

    // const isAuthenticated = Boolean(user);
    const isAuthenticated = false;

    const isHome = path == `/`;
    const isSponsors = path.slice(0, 9) === '/sponsors';
    const isAbout = path.slice(0, 6) === '/about';
    const isResources = path.slice(0, 10) === '/resources';
    const isMembers = path.slice(0, 8) === '/members';


    const hasSidebar =
      isAbout ||
      isResources ||
      isMembers;

    const leftPadding = (rhythmSize) =>
      hasSidebar
        ? rhythm(rhythmSize)
        : 0;

    return (
      <div
        className={isHome ? 'is-homepage' : ''}
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Helmet defaultTitle={`Texas Music Administrators Conference`}>
          <meta name="twitter:site" content="@TXMusicLeaders" />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="TMAC" />
          <html lang="en" amp />
        </Helmet>
        <TopNav pathname={path} />
        <div
          className={hasSidebar ? `main-body has-sidebar` : `main-body`}
          css={{
            display: 'flex',
            flex: 1,
            paddingTop: 0,
            minHeight: `calc(100vh - 4rem)`,
            [presets.Tablet]: {
              margin: isSponsors ? `0 auto` : '',
              paddingTop: isHome ? 0 : presets.headerHeight,
            },
            [presets.Desktop]: {
              minHeight: `calc(100vh - 4rem)`,
            },
          }}
        >

          {/* TODO Move this under about/index.js once Gatsby supports
            multiple levels of layouts */}
          <div
            css={{
              ...sidebarStyles,
              [presets.Tablet]: {
                display:
                  path.slice(0, 6) === `/about`
                    ? `block`
                    : `none`,
              },
            }}
          >
            <SidebarBody yaml={aboutSidebar} />
          </div>

          {/* TODO Move this under resources/index.js once Gatsby supports
            multiple levels of layouts */}
          <div
            css={{
              ...sidebarStyles,
              [presets.Tablet]: {
                display:
                  path.slice(0, 10) === `/resources`
                    ? `block`
                    : `none`,
              },
            }}
          >
            <SidebarBody yaml={resourcesSidebar} />
          </div>

          {/* TODO Move this under members/index.js once Gatsby supports
            multiple levels of layouts */}
          {isAuthenticated &&
            <div
              css={{
                ...sidebarStyles,
                [presets.Tablet]: {
                  display:
                    path.slice(0, 8) === `/members`
                      ? `block`
                      : `none`,
                },
              }}
            >
              <SidebarBody yaml={membersSidebar} />
            </div>
          }

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
            {children()}
          </div>
        </div>
        <MobileNav />
        <Footer />
      </div>
    );
  }
}

export default DefaultLayout;
