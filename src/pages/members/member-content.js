// External Dependencies
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import format from 'date-fns/format';
import {
  green,
  red,
} from '@material-ui/core/colors';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import CtaButton from '../../components/masthead/cta-button';
import FuturaDiv from '../../components/shared/futura-div';
import Invoice from '../../components/register/invoice';
import RegisterButton from '../../components/register/register-button';
import presets from '../../utils/presets';
import { options } from '../../utils/typography';
import { currentSchoolYearLong } from '../../utils/helpers';

// Sidebar Data
import membersSidebar from './members-links.yml';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Local Variables
const futuraStyles = {
  fontFamily: options.headerFontFamily.join(','),
  lineHeight: '1.6',
  marginBottom: '1rem',
};

const memberFileShareCardStyles = { marginTop: '1rem' };

// const taskIconStyles = {
//   height: 24,
//   marginRight: 8,
//   width: 24,
// };

// const checkIconStyles = {
//   ...taskIconStyles,
//   color: 'green',
// };

// const clearIconStyles = {
//   ...taskIconStyles,
//   color: 'red',
// };

// Local Components
const MemberInfoDiv = ({ children }) => (
  <div
    css={{
      lineHeight: '1.6',
      marginBottom: '0.4rem',
      marginLeft: '1.1rem',
    }}
  >
    {children}
  </div>
);
MemberInfoDiv.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

const FuturaAnchor = ({ children, href }) => (
  <a href={href} css={futuraStyles}>
    {children}
  </a>
);
FuturaAnchor.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

const MemberFileShareCard = ({ node, description }) => {
  return (
    <Card>
      <CardHeadline>{node.title}</CardHeadline>
      <h5 css={memberFileShareCardStyles}>
        {format(node.date, ['MMMM DD YYYY'])}
      </h5>
      <FuturaDiv>
        {description}
      </FuturaDiv>
      <FuturaAnchor download href={node.link}>
        Download
      </FuturaAnchor>
    </Card>
  );
};
MemberFileShareCard.propTypes = {
  description: PropTypes.string.isRequired,
  node: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.shape({}),
    link: PropTypes.string,
  }).isRequired,
};

// Component Definition
class MemberContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
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

        this.handleUpdateUser(valuesOnly[indexOfUser]);
      }
    }
  }

  handleUpdateRegisteredUser = () => {
    this.setState({ isRegistered: true });
  }

  handleUpdateUser = (data) => {
    this.setState({ currentUser: data });
  }

  render() {
    const {
      authUser,
      // contentfulFileShareData,
      // contentfulFileShareDescriptionData,
      memberEmail,
    } = this.props;

    const {
      currentUser,
      isRegistered,
    } = this.state;

    const registeredIcon = isRegistered
      ? <CheckIcon htmlColor={green[700]} />
      : <AnnouncementIcon htmlColor={red[500]} />;

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
            {currentUser.MemberType || 'Active'} member
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
            Office Phone: {currentUser.OfficePhone}
          </MemberInfoDiv>
          <MemberInfoDiv>
            Cell Phone: {currentUser.CellPhone}
          </MemberInfoDiv>
        </div>
        <FuturaDiv>
          <h5>Need to update any information?</h5>
          <span
            css={{
              marginLeft: '1.1rem',
            }}
          >
            Email the <a href="mailto:jeff_turner@allenisd.org">TMAC Executive Secretary</a>.
          </span>
        </FuturaDiv>
      </Card>
    );

    const invoiceInfo = currentUser && (
      <FuturaDiv>
        <h5>Need a copy of your invoice?</h5>
        If you need to pay via invoice please send payment to the TMAC Treasurer as indicated on
        your invoice.
        <div css={{ marginTop: 16 }}>
          <ReactToPrint
            content={() => this.printInvoice}
            trigger={() => <RegisterButton isRed>Print Invoice</RegisterButton>}
          />
        </div>
        <div css={{ display: 'none' }}>
          <Invoice
            amount={currentUser.AmountPaid}
            form={currentUser}
            invoiceId={currentUser.invoiceId}
            isActive={currentUser.MemberType === 'Active'}
            isInvoice
            ref={(el) => {
              this.printInvoice = el;
            }}
          />
        </div>
      </FuturaDiv>
    );

    const receiptInfo = currentUser && (
      <FuturaDiv>
        <h5>Need a copy of your receipt?</h5>
        Thank you for joining TMAC for the {currentSchoolYearLong} school year!
        <div css={{ marginTop: 16 }}>
          <ReactToPrint
            content={() => this.printReceipt}
            trigger={() => <RegisterButton isRed>Print Receipt</RegisterButton>}
          />
        </div>
        <div css={{ display: 'none' }}>
          <Invoice
            amount={currentUser.AmountPaid}
            form={currentUser}
            isActive={currentUser.MemberType === 'Active'}
            isInvoice={false}
            receiptId={currentUser.receiptId}
            ref={(el) => {
              this.printReceipt = el;
            }}
          />
        </div>
      </FuturaDiv>
    );

    const isInvoiced = currentUser
      && currentUser.PaymentOption.toLowerCase() === 'invoiced';

    const isPaypal = currentUser
      && currentUser.PaymentOption.toLowerCase() === 'paypal';

    const memberTaskCard = (
      <Card>
        <CardHeadline>{`Tasks for: ${memberEmail}`}</CardHeadline>
        <FuturaDiv
          render={() => (
            <div>
              {registeredIcon}
              Register for {currentSchoolYearLong} school year
            </div>
          )}
        />
        {!isRegistered && <CtaButton to="/members/join">Join TMAC</CtaButton>}
        {isInvoiced && invoiceInfo}
        {isPaypal && receiptInfo}
        {isRegistered && (
          <>
            <FuturaDiv>
              If your district requires the IRS W-9 Form for TMAC, download or print a copy below.
            </FuturaDiv>
            <FuturaAnchor
              download
              target="_blank"
              rel="noopener noreferrer"
              href="https://res.cloudinary.com/tmac/image/upload/v1589767111/W-9__TMAC_Inc.pdf"
            >
              Download W-9
            </FuturaAnchor>
          </>
        )}
      </Card>
    );

    const isAdmin = authUser && [
      'jon.lester@abileneisd.org',
      'jim.egger@mcallenisd.net',
      'jclark@springisd.org',
      'patricia.h.moreno@austinisd.org',
      'jeffrey.turner@allenisd.org',
      'm2mathew@me.com',
      'mike@drumsensei.com',
    ].includes(authUser.email);

    return (
      <div>
        <h2>{`${isAdmin ? 'Admin ' : ''}Member Dashboard`}</h2>
        <Cards>
          {memberInfoCard}
          {memberTaskCard}
        </Cards>

        {/* <h2>For Members</h2>

        <Cards>
          {contentfulFileShareData
            && contentfulFileShareData.map((edge, index) => (
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
        </Cards> */}

        <div
          css={{
            display: 'block',
            [presets.Tablet]: {
              display: 'none',
            },
          }}
        >
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

MemberContent.propTypes = {
  authUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  // contentfulFileShareData: PropTypes.arrayOf(PropTypes.shape({})),
  // contentfulFileShareDescriptionData: PropTypes.arrayOf(PropTypes.shape({})),
  memberEmail: PropTypes.string,
  userData: PropTypes.arrayOf(PropTypes.shape({})),
  userId: PropTypes.string,
};

MemberContent.defaultProps = {
  authUser: null,
  // contentfulFileShareData: null,
  // contentfulFileShareDescriptionData: null,
  userData: [],
  userId: null,
};

export default MemberContent;
