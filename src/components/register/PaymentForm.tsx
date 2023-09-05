import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useCallback, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import PaypalButtonWrapper, { PaypalPayment } from './paypal/paypal-button-wrapper';
import { ActiveMemberRadioOptions } from './register-member-payment';
import { MemberFormValues } from './MemberRegisterContent';
import { TfaaMemberData } from '../../utils/hooks/useGetAllMembers';
import { currentDate } from '../../utils/dateHelpers';

// Local Typings
interface Props {
  amountToPay: number;
  hasFallConferenceFee: boolean;
  hasPaidForMembership?: boolean;
  isActiveMember: ActiveMemberRadioOptions;
  isDialogOpen?: boolean;
  isDialogView?: boolean;
  memberForm: MemberFormValues | TfaaMemberData | null;
  onSetHasFallConferenceFee: (hasFee: boolean) => void;
  onSetIsActiveMember: (isActiveMember: ActiveMemberRadioOptions) => void;
  onUpdateCompletedStep: (payment: PaypalPayment) => void;
  onUpdateFirestoreMemberData: (updatedMemberForm: MemberFormValues) => void;
  onUpdateMemberForm: (updatedMemberForm: MemberFormValues) => void;
}

// Local Variables
const StyledFormControl = styled(FormControl)({
  '.memberLevelHeading': {
    fontSize: 34,
    fontWeight: 700,
    marginTop: '1rem',
  },
  '.memberLevelHeadingDialog': {
    fontSize: 24,
    fontWeight: 700,
    // marginTop: '1rem',
  },
}) as typeof FormControl;

// Component Definition
export const PaymentForm = ({
  amountToPay,
  hasFallConferenceFee,
  hasPaidForMembership,
  isActiveMember,
  isDialogOpen,
  isDialogView = false,
  memberForm,
  onSetHasFallConferenceFee,
  onSetIsActiveMember,
  onUpdateCompletedStep,
  onUpdateFirestoreMemberData,
  onUpdateMemberForm,
}: Props): JSX.Element | null => {
  // console.log('amountToPay', amountToPay);

  // Flip between Active and Retired member types
  const handleChangeRadioSelection = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: updatedActiveMemberSelection } = event.target;

    console.log('updatedActiveMemberSelection', updatedActiveMemberSelection);

    const isActive = updatedActiveMemberSelection === 'active';

    const memberType = isActive ? 'Active' : 'Retired' as ('Active' | 'Retired');

    if (!memberForm) {
      return;
    }

    const updatedMemberForm = {
      ...memberForm,
      AmountPaid: 0, // probably not needed, but just in case
      MemberType: memberType,
      invoiceDate: currentDate,
      invoiceId: memberForm?.invoiceId,
      receiptId: memberForm?.receiptId,
    };

    onSetIsActiveMember(updatedActiveMemberSelection as ActiveMemberRadioOptions);
    onUpdateMemberForm(updatedMemberForm);

    return onUpdateFirestoreMemberData(updatedMemberForm);
  }, [memberForm, onSetIsActiveMember, onUpdateMemberForm]);

  // Used for the checkbox to indicate if the member will pay
  //  for the separate Fall Conference registration fee
  const handleToggleHasFallConferenceFee = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onSetHasFallConferenceFee(event.target.checked);

    if (!memberForm) {
      return;
    }

    const updatedMemberForm = {
      ...memberForm,
      IsRegisteredForFallConference: event.target.checked,
    };

    onUpdateMemberForm(updatedMemberForm);

    return onUpdateFirestoreMemberData(updatedMemberForm);
  }, [memberForm]);

  const needsToPayForFallConference = memberForm?.IsRegisteredForFallConference
    && (memberForm?.AmountPaid + memberForm?.AmountPaid_2) < 100;

  const showPayPalButtonSection = useCallback(() => {
    const hasAmountToPay = Boolean(amountToPay);

    if (!memberForm) {
      return false;
    }

    if (!isDialogView && hasAmountToPay) {
      return true;
    } else if (isDialogView && isDialogOpen) {
      if (hasAmountToPay) {
        return true;
      } else if (hasPaidForMembership && needsToPayForFallConference) {
        return true;
      }
    }
  }, [
    amountToPay,
    hasPaidForMembership,
    isDialogOpen,
    isDialogView,
    memberForm,
    needsToPayForFallConference,
  ]);

  const formattedAmountToPay = useMemo(() =>
    Number(amountToPay)?.toFixed(2).toLocaleString(),
    [amountToPay]);

  if (!memberForm) {
    return null;
  }

  return (
    <StyledFormControl
      component="fieldset"
      style={{ marginLeft: isDialogView ? 0 : 32 }}
    >
      <h2 className={
        isDialogView
          ? 'memberLevelHeadingDialog'
          : 'memberLevelHeading'}
      >
        {memberForm.MemberType} Member
        {hasFallConferenceFee && ' + Fall Conference Registration'}
      </h2>

      <FormControl component="fieldset">
        {!hasPaidForMembership && (
          <RadioGroup
            aria-label="Member Level"
            name="MemberLevel*"
            onChange={handleChangeRadioSelection}
            value={isActiveMember}
          >
            <FormControlLabel
              control={<Radio size="small" />}
              label={(
                <>
                  <Typography component="span">
                    Active
                  </Typography>

                  <Typography
                    color="textSecondary"
                    component="span"
                  >
                    {' '} — $75
                  </Typography>
                </>
              )}
              value="active"
            />
            <FormControlLabel
              control={<Radio size="small" />}
              label={(
                <>
                  <Typography component="span">
                    Retired
                  </Typography>

                  <Typography
                    color="textSecondary"
                    component="span"
                  >
                    {' '} — $30
                  </Typography>
                </>
              )}
              value="retired"
            />
          </RadioGroup>
        )}

        <FormControlLabel
          control={(
            <Checkbox
              checked={hasFallConferenceFee}
              onChange={handleToggleHasFallConferenceFee}
            />
          )}
          label="Add Fall Conference Registration (optional) — $75"
        />
      </FormControl>

      <Typography
        sx={{ marginTop: 2.5 }}
        variant="h6"
      >
        Total: ${formattedAmountToPay}
      </Typography>

      <Collapse
        in={showPayPalButtonSection()}
        mountOnEnter
        unmountOnExit
      >
        <Typography
          sx={{ marginTop: 4 }}
          variant="body2"
        >
          Click on the PayPal button below to pay with credit card.
        </Typography>

        {amountToPay > 0 && (
          <PaypalButtonWrapper
            amount={amountToPay}
            onSuccessfulPayment={onUpdateCompletedStep}
          />
        )}
      </Collapse>
    </StyledFormControl>
  )
};

