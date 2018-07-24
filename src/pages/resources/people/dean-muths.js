// External Dependencies
import Helmet from 'react-helmet';
import React from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import FuturaParagraph from '../../../components/shared/futura-paragraph';

// Local Variables
const rootStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const imageStyles = {
  marginBottom: 0,
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | Dean Muths</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Dean Muths"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523153280/dean-muths.jpg"
        />
        <h2 css={headingNameStyles}>Dean Muths</h2>
        <CardHeadline>TMAC Past President, 2016-2017</CardHeadline>

        <FuturaParagraph>
          TMAC Past President's bio coming soon!
        </FuturaParagraph>
      </Container>
    </div>
  </div>
);
