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
import FuturaDiv from '../../components/shared/futura-div';
import presets from '../../utils/presets';
import { options } from '../../utils/typography';

// Sidebar Data
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import membersSidebar from './members-links.yml';

// Local Variables
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
const FuturaAnchor = ({ children, href }) => (
  <a href={href} css={futuraStyles}>
    {children}
  </a>
);
FuturaAnchor.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};;

const MemberFileShareCard = ({ node, description }) => {
  return (
    <Card>
      <CardHeadline>{node.title}</CardHeadline>
      <h5 css={memberFileShareCardStyles}>
        {format(node.date, ['MMMM DD YYYY'])}
      </h5>
      <FuturaDiv>{description}</FuturaDiv>
      <FuturaAnchor download href={node.link}>
        Download
      </FuturaAnchor>
    </Card>
  );
};
MemberFileShareCard.propTypes = {
  node: PropTypes.shape({}).isRequired,
  description: PropTypes.string.isRequired,
};

// Component Definition
const MemberContent = props => {
  const {
    contentfulFileShareData,
    contentfulFileShareDescriptionData,
    memberEmail,
  } = props;

  const memberTaskCard = (
    <Card>
      <CardHeadline>{`Tasks for ${memberEmail}`}</CardHeadline>
      <FuturaDiv>
        <CheckIcon css={checkIconStyles} />
        Registered for 2018-2019 school year
      </FuturaDiv>
      <FuturaDiv>
        <ClearIcon css={clearIconStyles} />
        Paid 2018-2019 membership dues
      </FuturaDiv>
    </Card>
  );

  return (
    <div>
      <h1>Member Dashboard</h1>
      <Cards>

        {memberTaskCard}

        {contentfulFileShareData &&
          contentfulFileShareData.map((edge, index) => (
            <MemberFileShareCard
              key={edge.node.id}
              node={edge.node}
              description={
                contentfulFileShareDescriptionData
                  ? contentfulFileShareDescriptionData[index].node.description
                  : null
              }
            />
          ))}
      </Cards>

      <div
        css={{
          display: `block`,
          [presets.Tablet]: {
            display: `none`,
          },
        }}>
        <hr
          css={{
            border: 0,
            height: 2,
            marginTop: 10,
          }}
        />
        <SidebarBody inline yaml={membersSidebar} />
      </div>
    </div>
  );
};

MemberContent.propTypes = {
  contentfulFileShareData: PropTypes.arrayOf(PropTypes.shape({})),
  contentfulFileShareDescriptionData: PropTypes.arrayOf(PropTypes.shape({})),
  memberEmail: PropTypes.string,
};;
MemberContent.defaultProps = {
  contentfulFileShareData: null,
  contentfulFileShareDescriptionData: null,
};;

export default MemberContent;
