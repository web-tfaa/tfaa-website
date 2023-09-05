// External Dependendcies
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';

// Internal Dependencies
import CtaButton from '../../../shared/CtaButton';

// Local Typings
interface Props {
  hasPaidForFallConference: boolean | undefined;
  isRegisteredForCurrentYear?: boolean;
  needsToPayForFallConference: boolean | undefined;
  onOpenDialogPayment: () => void;
  successIconElement: JSX.Element;
  warningIconElement: JSX.Element;
}

// Component Definition
const RegisterForFallConferenceListItem = ({
  hasPaidForFallConference,
  isRegisteredForCurrentYear = true,
  needsToPayForFallConference,
  onOpenDialogPayment,
  successIconElement,
  warningIconElement,
}: Props): JSX.Element => {
  // console.log('fall conf list item :: currentMemberData', currentMemberData);

  let fallConferenceSecondaryText = 'Pay online using credit card or send payment with invoice.';
  if (needsToPayForFallConference) {
    fallConferenceSecondaryText = 'You are registered for the Fall Conference, but have not paid yet.';
  } else if (hasPaidForFallConference) {
    fallConferenceSecondaryText = 'You are registered for the Fall Conference and paid in full.';
  }

  return (
    <>
      <ListItem className="paymentListItem">
        <ListItemText
          classes={{
            primary: 'listItemText',
            secondary: 'listItemSecondaryText',
          }}
          primary={(
            <>
              Register for Fall Conference (optional)
              {hasPaidForFallConference && successIconElement}
              {needsToPayForFallConference && warningIconElement}
            </>
          )}
          secondary={fallConferenceSecondaryText}
        />
      </ListItem>

      {isRegisteredForCurrentYear && !hasPaidForFallConference && (
        <ListItem className="paymentActionContainer">
          <ListItemSecondaryAction>
            <CtaButton
              colorVariant="resources"
              fontWeight={600}
              onClick={onOpenDialogPayment}
            >
              {needsToPayForFallConference ? 'Pay' : 'Register'} for Fall Conference
            </CtaButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </>
  );
}

export default RegisterForFallConferenceListItem;
