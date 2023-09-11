// External Dependencies
import React from 'react';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from './MemberRegisterContent';
import { appNameShort } from '../../utils/app-constants';
import { isTodayAfterJuly31st } from '../../utils/helpers';
import FormDivider from '../shared/FormDivider';
import FormTitle from '../shared/FormTitle';
import RegisterForm from './register-member-form';
import RegistrationPausedAlert from '../shared/RegistrationPausedAlert';

// Local Typings
interface Props {
  authenticatedUserId?: string;
  initialMemberFormValues: MemberFormValues;
  onCompleteMemberStep: HandleCompleteMemberStepType;
}

// Component Definition
const MemberFormValuesWrapper: React.FC<Props> = ({
  authenticatedUserId,
  initialMemberFormValues,
  onCompleteMemberStep,
}) => {
  if (!authenticatedUserId) {
    return null;
  }

  // We normally shut down registration and sponsorship after TMEA each year and open it up on 8/1
  const showMembershipForm = isTodayAfterJuly31st;

  if (!showMembershipForm) {
    return <RegistrationPausedAlert />;
  }

  return (
    <section>
      <FormTitle>
        2. Join {appNameShort}
      </FormTitle>

      <FormDivider />

      <RegisterForm
        authenticatedUserId={authenticatedUserId}
        initialMemberFormValues={initialMemberFormValues}
        onCompleteMemberStep={onCompleteMemberStep}
      />
    </section>
  );
};

export default MemberFormValuesWrapper;
