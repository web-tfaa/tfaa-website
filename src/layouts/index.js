// External Dependencies
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import Footer from '../components/footer';
import SidebarBody from '../components/shared/sidebar-body';
import TopNav from '../components/top-nav';
import aboutSidebar from "../pages/about/about-links.yml"
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
  width: rhythm(10),
  display: `none`,
  position: `fixed`,
  top: `calc(${presets.headerHeight} - 1px)`,
  paddingBottom: 96,
  overflowY: `auto`,
  height: `calc(100vh - ${presets.headerHeight} + 1px)`,
  WebkitOverflowScrolling: `touch`,
  "::-webkit-scrollbar": {
    width: `6px`,
    height: `6px`,
  },
  "::-webkit-scrollbar-thumb": {
    background: colors.ui.bright,
  },
  "::-webkit-scrollbar-track": {
    background: colors.ui.light,
  },
  [presets.Desktop]: {
    width: rhythm(12),
    padding: rhythm(1),
    paddingBottom: 96,
  },
};

// Component Definition
class DefaultLayout extends Component {
  render() {
    const {
      children,
      location,
    } = this.props;

    const isHomepage = location.pathname == `/`;
    const hasSidebar = !location.pathname === `/sponsors` && !isHomepage;

    return (
      <div className={isHomepage && `is-homepage`}>
        <Helmet defaultTitle={`Texas Music Administrators Conference`}>
          <meta name="twitter:site" content="@TXMusicLeaders" />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="TMAC" />
          <html lang="en" amp />
        </Helmet>
        <TopNav pathname={location.pathname} />
        <div
          className={hasSidebar ? `main-body has-sidebar` : `main-body`}
          css={{
            paddingTop: 0,
            [presets.Tablet]: {
              margin: `0 auto`,
              paddingTop: isHomepage ? 0 : presets.headerHeight,
            },
          }}
        >
          <div
            css={{
              ...sidebarStyles,
              [presets.Tablet]: {
                display:
                  location.pathname.startsWith(`/about/`)
                    ? `block`
                    : `none`,
              },
            }}
          >
            <SidebarBody yaml={aboutSidebar} />
          </div>

          <div
            css={{
              [presets.Tablet]: {
                paddingLeft: hasSidebar ? rhythm(10) : 0,
              },
              [presets.Desktop]: {
                paddingLeft: hasSidebar ? rhythm(12) : 0,
              },
            }}
          >
            {children()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DefaultLayout;
