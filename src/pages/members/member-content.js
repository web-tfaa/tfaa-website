// External Dependencies
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import React from 'react';
import CheckIcon from 'react-icons/lib/md/check';
import ClearIcon from 'react-icons/lib/md/clear';

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
  memberEmail: PropTypes.string,
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

const memberFileShareCardStyles = { marginTop: '1rem' };

const taskIconStyles = {
  marginRight: 8,
  height: 24,
  width: 24,
};

const checkIconStyles = {
  ...taskIconStyles,
  color: 'green',
};

const clearIconStyles = {
  ...taskIconStyles,
  color: 'red',
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
  return (
    <Card>
      <CardHeadline>{node.title}</CardHeadline>
      <h5 css={memberFileShareCardStyles}>{format(node.date, ['MMMM DD YYYY'])}</h5>
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
    memberEmail,
  } = props;

  return (
    <div>
      <h1>Membership Dashboard</h1>
      <Cards>
        <Card>
          <CardHeadline>Tasks for {memberEmail}</CardHeadline>
          <FuturaDiv><CheckIcon css={checkIconStyles} />Registered for 2018-2019 school year</FuturaDiv>
          <FuturaDiv><ClearIcon css={clearIconStyles} />Paid 2018-2019 membership dues</FuturaDiv>
        </Card>
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
