// External Dependencies
import format from 'date-fns/format';
import PropTypes from 'prop-types';
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

// Local Variables
const propTypes = {
  contentfulFileShareData: PropTypes.array,
  contentfulFileShareDescriptionData: PropTypes.array,
};

const defaultProps = {
  contentfulFileShareData: null,
  contentfulFileShareDescriptionData: null,
}

const futuraStyles = {
  fontFamily: options.headerFontFamily.join(`,`),
  lineHeight: '1.6',
  marginBottom: '1rem',
};

// Local Components
const FuturaDiv = ({ children }) => (
  <div css={futuraStyles}>
    {children}
  </div>
);

const FuturaAnchor = ({ children, href }) => (
  <a href={href} css={futuraStyles}>
    {children}
  </a>
);

const MemberFileShareCard = ({ node, description }) => {
  console.log('node in MemberFileShareCard', node);
  return (
    <Card>
      <CardHeadline>{node.title}</CardHeadline>
      <h5 css={{ marginTop: '1rem' }}>{format(node.date, ['MMMM DD YYYY'])}</h5>
      <FuturaDiv>{description}</FuturaDiv>
      <FuturaAnchor download href={node.link}>Download</FuturaAnchor>
    </Card>
  );
};

// Component Definition
const MemberContent = (props) => {
  const {
    contentfulFileShareData,
    contentfulFileShareDescriptionData,
  } = props;

  // console.log('contentfulFileShareData', contentfulFileShareData);
  console.log('contentfulFileShareDescriptionData', contentfulFileShareDescriptionData);

  return (
    <div>
      <Cards>
        {contentfulFileShareData && contentfulFileShareData.map((edge, index) => (
          <MemberFileShareCard
            key={edge.node.id}
            node={edge.node}
            description={contentfulFileShareDescriptionData
              ? contentfulFileShareDescriptionData[index].node.description
              : null}
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

MemberContent.propTypes = propTypes;
export default MemberContent;
