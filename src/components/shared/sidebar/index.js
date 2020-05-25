// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import SidebarBody from './sidebar-body';
import presets, { colors } from '../../../utils/presets';
import { rhythm } from '../../../utils/typography';

// Local Variables
const propTypes = {
  sidebarYaml: PropTypes.shape().isRequired,
};

const sidebarStyles = {
  borderRight: `1px solid ${colors.ui.light}`,
  backgroundColor: colors.ui.whisper,
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
  width: rhythm(10),
  display: 'none',
  position: 'fixed',
  top: `calc(${presets.headerHeight} - 1px)`,
  paddingBottom: 96,
  overflowY: 'auto',
  height: `calc(100vh - ${presets.headerHeight} + 1px)`,
  WebkitOverflowScrolling: 'touch',
  '::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '::-webkit-scrollbar-thumb': {
    background: colors.ui.bright,
  },
  '::-webkit-scrollbar-track': {
    background: colors.ui.light,
  },
  [presets.Desktop]: {
    width: rhythm(12),
    padding: rhythm(1),
    paddingBottom: 96,
  },
  [presets.Tablet]: {
    display: 'block',
  },
};

// Component Definition
const Sidebar = (props) => {
  const { sidebarYaml } = props;

  return (
    <div css={{ ...sidebarStyles }}>
      <SidebarBody yaml={sidebarYaml} />
    </div>
  );
};

Sidebar.propTypes = propTypes;
export default Sidebar;
