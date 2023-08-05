import React, { useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

import PaypalButtonWrapper, { PaypalPayment } from './paypal/paypal-button-wrapper';
import { currentDate } from '../../utils/dateHelpers';
import { MemberFormValues } from './MemberRegisterContent';
import { ActiveMemberRadioOptions } from './register-member-payment';

// Local Typings
interface Props {
  amountToPay: number;
  hasFallConferenceFee: boolean;
  isActiveMember: ActiveMemberRadioOptions;
  memberForm: MemberFormValues;
  onSetHasFallConferenceFee: (hasFee: boolean) => void;
  onSetIsActiveMember: (isActiveMember: ActiveMemberRadioOptions) => void;
  onUpdateCompletedStep: (payment: PaypalPayment) => void;
  onUpdateFirestoreMemberData: (updatedMemberForm: MemberFormValues) => void;
  onUpdateMemberForm: (updatedMemberForm: MemberFormValues) => void;
}

// Component Definition
export const PaymentForm = ({
  amountToPay,
  hasFallConferenceFee,
  isActiveMember,
  memberForm,
  onSetHasFallConferenceFee,
  onSetIsActiveMember,
  onUpdateCompletedStep,
  onUpdateFirestoreMemberData,
  onUpdateMemberForm,
}: Props): JSX.Element => {
  // Flip between Active and Retired member types
  const handleChangeRadioSelection = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: updatedActiveMemberSelection } = event.target;

    const isActive = updatedActiveMemberSelection === 'active';

    const memberType = isActive ? 'Active' : 'Retired' as ('Active' | 'Retired');

    const updatedMemberForm = {
      ...memberForm,
      AmountPaid: 0, // probalbly not needed, but just in case
      invoiceDate: currentDate,
      invoiceId: memberForm.invoiceId,
      MemberType: memberType,
      receiptId: memberForm.receiptId,
    };

    onSetIsActiveMember(updatedActiveMemberSelection as ActiveMemberRadioOptions);
    onUpdateMemberForm(updatedMemberForm);

    return onUpdateFirestoreMemberData(updatedMemberForm);
  }, [memberForm, onSetIsActiveMember, onUpdateMemberForm]);

  // Used for the checkbox to indicate if the member will pay
  //  for the separate Fall Conference registration fee
  const handleToggleHasFallConferenceFee = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onSetHasFallConferenceFee(event.target.checked);

    const updatedMemberForm = {
      ...memberForm,
      IsRegisteredForFallConference: event.target.checked,
    };

    onUpdateMemberForm(updatedMemberForm);

    return onUpdateFirestoreMemberData(updatedMemberForm);
  }, [memberForm]);

  return (
    <FormControl
      component="fieldset"
      style={{ marginLeft: 32 }}
    >
      <h2 className="memberLevelHeading">
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
    </FormControl>
  )
};

