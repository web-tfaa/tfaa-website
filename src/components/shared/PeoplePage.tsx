// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Container from './container';

// Sidebar data
import Layout from '../layout';

// Local Typings
interface Props {
  children: React.ReactNode;
  imgSrc?: string;
  location: Location;
  name: string;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.headingName': {
    marginBottom: theme.spacing(4),
  },
  '.image': {
    marginBottom: theme.spacing(2),
    maxWidth: '50%',
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
  <Layout
    location={location}
    pageTitle={name}
  >
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
      </Container>
    </StyledRoot>
  </Layout>
);

export default PeoplePage;
