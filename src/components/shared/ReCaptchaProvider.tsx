import React, { FC } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export const ReCaptchaProvider: FC = ({ children }) => {
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
