// External Dependencies
import React, { FC } from 'react';
import { Link } from 'gatsby-theme-material-ui';
import styled from 'styled-components';

// Internal Dependencies
import Card from '../components/shared/cards/card';
import Cards from '../components/shared/cards';
import Container from '../components/shared/container';
import FuturaParagraph from '../components/shared/futura-paragraph';
import Layout from '../components/layout';
import MastheadBg from '../components/masthead/masthead-bg';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledCard = styled(Card)({
  width: '100%'
});

// Component Definition
const FourOhFour: FC<Props> = ({ location }) => (
  <Layout location={location}>
    <MastheadBg />
    <Container hasSideBar={false}>
      <Cards>
        <StyledCard>
          <h2>This is not the page you are looking for</h2>
          <FuturaParagraph>
            Try heading back to our <Link to="/">main page</Link> to find out
            more about TMAC!
          </FuturaParagraph>
        </StyledCard>
      </Cards>
    </Container>
  </Layout>
);

export default FourOhFour;
