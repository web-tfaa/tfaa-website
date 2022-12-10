// External Dependencies
import React, { FC } from 'react';
import hex2rgba from 'hex2rgba';
import styled from 'styled-components';

// Internal Dependencies
import SidebarBody from './SidebarBody';
import presets from '../../../utils/presets';
import { rhythm } from '../../../utils/typography';

// Local Typings
interface Props {
  sidebarYaml: unknown;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.ui.bright,
  },
  '::-webkit-scrollbar-track': {
    background: theme.palette.ui.light,
  },
  [presets.Desktop]: {
    width: rhythm(12),
    padding: rhythm(1),
    paddingBottom: 96,
  },
  [theme.breakpoints.up('mobile')]: {
    display: 'block',
  },

  borderRight: `1px solid ${theme.palette.ui.light}`,
  backgroundColor: theme.palette.ui.whisper,
  boxShadow: `inset 0 4px 5px 0 ${hex2rgba(
    theme.palette.gatsby,
    presets.shadowKeyPenumbraOpacity,
  )}, inset 0 1px 10px 0 ${hex2rgba(
    theme.palette.lilac,
    presets.shadowAmbientShadowOpacity,
  )}, inset 0 2px 4px -1px ${hex2rgba(
    theme.palette.lilac,
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
}));

// Component Definition
const Sidebar: FC<Props> = ({ sidebarYaml }) => (
  <StyledRoot>
    <SidebarBody yaml={sidebarYaml} />
  </StyledRoot>
);

export default Sidebar;
