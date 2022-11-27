// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { options } from '../../../utils/typography';
import { SidebarDataItem } from './SidebarBody';
import SectionLink from './SectionLink';

// Local Typings
interface Props {
  items: SidebarDataItem[];
}

// Local Variables
const StyledList = styled.ul(() => {
  const listStyles = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontFamily: options.headerFontFamily.join(','),
  };

  return {
    ...listStyles,
    '& ul': {
      ...listStyles,
    },
  };
});

// Component Definitions
const SectionLinks: FC<Props> = ({ items }) => (
  <StyledList>
    {items.map((item) => (
      <SectionLink
        key={item.title}
        node={item}
      />
    ))}
  </StyledList>
);

export default SectionLinks;
