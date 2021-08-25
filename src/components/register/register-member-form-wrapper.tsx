// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from '../../pages/members/register';
import FormHr from '../shared/form-hr';
import RegisterForm from './register-member-form';

// Local Typings
interface Props {
  authenticatedUserId?: string;
  initialMemberFormValues: MemberFormValues;
  memberForm: MemberFormValues;
  onCompleteMemberStep: HandleCompleteMemberStepType ;
  onUpdateMemberForm: (memberForm: MemberFormValues) => void;
}

// Component Definition
const MemberFormValuesWrapper: FC<Props> = ({
  authenticatedUserId,
  initialMemberFormValues,
  memberForm,
  onCompleteMemberStep,
  onUpdateMemberForm,
}) => {
  if (!authenticatedUserId) {
    return null;
  }

  return (
    <section>
      <h2>
        2. Register for TMAC
      </h2>

      <FormHr />

      <RegisterForm
        authenticatedUserId={authenticatedUserId}
        initialMemberFormValues={initialMemberFormValues}
        memberForm={memberForm}
        onCompleteMemberStep={onCompleteMemberStep}
        onUpdateMemberForm={onUpdateMemberForm}
      />
    </section>
  );
};

export default MemberFormValuesWrapper;
