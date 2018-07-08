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
const MemberCard = ({ node }) => (
    <Card>
      <CardHeadline>{node.title}</CardHeadline>
      <h5 css={{ marginTop: '1rem' }}>{node.createdAt}</h5>
      <FuturaDiv>{node.slug}</FuturaDiv>
    </Card>
  );

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
  console.log('props.contentfulData', props);
  return (
    <div>
      <Cards>
        {props.contentfulData.map((edge) => (
          <MemberCard
            key={edge.node.id}
            node={edge.node}
          />
        ))}
        <iframe
          src="//assets.ctfassets.net/tmlg83z9siae/5AKfRZXnuosqqI2WqsCcwi/b969e84c1d2b3d6dd3e91934b952b275/2018_TMAC_Survey_FINAL.xlsx"
          title="TMAC file"
          width="200"
          height="200"
          referrerpolicy="origin"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
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
