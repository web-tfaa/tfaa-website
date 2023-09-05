// External Dependencies
import { lighten } from '@mui/material';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ErrorIcon from '@mui/icons-material/Error';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';

// Internal Dependencies
import { DialogPayment } from './DialogPayment';
import { TfaaAuthUser } from '../../../layout';
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
import { appNameShort } from '../../../../utils/app-constants';
import {
  currentSchoolYearEnding,
  currentSchoolYearLong,
} from '../../../../utils/helpers';
import CtaButton from '../../../shared/CtaButton';
import EnhancedAlert from '../../../shared/EnhancedAlert';
import MemberInfoCard from '../../../shared/MemberInfoCard';
import PrintInvoiceUI from '../../../../pages/members/PrintInvoiceUI';
import usePrevious from '../../../../utils/hooks/usePrevious';
import RegisterForFallConferenceListItem from './RegisterForFallConferenceListItem';

// Local Typings
interface Props {
  currentAuthUser: TfaaAuthUser | null;
  currentMemberData: TfaaMemberData | null;
  onSetRefetchCurrentMemberData: ((shouldRefetchCurrentMemberData: boolean) => void) | null;
  onUpdateShouldRefetchUserList: ((shouldRefetchUserList: boolean) => void) | null;
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
  '.listItemIcon': {
    height: 24,
    marginLeft: theme.spacing(1),
    transform: 'translateY(6px)',
    width: 24,
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
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
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
const MemberStatus: React.FC<Props> = ({
  currentAuthUser,
  currentMemberData,
  onSetRefetchCurrentMemberData,
  onUpdateShouldRefetchUserList,
}) => {
  console.log('MemberStatus .. currentMemberData', currentMemberData);

  const theme = useTheme();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const previousIsDialogOpen = usePrevious(isDialogOpen);

  const isRegisteredForCurrentYear = Boolean(currentMemberData);

  const userIdForFirestore = `${currentAuthUser?.email}-${currentAuthUser?.uid}`;

  // Local state setter functions
  const handleOpenDialogPayment = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleCloseDialogPayment = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  // We refetch data after the member payment dialog closes
  useEffect(() => {
    if (previousIsDialogOpen && !isDialogOpen) {
      onUpdateShouldRefetchUserList?.(true);
      onSetRefetchCurrentMemberData?.(true);
    }
  }, [isDialogOpen, previousIsDialogOpen, onUpdateShouldRefetchUserList]);

  // If the member paid by check, the TFAA Executive Secretary will manually
  //  add the check number in the PaypalPaymentID field
  const isInvoiced = currentMemberData?.PaymentOption.toLowerCase() === 'invoiced'
    && !currentMemberData?.PaypalPaymentID;

  const needsToPay = !currentMemberData?.AmountPaid && !currentMemberData?.AmountPaid_2;

  const hasPaidForMembershipOnly = Boolean(currentMemberData
    && currentMemberData?.AmountPaid > 0 && currentMemberData?.AmountPaid < 100)

  const needsToPayForFallConference = currentMemberData?.IsRegisteredForFallConference
    && (currentMemberData?.AmountPaid + currentMemberData?.AmountPaid_2) < 100;

  const amountToPayForMembership = currentMemberData?.MemberType === 'Active' ? 75.00 : 30.00;

  const hasPaidForFallConference = currentMemberData?.IsRegisteredForFallConference
    && (currentMemberData?.AmountPaid + currentMemberData?.AmountPaid_2) >= 100;

  // Calculate the amount owed based on member type, registration, and registered for fall conference
  // Call this function when needed. It doesn't work when assigned to a variable.
  const getOutstandingBalance = useCallback(() => {
    let amountOwed = 0;
    const isActiveMemberType = currentMemberData?.MemberType === 'Active';

    if (!isRegisteredForCurrentYear) {
      amountOwed = 75;
    } else if (hasPaidForMembershipOnly && needsToPayForFallConference) {
      amountOwed = 75;
    } else if (needsToPay) {
      if (isActiveMemberType) {
        if (needsToPayForFallConference) {
          amountOwed = 150;
        } else {
          amountOwed = 75;
        }
      } else if (!isActiveMemberType) {
        if (needsToPayForFallConference) {
          amountOwed = 105;
        } else {
          amountOwed = 30;
        }
      }
    }

    return amountOwed;
  }, [currentMemberData, isRegisteredForCurrentYear, needsToPay, needsToPayForFallConference]);

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
                      through 7/31/{currentSchoolYearEnding}
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
              To become a registered member, please
              {' '}
              {!isRegisteredForCurrentYear && 'register and '}
              {' '}
              pay
              dues for this school year.
            </EnhancedAlert>
          </Box>
        )}

        {isRegisteredForCurrentYear && needsToPay && (
          <>
            <Typography
              className="balanceText"
              component="div"
              sx={{ marginTop: 3 }}
              variant="body2"
            >
              {currentMemberData?.MemberType} Membership:
              <Box
                component="strong"
                sx={{ marginLeft: 1 }}
              >
                ${amountToPayForMembership}.00
              </Box>
            </Typography>

            {needsToPayForFallConference && (
              <Typography
                className="contentText"
                component="div"
                sx={{ marginTop: 1 }}
                variant="body2"
              >
                Fall Conference Fee:
                <Box
                  component="strong"
                  sx={{ marginLeft: 1 }}
                >
                  $75.00
                </Box>
              </Typography>
            )}
          </>
        )}

        <Typography
          className="contentText balanceText"
          component="div"
          paragraph
          variant="body2"
        >
          Outstanding balance:
          <StyledStrong>
            ${getOutstandingBalance()}.00
          </StyledStrong>

          {!getOutstandingBalance() && (
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

        {hasPaidForFallConference && (
          <>
            <Divider className="memberStatusDivider" />

            <Typography>
              Registered for Fall Conference
              {successIconElement}
            </Typography>
          </>
        )}

        {isRegisteredForCurrentYear && !hasPaidForFallConference && (
          <>
            <Divider className="memberStatusDivider" />

            <List sx={{ marginBottom: 2 }}>
              <RegisterForFallConferenceListItem
                hasPaidForFallConference={hasPaidForFallConference}
                isRegisteredForCurrentYear={isRegisteredForCurrentYear}
                needsToPayForFallConference={needsToPayForFallConference}
                onOpenDialogPayment={handleOpenDialogPayment}
                successIconElement={successIconElement}
                warningIconElement={warningIconElement}
              />
            </List>
          </>
        )}

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

              <ListItem className="paymentActionContainer">
                <ListItemSecondaryAction>
                  <CtaButton
                    colorVariant="resources"
                    fontWeight={600}
                    onClick={handleOpenDialogPayment}
                  >
                    Choose Payment Amount
                  </CtaButton>
                </ListItemSecondaryAction>
              </ListItem>

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

              <ListItem className="paymentActionContainer">
                <ListItemSecondaryAction>
                  <PrintInvoiceUI
                    amount={getOutstandingBalance()}
                    currentUser={currentMemberData}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </>
        )}
      </StyledMemberInfoCard>

      {/* {isDialogOpen && ( */}
        <DialogPayment
          // amountToPay={getOutstandingBalance()}
          currentMemberData={currentMemberData}
          hasPaidForMembership={hasPaidForMembershipOnly}
          isOpen={isDialogOpen}
          onClose={handleCloseDialogPayment}
          userIdForFirestore={userIdForFirestore}
        />
      )}
    </>
  );
};

export default MemberStatus;
