import React, { useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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
  isActiveMember: ActiveMemberRadioOptions;
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
  isActiveMember,
  isDialogView = false,
  memberForm,
  onSetHasFallConferenceFee,
  onSetIsActiveMember,
  onUpdateCompletedStep,
  onUpdateFirestoreMemberData,
  onUpdateMemberForm,
}: Props): JSX.Element | null => {
  // Flip between Active and Retired member types
  const handleChangeRadioSelection = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: updatedActiveMemberSelection } = event.target;

    const isActive = updatedActiveMemberSelection === 'active';

    const memberType = isActive ? 'Active' : 'Retired' as ('Active' | 'Retired');

    if (!memberForm) {
      return;
    }

    const updatedMemberForm = {
      ...memberForm,
      AmountPaid: 0, // probalbly not needed, but just in case
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
        Total: ${Number(amountToPay)?.toFixed(2).toLocaleString()}
      </Typography>

      <Typography
        sx={{ marginTop: 4 }}
        variant="body2"
      >
        Click on the PayPal button below to pay with credit card.
      </Typography>

      <PaypalButtonWrapper
        amount={amountToPay}
        onSuccessfulPayment={onUpdateCompletedStep}
      />
    </StyledFormControl>
  )
};

