// External Dependencies
import React, { FC } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Component Definition
export const ReCaptchaProvider: FC<Props> = ({ children }) => {
  const googleRecaptchaSiteKey = process.env.GATSBY_GOOGLE_RECAPTCHA_SITE_KEY;

  if (!googleRecaptchaSiteKey) {
    return null;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={googleRecaptchaSiteKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
};
