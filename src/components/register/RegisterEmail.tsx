// External Dependencies
import Divider from '@mui/material/Divider';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { MemberFormValues } from './MemberRegisterContent';
import { SponsorFormValues } from '../../pages/sponsors/register';
import LoginForm from './login-form';
import LoadingContainer from '../shared/LoadingContainer';
import SignInUpElement from './sign-in-up-element';
import SignUpForm from './SignupForm';

// Local Typings
interface Props {
  isAuthenticated: boolean;
  onCompleteStep: (
    step: number,
    updatedMemberForm?: MemberFormValues | SponsorFormValues,
  ) => void;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.registerStep1Divider': {
      backgroundColor: theme.palette.tfaa.resources,
      height: 3,
      margin: theme.spacing(1, 0, 4),
  },
  '.registerStep1Title': {
      fontSize: 34,
      fontWeight: 900,
  },
}));

// Component Definition
const RegisterEmail: React.FC<Props> = ({
  isAuthenticated,
  onCompleteStep,
}) => {
  const [viewingSignUp, setViewingSignUp] = useState(true);
  const [hasCompletedRegisterEmail, setHasCompletedRegisterEmail] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isAuthenticated && hasCompletedRegisterEmail) {
      timer = setTimeout(() => onCompleteStep(0), 2000);
    }
    return () => clearTimeout(timer);
  }, [hasCompletedRegisterEmail, isAuthenticated]);

  // Handler Functions
  const handleClickSignInLink = useCallback(() => {
    setViewingSignUp(false);
  }, []);

  const handleUpdateCompletedStep = useCallback(() => {
    setHasCompletedRegisterEmail(true);
  }, []);

  const dividerElement = useMemo(() => (
    <Divider className="registerStep1Divider" />
  ), []);

  const showLoadingContainer = isAuthenticated && hasCompletedRegisterEmail;

  const childrenElements = useMemo(() => (showLoadingContainer? (
    <LoadingContainer
      step={2}
      title="Login Successful"
    />
  ) : (
    <>
      <SignUpForm onRegisterSignUp={handleUpdateCompletedStep} />

      {dividerElement}

      <SignInUpElement
        onClickSignIn={handleClickSignInLink}
        viewSignUp={false}
      />

      {!viewingSignUp && (
        <LoginForm onRegisterLogin={handleUpdateCompletedStep} />
      )}
    </>
  )), [
    dividerElement,
    handleClickSignInLink,
    handleUpdateCompletedStep,
    showLoadingContainer,
    viewingSignUp,
  ]);

  return (
    <StyledRoot>
      <Typography className="registerStep1Title">
        1. Sign up for {appNameShort} website login
      </Typography>

      {dividerElement}

      {childrenElements}
    </StyledRoot>
  );
};

export default RegisterEmail;
