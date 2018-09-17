// External Dependencies
import CheckIcon from 'react-icons/lib/md/check';
import ClearIcon from 'react-icons/lib/md/clear';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import FuturaDiv from '../../components/shared/futura-div';
import presets from '../../utils/presets';
import { options } from '../../utils/typography';

// Sidebar Data
import membersSidebar from './members-links.yml';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Local Variables
const futuraStyles = {
  fontFamily: options.headerFontFamily.join(`,`),
  lineHeight: '1.6',
  marginBottom: '1rem',
};

const memberFileShareCardStyles = { marginTop: '1rem' };

const taskIconStyles = {
  height: 24,
  marginRight: 8,
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
const MemberInfoDiv = ({ children }) => (
  <div
    css={{
      lineHeight: '1.6',
      marginBottom: '0.5rem',
      marginLeft: '1rem',
    }}>
    {children}
  </div>
);

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
  description: PropTypes.string.isRequired,
  node: PropTypes.shape({}).isRequired,
};

// Component Definition
class MemberContent extends Component {
  static propTypes = {
    contentfulFileShareData: PropTypes.arrayOf(PropTypes.shape({})),
    contentfulFileShareDescriptionData: PropTypes.arrayOf(PropTypes.shape({})),
    memberEmail: PropTypes.string,
    userData: PropTypes.arrayOf(PropTypes.shape({})),
    userId: PropTypes.string,
  };

  static defaultProps = {
    contentfulFileShareData: null,
    contentfulFileShareDescriptionData: null,
    userData: [],
    userId: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isInvoice: true,
      isRegistered: false,
    };
  }

  componentDidMount() {
    const {
      userData,
      userId,
    } = this.props;

    // Find if the current user is among the registerd users
    if (Object.keys(userData).includes(userId)) {
      this.handleUpdateRegisteredUser();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      userData,
      userId,
    } = this.props;

    const {
      isRegistered,
    } = this.state;

    if ((prevProps.userData.length !== userId.length) && !isRegistered) {
      // Find if the current user is among the registered users
      if (Object.keys(userData).includes(userId)) {
        this.handleUpdateRegisteredUser();

        const indexOfUser = Object.keys(userData).indexOf(userId);

        const valuesOnly = Object.values(userData);

        this.handleUpdateUserModel(valuesOnly[indexOfUser]);
      }
    }
  }

  handleUpdateRegisteredUser = () => {
    this.setState({ isRegistered: true });
  }

  handleUpdateUserModel = (data) => {
    this.setState({ currentUser: data });
  }

  handleUpdateIsInvoice = () => {
    // Update to false when a user has a Paypal record
    this.setState({ isInvoice: false });
  }

  render() {
    const {
      contentfulFileShareData,
      contentfulFileShareDescriptionData,
      memberEmail,
    } = this.props;

    const {
      currentUser,
      isInvoice,
      isRegistered,
    } = this.state;

    const registeredIcon = isRegistered
      ? <CheckIcon css={checkIconStyles} />
      : <ClearIcon css={clearIconStyles} />;

    const memberInfoCard = currentUser && (
      <Card>
        <CardHeadline>{`Info for: ${memberEmail}`}</CardHeadline>
        <div css={{ margin: '2rem 0px' }}>
          <MemberInfoDiv>
            {currentUser.FirstName} {currentUser.LastName}
          </MemberInfoDiv>
          <MemberInfoDiv>
            {currentUser.Title}, {currentUser.District}
          </MemberInfoDiv>
          <MemberInfoDiv>
            {currentUser.MemberType} member
          </MemberInfoDiv>
          <MemberInfoDiv>
            {currentUser.Address1}
          </MemberInfoDiv>
          <MemberInfoDiv>
            {currentUser.Address2}
          </MemberInfoDiv>
          <MemberInfoDiv>
            {currentUser.City}, {currentUser.State} {currentUser.ZipCode}
          </MemberInfoDiv>
          <MemberInfoDiv>
            Office Phone {currentUser.OfficePhone}
          </MemberInfoDiv>
          <MemberInfoDiv>
            Cell Phone {currentUser.CellPhone}
          </MemberInfoDiv>
        </div>
        <FuturaDiv>
          Need to update any information?<br />
          Send an email over to the <a href="mailto:jeff_turner@allenisd.org">TMAC Treasurer</a>.
        </FuturaDiv>
      </Card>
    );

    const memberTaskCard = (
      <Card>
        <CardHeadline>{`Tasks for: ${memberEmail}`}</CardHeadline>
        <FuturaDiv>
          {registeredIcon}
          Registered for 2018-2019 school year
        </FuturaDiv>
        {isInvoice && <FuturaDiv>
          If you need to pay via invoice please send{' '}
          payment to the TMAC Treasurer as indicated on your invoice.
        </FuturaDiv>}
      </Card>
    );

    return (
      <div>
        <h2>Member Dashboard</h2>
        <Cards>
          {memberInfoCard}

          {memberTaskCard}
        </Cards>

        <h2>For Members</h2>

        <Cards>
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
  }
}

export default MemberContent;
