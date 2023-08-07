import { lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, { ReactInstance, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';

import { MemberFormValues } from './MemberRegisterContent';
import { TfaaMemberData } from '../../utils/hooks/useGetAllMembers';
import { appNameShort } from '../../utils/app-constants';
import { currentSchoolYearLong } from '../../utils/helpers';
import { getAmountPaid } from '../../utils/getAmountPaid';
import CtaButton from '../shared/CtaButton';
import EnhancedCard from '../shared/EnhancedCard';
import Invoice from './invoice';

// Local Typings
interface Props {
  hasFallConferenceFee: boolean;
  isActive: boolean;
  memberForm: MemberFormValues | TfaaMemberData | null;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.MuiCardContent-root': {
    padding: 0,
  },
  '.memberLevelAmount': {
    fontSize: 34,
    marginLeft: theme.spacing(1),
  },
  '.memberLevelHeading': {
    fontSize: 34,
    fontWeight: 700,
    marginTop: '1rem',
  },
  '.memberName': {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginTop: theme.spacing(1.5),
  },
  '.memberStatusDivider': {
    backgroundColor: lighten(theme.palette.tfaa.resources, 0.7),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  '.successMemberInfoCard': {
    padding: theme.spacing(0, 2, 3),
  },
}));

// Component Definition
export const PaymentSuccessUI = ({
  hasFallConferenceFee,
  isActive,
  memberForm,
}: Props): JSX.Element | null => {
  const printReceiptIdRef = useRef<ReactInstance>(null);

  if (!memberForm) {
    return null;
  }

  return (
    <StyledRoot>
      <Box mb={3}>
        <h2>Successful Payment!</h2>
      </Box>

      <EnhancedCard className="successMemberInfoCard">
        <h3 className="memberLevelHeading">
          {isActive ? 'Active' : 'Retired'} Member
          <Typography
            className="memberLevelAmount"
            component="span"
            variant="h4"
          >
            — {isActive ? '$75.00' : '$30.00'}
          </Typography>
        </h3>

        {hasFallConferenceFee && (
          <Typography variant="h6">
            Fall Conference Fee — $75.00
          </Typography>
        )}

        <Divider className="memberStatusDivider" />

        <Typography
          className="memberName"
          variant="body2"
        >
          {memberForm.FirstName} {memberForm.LastName}
        </Typography>
        <Typography variant="body2">
          {memberForm.Title}, {memberForm.District}
        </Typography>
        <Typography variant="body2">
          {memberForm.Email}
        </Typography>
        <Typography variant="body2">
          Cell Phone — {memberForm.CellPhone}
        </Typography>
        <Typography variant="body2">
          Office Phone — {memberForm.OfficePhone}
        </Typography>

        <Box mt={3}>
          <ReactToPrint
            content={() => printReceiptIdRef.current}
            trigger={() => (
              <CtaButton
                fontWeight={600}
                width={160}
              >
                Print Receipt
              </CtaButton>
            )}
          />
        </Box>
      </EnhancedCard>

      <Box
        mt={2}
        mx={4}
      >
        <Typography
          component="h3"
          sx={{ fontWeight: 600 }}
          variant="subtitle2"
        >
          Thank you for joining {appNameShort} for the {currentSchoolYearLong} school year!
        </Typography>
      </Box>

      <Box display="none">
        <Invoice
          amount={getAmountPaid(memberForm)}
          form={memberForm}
          isActive={isActive}
          isInvoice={false}
          receiptId={memberForm.receiptId}
          ref={printReceiptIdRef}
        />
      </Box>
    </StyledRoot>
  );
};
