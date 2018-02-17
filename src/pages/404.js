// External Dependencies
import React, { Component } from 'react';
import Link from 'gatsby-link';

// Internal Dependencies
import Card from '../components/shared/cards/card';
import CardHeadline from '../components/shared/cards/card-headline';
import Cards from '../components/shared/cards';
import Container from '../components/shared/container';
import FuturaParagraph from '../components/shared/futura-paragraph';
import MastheadBg from '../components/masthead/masthead-bg';

// Component Definition
export default class FourOhFour extends Component {
  render() {
    return (
      <div>
        <MastheadBg />
        <Container>
          <Cards>
            <Card css={{ width: '100%' }}>
              <h2>
                This is not the page you are looking for
              </h2>
              <FuturaParagraph>
                Try heading back to our <Link to={'/'}>main page</Link> to find out more about TMAC!
              </FuturaParagraph>
            </Card>
          </Cards>
        </Container>
      </div>
    );
  }
}
