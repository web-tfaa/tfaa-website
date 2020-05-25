// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

// Internal Dependencies
import Card from '../components/shared/cards/card';
import Cards from '../components/shared/cards';
import Container from '../components/shared/container';
import FuturaParagraph from '../components/shared/futura-paragraph';
import Layout from '../components/layout';
import MastheadBg from '../components/masthead/masthead-bg';

// Component Definition
const FourOhFour = ({ location }) => (
  <Layout location={location}>
    <MastheadBg />
    <Container hasSideBar={false}>
      <Cards>
        <Card css={{ width: '100%' }}>
          <h2>This is not the page you are looking for</h2>
          <FuturaParagraph>
            Try heading back to our <Link to="/">main page</Link> to find out
            more about TMAC!
          </FuturaParagraph>
        </Card>
      </Cards>
    </Container>
  </Layout>
);

FourOhFour.propTypes = {
  location: PropTypes.shape({}).isRequired,
};
export default FourOhFour;
