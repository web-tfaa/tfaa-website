// External Dependencies
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import {
  green,
  red,
} from '@material-ui/core/colors';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import CtaButton from '../../components/masthead/cta-button';
import FuturaAnchor from '../../components/shared/FuturaAnchor';
import FuturaDiv from '../../components/shared/futura-div';
import Invoice from '../../components/register/invoice';
import RegisterButton from '../../components/register/register-button';
import presets from '../../utils/presets';
import { currentSchoolYearLong } from '../../utils/helpers';
import { ADMIN_USER_EMAIL_LIST } from '../../utils/member-constants';

// Local Dependencies
// import MemberFileShareCard from './MemberFileShareCard';
import MemberInfoBlock from './MemberInfoBlock';

// Sidebar Data
import membersSidebar from './members-links.yml';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Local Variables
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

const MEMBER_CONTENT_REDUCER_INITIAL_STATE = {
  currentUser: null,
  isRegisteredForCurrentYear: false,
};

function memberContentReducer(state, { type, payload }) {
  switch (type) {
    case 'setCurrentUser':
      return {
        ...state,
        ...payload,
      };
    case 'setIsRegisteredForCurrentYear':
      return {
        ...state,
        ...payload,
      };
    case 'clearState':
      return MEMBER_CONTENT_REDUCER_INITIAL_STATE;
    default:
      return MEMBER_CONTENT_REDUCER_INITIAL_STATE;
  }
}

// Component Definition
const MemberContent = ({
  authUser,
  // contentfulFileShareData,
  // contentfulFileShareDescriptionData,
  currentMemberList,
  memberEmail,
  userId,
}) => {
  const [state, dispatchState] = useReducer(
    memberContentReducer,
    MEMBER_CONTENT_REDUCER_INITIAL_STATE,
  );

  const {
    currentUser, isLoadingUserData, isRegisteredForCurrentYear,
  } = state;

  // console.log('userId', userId);
  // console.log('state ..........', state);

  // console.log('userList.length', userList.length, Array.isArray(userList));

  const printInvoiceRef = useRef(null);
  const printReceiptRef = useRef(null);

  useEffect(() => {
    // Find if the current user is among the registerd users
    if (currentMemberList
      && Object.keys(currentMemberList).length > 0
      && Object.keys(currentMemberList).includes(userId)
    ) {
      dispatchState({
        type: 'setIsRegisteredForCurrentYear',
        payload: {
          isRegisteredForCurrentYear: true,
        },
      });
    }
  }, [currentMemberList, userId]);

  useEffect(() => {
    if (
      !isRegisteredForCurrentYear
      && currentMemberList
      && Object.keys(currentMemberList).length > 0
    ) {
      // Find the current user's index
      const indexOfUser = Object.keys(currentMemberList).indexOf(userId);
      // Separate the values into an array
      const valuesOnly = Object.values(currentMemberList);

      // Set the current user's data
      dispatchState({
        type: 'setCurrentUser',
        payload: {
          currentUser: valuesOnly[indexOfUser],
        },
      });
    }
  }, [isRegisteredForCurrentYear, currentMemberList, userId]);

  if (isLoadingUserData) {
    return <CircularProgress size={64} thickness={4} />;
  }

  const registeredIcon = isRegisteredForCurrentYear ? (
    <CheckIcon htmlColor={green[700]} />
  ) : (
    <AnnouncementIcon htmlColor={red[500]} />
  );

  const memberInfoCard = currentUser && (
    <Card>
      <CardHeadline>{`Info for: ${memberEmail}`}</CardHeadline>
      <div css={{ margin: '2rem 0px' }}>
        <MemberInfoBlock>
          {currentUser.FirstName} {currentUser.LastName}
        </MemberInfoBlock>
        <MemberInfoBlock>
          {currentUser.Title}, {currentUser.District}
        </MemberInfoBlock>
        <MemberInfoBlock>{currentUser.MemberType || 'Active'} member</MemberInfoBlock>
        <MemberInfoBlock>{currentUser.Address1}</MemberInfoBlock>
        <MemberInfoBlock>{currentUser.Address2}</MemberInfoBlock>
        <MemberInfoBlock>
          {currentUser.City}, {currentUser.State} {currentUser.ZipCode}
        </MemberInfoBlock>
        <MemberInfoBlock>Office Phone: {currentUser.OfficePhone}</MemberInfoBlock>
        <MemberInfoBlock>Cell Phone: {currentUser.CellPhone}</MemberInfoBlock>
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
      If you need to pay via invoice please send payment to the TMAC Treasurer as indicated on your
      invoice.
      <div css={{ marginTop: 16 }}>
        <ReactToPrint
          content={() => printInvoiceRef}
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
          ref={printInvoiceRef}
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
          content={() => printReceiptRef}
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
          ref={printReceiptRef}
        />
      </div>
    </FuturaDiv>
  );

  const isInvoiced = currentUser && currentUser.PaymentOption.toLowerCase() === 'invoiced';

  const isPaypal = currentUser && currentUser.PaymentOption.toLowerCase() === 'paypal';

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
      {!isRegisteredForCurrentYear && (
        <CtaButton isGreen to="/members/join">
          Join TMAC
        </CtaButton>
      )}
      {isInvoiced && invoiceInfo}
      {isPaypal && receiptInfo}
      {isRegisteredForCurrentYear && (
        <>
          <FuturaDiv>
            If your district requires the IRS W-9 Form for TMAC, download or print a copy below.
          </FuturaDiv>
          <FuturaAnchor
            download
            href="https://res.cloudinary.com/tmac/image/upload/v1589767111/W-9__TMAC_Inc.pdf"
          >
            Download W-9
          </FuturaAnchor>
        </>
      )}
    </Card>
  );

  const isAdmin = authUser && ADMIN_USER_EMAIL_LIST.includes(authUser.email);

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
};

MemberContent.propTypes = {
  authUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  // contentfulFileShareData: PropTypes.arrayOf(PropTypes.shape({})),
  // contentfulFileShareDescriptionData: PropTypes.arrayOf(PropTypes.shape({})),
  currentMemberList: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  memberEmail: PropTypes.string,
  userId: PropTypes.string,
};

MemberContent.defaultProps = {
  authUser: null,
  // contentfulFileShareData: null,
  // contentfulFileShareDescriptionData: null,
  currentMemberList: null,
  userId: null,
};

export default MemberContent;
