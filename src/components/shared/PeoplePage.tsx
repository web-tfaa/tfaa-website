// External Dependencies
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// Internal Dependencies
import Container from './container';

// Sidebar data
import Layout from '../layout';
import resourcesSidebar from '../../pages/resources/resources-links.yml';
import MobileSidebar from './MobileSidebar';
import SidebarBody from './sidebar/SidebarBody';

// Local Typings
interface Props {
  children: React.ReactNode;
  imgSrc?: string;
  location: string | unknown;
  name: string;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.headingName': {
    marginBottom: theme.spacing(4),
  },
  '.image': {
    marginBottom: 0,
  },

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));

// Component Definition
const PeoplePage: FC<Props> = ({
  children,
  imgSrc = '',
  location,
  name,
}) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | {name}</title>
    </Helmet>

    <StyledRoot>
      <Container>
        {imgSrc ? (
          <img
            alt={name}
            className="image"
            src={`https://res.cloudinary.com/tmac/image/upload/${imgSrc}`}
          />
        ) : null}

        <h2 className="headingName">{name}</h2>

        {children}

        <MobileSidebar>
          <SidebarBody
            inline
            yaml={resourcesSidebar}
          />
        </MobileSidebar>
      </Container>
    </StyledRoot>
  </Layout>
);

export default PeoplePage;
