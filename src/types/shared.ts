export interface GatsbyContextProps {
  children: React.ReactNode;
  location: Location;
  navigate: (path: string) => void;
  pageContext: {
    slug: string;
  }
  pageResources: {
    component: React.ComponentType;
    head: React.ReactNode;
    json: {
      pageContext: {
        slug: string;
      }
      serverData: null | string;
    }
    page: {
      path: string;
    }
    staticQueryResults: {
      [key: string]: {
        data: unknown;
        id: string;
        name: string;
        page: {
          path: string;
        }
      }
    }
  }
  params: {
    slug: string;
  }
  path: string;
  serverData: null | string;
  uri: string;
}

export interface FirebaseAuthUser {
  $: () => void;
  $b: any;
  Aa: () => void;
  Ba: () => void;
  G: [];
  N: any;
  P: boolean;
  R: any;
  W: any;
  X: [];
  a: any;
  aa: any;
  b: any;
  ba: any;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  f: null;
  fb: null;
  ha: any;
  i: any;
  isAnonymous: boolean;
  l: string;
  m: string;
  metadata: any;
  multiFactor: any;
  o: string;
  oa: undefined;
  pa: null;
  phoneNumber: string | null;
  photoURL: null;
  providerData: any[];
  refreshToken: string;
  tenantId: null;
  u: any;
  uid: string;
  v: any;
  xa: boolean;
  ya: string;
  za: () => void;
  _lat: string;
}
