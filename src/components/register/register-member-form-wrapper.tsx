// External Dependencies
import Divider from '@mui/material/Divider';
import React, { useMemo } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from './MemberRegisterContent';
import { appNameShort } from '../../utils/app-constants';
import RegisterForm from './register-member-form';

// Local Typings
interface Props {
  authenticatedUserId?: string;
  initialMemberFormValues: MemberFormValues;
  onCompleteMemberStep: HandleCompleteMemberStepType;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.registerStep1Divider': {
    backgroundColor: theme.palette.tfaa.resources,
    height: 3,
    margin: theme.spacing(1, 0, 4),
  },
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

  const dividerElement = useMemo(() => (
    <Divider className="registerStep1Divider" />
  ), []);

  return (
    <StyledRoot>
      <Typography className="registerStep2Title">
        2. Join {appNameShort}
      </Typography>

      {dividerElement}

      <RegisterForm
        authenticatedUserId={authenticatedUserId}
        initialMemberFormValues={initialMemberFormValues}
        onCompleteMemberStep={onCompleteMemberStep}
      />
    </StyledRoot>
  );
};

export default MemberFormValuesWrapper;
