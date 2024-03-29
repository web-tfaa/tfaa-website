// External Dependencies
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import React, { useMemo, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Typography from '@mui/material/Typography';
import styled, { useTheme } from 'styled-components';

// Internal Dependencies
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
import { appNameShort } from '../../../../utils/app-constants';
import { currentSchoolYearLong } from '../../../../utils/helpers';
import CtaButton from '../../../shared/CtaButton';
import Invoice from '../../../register/invoice';
import MemberInfoCard from '../../../shared/MemberInfoCard';

// Local Typings
interface Props {
  currentMemberData: TfaaMemberData | null;
}

// Local Variables
const StyledMemberInfoCard = styled(MemberInfoCard)(({ theme }) => ({
  '.actionContainer': {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '.listItemIcon': {
    height: 24,
    marginLeft: theme.spacing(1),
    transform: 'translateY(6px)',
    width: 24,
  },
  '.hidden': {
    display: 'none',
  },
  '.listItemSecondaryText': {
    [theme.breakpoints.down('mobile')]: {
      maxWidth: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
    maxWidth: '80%',
  },
  '.listItemText': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
      maxWidth: '70%',
    },
    fontSize: '1rem',
    fontWeight: 500,
  },
  '.paymentActionContainer': {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
  },
  '.paymentListItem': {
    '&:not(:first-child)': {
      marginTop: theme.spacing(1),
    },
    marginBottom: 0,
  },
  '.thankYouText': {
    fontWeight: 500,
    margin: theme.spacing(3, 0, 2, 2),
  },
}));

// Component Definition
const MemberRegistrationTasks: React.FC<Props> = ({
  currentMemberData,
}) => {
  const isRegisteredForCurrentYear = Boolean(currentMemberData);

  const theme = useTheme();
  const printReceiptRef = useRef();

  const needsToPay = !currentMemberData?.AmountPaid && !currentMemberData?.AmountPaid_2;

  const canPrintReceipt = currentMemberData?.PaymentOption.toLowerCase() === 'paypal'
    || currentMemberData?.PaypalPaymentID;

  const successIconElement = useMemo(() => (
    <CheckCircleIcon
      className="listItemIcon"
      htmlColor={theme.palette.tfaa.resources}
    />
  ), []);

  const warningIconElement = useMemo(() => (
    <ErrorIcon
      className="listItemIcon"
      htmlColor={theme.palette.warning.light}
    />
    ), []);

  return (
    <>
      <StyledMemberInfoCard cardTitle="Registration tasks">
        {!needsToPay && (
          <Typography className="thankYouText">
            Thank you for joining {appNameShort} for the{' '}
            {currentSchoolYearLong} school year!
          </Typography>
        )}

        <List>
          <ListItem className="paymentListItem">
            <ListItemText
              classes={{
                primary: 'listItemText',
                secondary: 'listItemSecondaryText',
              }}
              primary={(
                <>
                  Register as a member
                  {isRegisteredForCurrentYear && successIconElement}
                </>
              )}
              secondary={
                isRegisteredForCurrentYear
                  ? 'You are registered — thanks for being a member!'
                  : 'Become a member for the current school year.'
                }
            />

            {!isRegisteredForCurrentYear && (
              <ListItemSecondaryAction>
                <CtaButton
                  colorVariant="about"
                  fontWeight={700}
                  rightArrow
                  to="/members/register"
                >
                  Register
                </CtaButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>

          <ListItem className="paymentListItem">
            <ListItemText
              classes={{
                primary: 'listItemText',
                secondary: 'listItemSecondaryText',
              }}
              primary={(
                <>
                  Pay Membership Dues
                  {isRegisteredForCurrentYear && !needsToPay && successIconElement}
                  {isRegisteredForCurrentYear && needsToPay && warningIconElement}
                </>
              )}
              secondary={
                isRegisteredForCurrentYear && !needsToPay
                  ? 'You have already paid your dues for the current school year.'
                  : 'Pay online using credit card or send payment with invoice.'
                }
            />
          </ListItem>

          {isRegisteredForCurrentYear && (
            <>
              <ListItem className="paymentListItem">
                <ListItemText
                  classes={{
                    primary: 'listItemText',
                    secondary: 'listItemSecondaryText',
                  }}
                  primary="Download W-9 Form"
                  secondary={`If your district requires an IRS W-9 Form for ${appNameShort}, download or print a copy.`}
                />
              </ListItem>

              <ListItem className="actionContainer">
                <ListItemSecondaryAction>
                  <CtaButton
                    colorVariant="resources"
                    fontWeight={600}
                    to="https://res.cloudinary.com/tmac/image/upload/v1690941409/W-9_TFAA_Inc.pdf"
                  >
                    Download W-9
                  </CtaButton>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          )}

          {canPrintReceipt && (
            <>
              <ListItem className="paymentListItem">
                <ListItemText
                  classes={{
                    primary: 'listItemText',
                    secondary: 'listItemSecondaryText',
                  }}
                  primary="Need a copy of your receipt?"
                />
              </ListItem>

              <ListItem className="actionContainer">
                <ListItemSecondaryAction>
                  <ReactToPrint
                    content={() => printReceiptRef.current as any}
                    trigger={() => (
                      <CtaButton
                        colorVariant="resources"
                        fontWeight={600}
                      >
                        Print Receipt
                      </CtaButton>
                    )}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </>
          )}
        </List>

        {canPrintReceipt && (
          <div className="hidden">
            <Invoice
              amount={currentMemberData.AmountPaid}
              form={currentMemberData}
              isActive={currentMemberData.MemberType === 'Active'}
              isInvoice={false}
              receiptId={currentMemberData.receiptId}
              ref={printReceiptRef as any}
            />
          </div>
        )}
      </StyledMemberInfoCard>
    </>
  );
};

export default MemberRegistrationTasks;
