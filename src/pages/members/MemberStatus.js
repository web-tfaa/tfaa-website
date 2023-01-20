// External Dependencies
// import { navigate } from 'gatsby';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import {
  doUpdateEntry,
  FIRESTORE_MEMBER_COLLECTION,
} from '../../firebase/db';
import { currentDate } from '../../utils/dateHelpers';
import {
  currentSchoolYearEnding,
  currentSchoolYearLong,
} from '../../utils/helpers';
import { options } from '../../utils/typography';
import Card from '../../components/shared/cards/card';
import CardSubtitle from '../../components/shared/CardSubtitle';
import EnhancedAlert from '../../components/shared/EnhancedAlert';
import PaypalButtonWrapper from '../../components/register/paypal/paypal-button-wrapper';
import PrintInvoiceUI from './PrintInvoiceUI';
import presets from '../../utils/presets';

// Local Variables
const propTypes = {
  currentMemberData: PropTypes.shape({
    Address1: PropTypes.string,
    Address2: PropTypes.string,
    CellPhone: PropTypes.string,
    City: PropTypes.string,
    District: PropTypes.string,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    MemberType: PropTypes.string,
    OfficePhone: PropTypes.string,
    State: PropTypes.string,
    Title: PropTypes.string,
    ZipCode: PropTypes.string,
  }),
  isRegisteredForCurrentYear: PropTypes.bool.isRequired,
};

const defaultProps = {
  currentMemberData: null,
};

const StyledRoot = styled(Card)(({ theme }) => ({
  '.balanceText': {
    marginTop: theme.spacing(3),
  },
  '.contentText': {
    marginBottom: theme.spacing(2),
  },
  '.innerContainer': {
    paddingBottom: theme.spacing(2),
  },
  '.listItemSecondaryText': {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
    maxWidth: '80%',
  },
  '.listItem': {
    marginBottom: 0,
    paddingBottom: 0,
  },
  '.listItemText': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
      maxWidth: '70%',
    },
    [presets.Mobile]: {
      maxWidth: '60%',
    },
    [presets.Phablet]: {
      maxWidth: '70%',
    },
    [presets.Tablet]: {
      maxWidth: '80%',
    },
    fontSize: '1rem',
    fontWeight: 500,
  },
  '.paymentActionContainer': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '.paymentList': {
    marginBottom: theme.spacing(1),
  },
  '.paymentListItem': {
    '&:not(:first-child)': {
      marginTop: theme.spacing(1),
    },
    marginBottom: 0,
  },
  marginBottom: 0,
  width: '100%',
}));

const StyledStrong = styled.strong(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
  fontSize: '1.2rem',
  whiteSpace: 'pre',
}));

// Component Definition
const MemberStatus = ({
  currentMemberData,
  isRegisteredForCurrentYear,
}) => {
  const isInvoiced = currentMemberData?.PaymentOption.toLowerCase() === 'invoiced';

  const needsToPay = !currentMemberData?.AmountPaid;

  const amountToPay = currentMemberData?.MemberType === 'Active' ? 50.00 : 30.00;

  const handleSuccessfulPayment = useCallback((payment) => {
    const updatedMemberData = {
      ...currentMemberData,
      AmountPaid: currentMemberData?.MemberType === 'Active' ? 50 : 30,
      PaypalPayerID: payment?.payerID,
      PaypalPaymentID: payment?.paymentID,
      PaymentOption: payment?.paymentID ? 'Paypal' : 'Invoiced',
      invoiceDate: currentDate,
      invoiceId: currentMemberData.invoiceId,
      receiptDate: currentMemberData.receiptId ? currentDate : '',
      receiptId: currentMemberData.receiptId,
    };

    // Update the member's payment data in the Firestore database
    // This shape should be the same as register-membmer-payment
    //  in the handleCompleteMemberPaymentStep function
    doUpdateEntry(
      updatedMemberData,
      FIRESTORE_MEMBER_COLLECTION,
      currentMemberData?.userId,
    );

    // Instead of trying to update all of the data,
    //  it's easier to reload the Members page
    window.location.reload();
  }, [currentMemberData]);

  return (
    <StyledRoot>
      <CardSubtitle>Membership status</CardSubtitle>

      <List>
        <ListItem className="listItem">
          <ListItemText
            classes={{
              primary: 'listItemText',
            }}
            primary={(
              <>
                {!isRegisteredForCurrentYear && 'Not registered'}

                {isRegisteredForCurrentYear && needsToPay && 'Inactive member'}

                {isRegisteredForCurrentYear && !needsToPay && (
                <>
                  {currentMemberData?.MemberType || 'Active'} member
                </>
                )}
              </>
            )}
            secondary={(
              <>
                for the {currentSchoolYearLong} school year
                {!needsToPay && (
                  <>
                    <br />
                    through 6/30/{currentSchoolYearEnding}
                  </>
                )}
              </>
            )}
          />
        </ListItem>
      </List>

      {needsToPay && (
        <Box marginTop={2}>
          <EnhancedAlert severity="warning">
            To become an active member, please
            {' '}
            {!isRegisteredForCurrentYear && 'register and '}
            {' '}
            pay
            dues for this school year.
          </EnhancedAlert>
        </Box>
      )}

      <Typography
        className="contentText balanceText"
        paragraph
        variant="body2"
      >
        Outstanding balance:
        {' '}
        <StyledStrong>
          {!isRegisteredForCurrentYear && '$50.00'}
          {needsToPay && currentMemberData?.MemberType === 'Active' && '$50.00'}
          {currentMemberData?.MemberType === 'Retired' && '$30.00'}
          {!needsToPay && '$0.00'}
        </StyledStrong>
      </Typography>

      {isRegisteredForCurrentYear && isInvoiced && (
        <>
          <Typography
            sx={{
              fontFamily: options.headerFontFamily.join(','),
              fontWeight: 600,
            }}
            variant="subtitle"
          >
            Payment Options
          </Typography>

          <List className="paymentList">
            <ListItem className="paymentListItem">
              <ListItemText
                classes={{
                  primary: 'listItemText',
                  secondary: 'listItemSecondaryText',
                }}
                primary="Pay online with credit card"
                secondary="TMAC uses PayPal to securely process online credit card payments."
              />
            </ListItem>

            <div className="paymentActionContainer">
              <PaypalButtonWrapper
                amount={amountToPay}
                noMargin
                onSuccessfulPayment={handleSuccessfulPayment}
              />
            </div>

            <ListItem className="paymentListItem">
              <ListItemText
                classes={{
                  primary: 'listItemText',
                  secondary: 'listItemSecondaryText',
                }}
                primary="Send invoice with payment"
                secondary="Mail invoice with payment
                      to the TMAC Treasurer as indicated on your
                      invoice."
              />
            </ListItem>

            <div className="paymentActionContainer">
              <PrintInvoiceUI currentUser={currentMemberData} />
            </div>
          </List>
        </>
      )}
    </StyledRoot>
  );
};

MemberStatus.propTypes = propTypes;
MemberStatus.defaultProps = defaultProps;

export default MemberStatus;
