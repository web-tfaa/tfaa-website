// External Dependencies
import * as Sentry from '@sentry/gatsby';

export const logError = (
  errorMessage: string,
  originalError: Error
): void => {
  // Let's not log errors to Sentry if we are testing
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
    console.error(errorMessage);

    // The Error constructor always has a "message"
    console.error(originalError.message);

    console.error(JSON.stringify(originalError));

    // We send to Sentry, which also captures what happened just before this
    Sentry.captureException(originalError, {
      extra: {
        customMessage: errorMessage,
      },
    });
  }
};
