// External Dependencies
import React from 'react';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
// import FuturaParagraph from '../../components/shared/futura-paragraph';
import presets from '../../utils/presets';
import { options } from '../../utils/typography';

// Sidebar Data
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import membersSidebar from './members-links.yml';


// Local Components
const MemberCard = ({ node }) => {
  console.log('inside MemberPost', node);
  return (
    <Card>
      <CardHeadline>{node.title}</CardHeadline>
      <h5 css={{ marginTop: '1rem' }}>{node.createdAt}</h5>
      <FuturaDiv>{node.slug}</FuturaDiv>
    </Card>
  )
}

const FuturaDiv = ({ children }) => (
  <div
    css={{
      fontFamily: options.headerFontFamily.join(`,`),
      lineHeight: '1.6',
    }}
  >
    {children}
  </div>
);

// Component Definition
export default (props) => {
  console.log('props.contentfulData', props.contentfulData);
  return (
    <div>
      <Cards>
        {props.contentfulData.map((edge) => (
          <MemberCard
            key={edge.node.id}
            node={edge.node}
          />
        ))}
      </Cards>

      <div
        css={{
          display: `block`,
          [presets.Tablet]: {
            display: `none`,
          },
        }}
      >
        <hr css={{
          border: 0,
          height: 2,
          marginTop: 10,
        }} />
        <SidebarBody inline yaml={membersSidebar} />
      </div>
    </div>
  );
};
