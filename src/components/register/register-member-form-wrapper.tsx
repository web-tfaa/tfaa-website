// External Dependencies
import React from 'react';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from './MemberRegisterContent';
import { appNameShort } from '../../utils/app-constants';
import FormDivider from '../shared/FormDivider';
import FormTitle from '../shared/FormTitle';
import RegisterForm from './register-member-form';

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
