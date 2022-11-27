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
        data: any;
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
