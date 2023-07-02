// External Dependencies
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { isTodayAfterJuly31st } from '../../utils/helpers';
import { MemberFormValues } from './MemberRegisterContent';
import { SponsorFormValues } from './SponsorRegisterContent';
import FormDivider from '../shared/FormDivider';
import FormTitle from '../shared/FormTitle';
import LoginForm from './login-form';
import LoadingContainer from '../shared/LoadingContainer';
import RegistrationPausedAlert from '../shared/RegistrationPausedAlert';
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
    <FormDivider />
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

  // We normally shut down registration and sponsorship after TMEA each year and open it up on 7/1
  if (!isTodayAfterJuly31st) {
    return <RegistrationPausedAlert />;
  }

  return (
    <section>
      <FormTitle>
        1. Sign up for {appNameShort} website login
      </FormTitle>

      {dividerElement}

      {childrenElements}
    </section>
  );
};

export default RegisterEmail;
