// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { rhythm, scale } from '../../../utils/typography';
import { SidebarDataItem } from './SidebarBody';
import SectionLinks from './SectionLinks';

// Local Typings
interface Props {
  isFirstItem: boolean;
  isInline?: boolean;
  items: SidebarDataItem[];
  title: string;
}
interface StyledTitleProps {
  $isFirstItem: boolean;
}

// Local Variables
const StyledTitle = styled.h3<StyledTitleProps>(({
  $isFirstItem,
  theme,
}) => ({
  '&.isInline': {
    fontSize: scale(2 / 5).fontSize,
  },

  '&.root': {
    fontSize: scale(-2 / 5).fontSize,
    fontWeight: 600,
    color: theme.palette.texasFlag.blue,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
  },

  marginTop: $isFirstItem ? 0 : rhythm(3 / 2),
}));

// Component Definitions
const Section: FC<Props> = ({
  isFirstItem,
  isInline,
  items,
  title,
}) => (
  <div>
    <StyledTitle
      $isFirstItem={isFirstItem}
      className={isInline ? 'isInline' : 'root'}
    >
      {title}
    </StyledTitle>

    <SectionLinks items={items} />
  </div>
);

export default Section;
