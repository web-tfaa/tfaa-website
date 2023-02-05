// External Dependencies
import { Helmet } from 'react-helmet';
import { firebase } from '../firebase';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import React, { ReactElement, useEffect, useState } from 'react';

// Internal Dependencies
import { FirebaseAuthUser } from '../types/shared';
import { appName, appNameShort } from '../utils/app-constants';
import AuthUserContext from '../components/session/AuthUserContext';
import Footer from './footer';
import TopNav from './nav/top-nav';
import theme from '../gatsby-theme-material-ui-top-layout/theme';

// Helpers
import presets from '../utils/presets';

// Import global styles, including custom fonts
import '../../styles/global.css';

// Local Typings
interface Props {
  children: ReactElement;
  location: Location;
  pageTitle?: string;
}
type AuthUserFromFirebase = FirebaseAuthUser | null;
export interface TfaaAuthUser {
  email: string;
  uid: string;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.main-body': {
    [presets.Desktop]: {
      minHeight: 'calc(100vh - 5rem)',
    },
    [theme.breakpoints.down('lg')]: {
      margin: 'inherit',
    },
    display: 'flex',
    flex: 1,
    paddingTop: 0,
    minHeight: 'calc(100vh - 5rem)',
  },

  '.main-content': {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.palette.shapes.topNavHeight,
    },
    [theme.breakpoints.up('mobile')]: {
      paddingLeft: 0,
      paddingTop: theme.palette.shapes.topNavHeight - 16,
    },

    width: '100vw',
  },

  '.sponsors': {
    [theme.breakpoints.up('mobile')]: {
      margin: '0 auto',
    },
    backgroundColor: theme.palette.altBackground,
  },

  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
}));

const formatAuthUser = (user: AuthUserFromFirebase): TfaaAuthUser | null => {
  if (!user) {
    return null;
  }

  return {
    email: user.email ?? '',
    uid: user.uid ?? '',
  };
};

// Component Definition
const DefaultLayout: React.FC<Props> = ({
  children,
  location: {
    pathname,
  },
  pageTitle,
}) => {
  const [authUser, setAuthUser] = useState<TfaaAuthUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      firebase.auth.onAuthStateChanged((authUser: AuthUserFromFirebase) => {
        console.log('DefaultLayout : useEffect : authUser', authUser);

        if (authUser) {
          setAuthUser(formatAuthUser(authUser));
        } else {
          setAuthUser(null);
        }
      });
    }
  }, []);

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <Helmet defaultTitle={appName}>
        <meta
          name="twitter:site"
          content="@TXMusicLeaders"
        />
        <meta
          name="og:type"
          content="website"
        />
        <meta
          name="og:site_name"
          content={appName}
        />
        <html lang="en" />
        {pageTitle && <title>{appNameShort} | {pageTitle}</title>}
      </Helmet>

      <AuthUserContext.Provider value={authUser}>
        <StyledRoot>
          <TopNav pathname={pathname} />

          <div className="main-body">
            <main className="main-content">
              {children}
            </main>
          </div>

          <Footer />
        </StyledRoot>
      </AuthUserContext.Provider>
    </StyledComponentsThemeProvider>
  );
};

export default DefaultLayout;
