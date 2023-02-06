// External Dependencies
import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from './MemberRegisterContent';
import { appNameShort } from '../../utils/app-constants';
import FormDivider from '../shared/FormDivider';
import RegisterForm from './register-member-form';

// Local Typings
interface Props {
  authenticatedUserId?: string;
  initialMemberFormValues: MemberFormValues;
  onCompleteMemberStep: HandleCompleteMemberStepType;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.registerStep2Title': {
    fontSize: 34,
    fontWeight: 900,
  },
}));

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
    <StyledRoot>
      <Typography className="registerStep2Title">
        2. Join {appNameShort}
      </Typography>

      <FormDivider />

      <RegisterForm
        authenticatedUserId={authenticatedUserId}
        initialMemberFormValues={initialMemberFormValues}
        onCompleteMemberStep={onCompleteMemberStep}
      />
    </StyledRoot>
  );
};

export default MemberFormValuesWrapper;
