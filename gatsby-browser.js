import { init } from '@sentry/gatsby';
import { BrowserTracing } from '@sentry/tracing';
import { Dedupe, ExtraErrorData } from '@sentry/integrations';

/**
 * Called when the Gatsby browser runtime first starts.
 */
export const onClientEntry = async () => {
  /**
   * Available Options: https://docs.sentry.io/error-reporting/configuration/?platform=browser
   */
  init({
    dsn: process.env.GATSBY_SENTRY_DSN,
    // release: __DYNAMIC_RELEASE_STRING__, // eslint-disable-line
    // environment: process.env.GATSBY_ACTIVE_ENV,
    // debug: process.env.GATSBY_SENTRY_DEBUG_MODE === 'true',
    maxBreadcrumbs: 50,
    autoSessionTracking: true,

    // You can log events to Sentry, even locally in development env, but you need to opt-in for it.
    // enabled: process.env.GATSBY_ACTIVE_ENV === 'production'
    // || process.env.GATSBY_SENTRY_DEBUG_MODE === 'true',

    normalizeDepth: 6,
    integrations: [
      new Dedupe(),
      new ExtraErrorData(),

      // This enables automatic instrumentation (highly recommended), but is not
      // necessary for purely manual usage
      new BrowserTracing({
        tracingOrigins: ['localhost', 'domain-a.nl', 'domain-b.be', /^\//],
      }),
    ],
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'CookieControl', // CookieBot related errors
      'webkitPresentationMode',
      'iFrameResizer',
      'iframe-resizer-react',
      'ChunkLoadError',
      'Pastease',
    ],
    denyUrls: [
      /accutics\.net/,
      /cookiebot\.com/,
      /doubeclick\.net/,
      /facebook\.net/,
      /google\.com/,
      /google-analytics\.com/,
      /googleadservices\.com/,
      /hotjar\.com/,
      /mopinion\.com/,
      /omappapi\.com/,
      /opmnstr\.com/,
      /zdassets\.com/,
      /zendesk\.com/,
      /zopim\.com/,
      /cdn\.optimizely\.com/,
    ],
    // beforeSend: (event) => {
    //   if (['production', 'staging'].includes(process.env.GATSBY_ACTIVE_ENV)) {
    //     // Debug messages will be shown for staging and production only
    //     // if GATSBY_SENTRY_DEBUG_MODE env var set to 'true'.
    //     // Fatal, error, warning and info messages will always be shown.
    //     return event.level !== 'debug' || process.en
    // v.GATSBY_SENTRY_DEBUG_MODE === 'true' ? event : null;
    //   }

    //   return null;
    // },
    beforeBreadcrumb: (breadcrumb) => {
      // All related to Hot Module Reloading locally, so no need to have it.
      if (breadcrumb.category === 'xhr' && breadcrumb.data && /socket.io\/\?EIO/.test(breadcrumb.data.url)) {
        return null;
      }

      if (breadcrumb.category === 'console' && /\[HMR\]/.test(breadcrumb.message)) {
        return null;
      }

      return breadcrumb;
    },
    // Stacktrace is always attached during errors.
    // If you want to see it also for debug, warning and info messages,
    //  set the GATSBY_SENTRY_DEBUG_MODE to 'true'
    // attachStacktrace: process.env.GATSBY_SENTRY_DEBUG_MODE === 'true',

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.02,
  });
};
