// External Dependencies
import { lighten } from '@mui/material';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
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
  const theme = useTheme();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const previousIsDialogOpen = usePrevious(isDialogOpen);

  const isRegisteredForCurrentYear = Boolean(currentMemberData);

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

  const needsToPay = !currentMemberData?.AmountPaid;

  const needsToPayForFallConference = currentMemberData?.IsRegisteredForFallConference && currentMemberData?.AmountPaid < 100;

  const amountToPayForMembership = currentMemberData?.MemberType === 'Active' ? 75.00 : 30.00;

  const userIdForFirestore = `${currentAuthUser?.email}-${currentAuthUser?.uid}`;

  const successIconElement = useMemo(() => (
    <CheckCircleIcon
      className="listItemIcon"
      htmlColor={theme.palette.tfaa.resources}
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
            {!isRegisteredForCurrentYear && '$75.00'}
            {needsToPay && currentMemberData?.MemberType === 'Active' && !needsToPayForFallConference && '$75.00'}
            {needsToPay && currentMemberData?.MemberType === 'Active' && needsToPayForFallConference && '$150.00'}
            {needsToPay && currentMemberData?.MemberType === 'Retired' && needsToPayForFallConference && '$105.00'}
            {needsToPay && currentMemberData?.MemberType === 'Retired' && !needsToPayForFallConference &&  '$30.00'}
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

        {needsToPayForFallConference && !needsToPay && (
          <>
            <Divider className="memberStatusDivider" />

            <Typography>
              Registered for Fall Conference
              {successIconElement}
            </Typography>
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
                  <PrintInvoiceUI currentUser={currentMemberData} />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </>
        )}
      </StyledMemberInfoCard>

      {isDialogOpen && (
        <DialogPayment
          currentMemberData={currentMemberData}
          isOpen={isDialogOpen}
          onClose={handleCloseDialogPayment}
          userIdForFirestore={userIdForFirestore}
        />
      )}
    </>
  );
};

export default MemberStatus;
