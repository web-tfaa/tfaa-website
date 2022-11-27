// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { rhythm, scale } from '../../../utils/typography';
import Section from './Section';

// Local Typings
interface Props {
  inline?: boolean;
  yaml: SidebarData[];
}
interface SidebarData {
  title: string;
  items: SidebarDataItem[];
}
export interface SidebarDataItem {
  link: string;
  title: string;
}
interface StyledRootProps {
  $isInline?: boolean;
}

// Local Variables
const StyledRoot = styled.div<StyledRootProps>(({
  $isInline,
}) => ({
  '.sidebarSection': {
    // Use original sizes on mobile as the text is inline
    // but smaller on > tablet so as not to compete with body text.
    fontSize: $isInline
      ? scale(0).fontSize
      : scale(-2 / 10).fontSize,
  },

  padding: $isInline ? 0 : rhythm(3 / 4),
}));

// Component Definition
const SidebarBody: FC<Props> = ({
  inline: isInline,
  yaml: menu
}) => (
  <StyledRoot
    $isInline={isInline}
    className="docSearch-sidebar"
  >
    {menu.map(({ items, title }, index) => (
      <div
        className="sidebarSection"
        key={title}
      >
        <Section
          isFirstItem={index === 0}
          isInline={isInline}
          items={items}
          title={title}
        />
      </div>
    ))}
  </StyledRoot>
);

export default SidebarBody;
