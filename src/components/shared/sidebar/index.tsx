// External Dependencies
import React, { FC } from 'react';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import SidebarBody from './SidebarBody';
import presets, { colors } from '../../../utils/presets';
import { rhythm } from '../../../utils/typography';

// Local Typings
interface Props {
  sidebarYaml: any;
}

// Local Variables
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
const Sidebar: FC<Props> = ({ sidebarYaml }) => {
  console.log('sidebarYaml', sidebarYaml);

  return (
    <div css={{ ...sidebarStyles }}>
      <SidebarBody yaml={sidebarYaml} />
    </div>
  );
};

export default Sidebar;
