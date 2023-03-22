// External Dependencies
import { lighten } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { PaypalPayment } from '../../../register/paypal/paypal-button-wrapper';
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
import {
  doUpdateEntry,
  FIRESTORE_MEMBER_COLLECTION,
} from '../../../../firebase/db';
import { currentDate } from '../../../../utils/dateHelpers';
import {
  currentSchoolYearEnding,
  currentSchoolYearLong,
} from '../../../../utils/helpers';
import EnhancedAlert from '../../../shared/EnhancedAlert';
import MemberInfoCard from '../../../shared/MemberInfoCard';
import PaypalButtonWrapper from '../../../register/paypal/paypal-button-wrapper';
import PrintInvoiceUI from '../../../../pages/members/PrintInvoiceUI';
import { appNameShort } from '../../../../utils/app-constants';

// Local Typings
interface Props {
  currentMemberData: TfaaMemberData | null;
}

// Local Variables
const StyledMemberInfoCard = styled(MemberInfoCard)(({ theme }) => ({
  '.balanceText': {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
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
    fontSize: '1rem',
    fontWeight: 500,
  },
  '.memberStatusDivider': {
    backgroundColor: lighten(theme.palette.tfaa.resources, 0.7),
    marginBottom: theme.spacing(2),
  },
  '.paidInFullChip': {
    borderColor: theme.palette.tfaa.resources,
    borderWidth: 2,
    color: theme.palette.tfaa.resources,
    fontWeight: 700,
    marginLeft: theme.spacing(1),
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
  fontSize: '1.25rem',
  margin: theme.spacing(0, 1),
  whiteSpace: 'pre',
}));

// Component Definition
const MemberStatus: React.FC<Props> = ({ currentMemberData }) => {
  const isRegisteredForCurrentYear = Boolean(currentMemberData);

  const isInvoiced = currentMemberData?.PaymentOption.toLowerCase() === 'invoiced';

  const needsToPay = !currentMemberData?.AmountPaid;

  const amountToPay = currentMemberData?.MemberType === 'Active' ? 50.00 : 30.00;

  const handleSuccessfulPayment = useCallback(async (payment: PaypalPayment) => {
    const updatedMemberData = {
      ...currentMemberData,
      AmountPaid: currentMemberData?.MemberType === 'Active' ? 50 : 30,
      PaypalPayerID: payment?.payerID,
      PaypalPaymentID: payment?.paymentID,
      PaymentOption: payment?.paymentID ? 'Paypal' : 'Invoiced',
      invoiceDate: currentDate,
      invoiceId: currentMemberData?.invoiceId ?? 0,
      receiptDate: currentMemberData?.receiptId ? currentDate : '',
      receiptId: currentMemberData?.receiptId ?? 0,
    };

    // Update the member's payment data in the Firestore database
    // This shape should be the same as register-membmer-payment
    //  in the handleCompleteMemberPaymentStep function
    try {
      await doUpdateEntry(
        updatedMemberData,
        FIRESTORE_MEMBER_COLLECTION,
        currentMemberData?.userId,
      );
    } catch (error) {
      console.error('Error while updating after a successful payment', error);
    }

    // Instead of trying to update all of the data,
    //  it's easier to reload the Members page
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, [currentMemberData]);

  return (
    <StyledMemberInfoCard cardTitle="Membership status">
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
        component="div"
        paragraph
        variant="body2"
      >
        Outstanding balance:
        <StyledStrong>
          {!isRegisteredForCurrentYear && '$50.00'}
          {needsToPay && currentMemberData?.MemberType === 'Active' && '$50.00'}
          {currentMemberData?.MemberType === 'Retired' && '$30.00'}
          {!needsToPay && '$0.00'}
        </StyledStrong>
        {!needsToPay && (
          <>
            {' '}
            <Chip
              className="paidInFullChip"
              label="Paid in full"
              variant="outlined"
            />
          </>
        )}
      </Typography>

      {isRegisteredForCurrentYear && isInvoiced && (
        <>
          <Divider className="memberStatusDivider" />

          <Typography
            sx={{ fontWeight: 600 }}
            variant="subtitle1"
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
                secondary={`${appNameShort} uses PayPal to securely process online credit card payments.`}
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
                secondary={
                  `Mail invoice with payment
                      to the ${appNameShort} Executive Secretary as indicated on your
                      invoice.`}
              />
            </ListItem>

            <div className="paymentActionContainer">
              <PrintInvoiceUI currentUser={currentMemberData} />
            </div>
          </List>
        </>
      )}
    </StyledMemberInfoCard>
  );
};

export default MemberStatus;