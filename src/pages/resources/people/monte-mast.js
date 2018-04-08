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
  width: '45%',
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | Monte Mast</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523157022/monte-mast.jpg"
        />
        <h2 css={headingNameStyles}>Monte Mast</h2>
        <CardHeadline>2018 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          More information coming soon!
        </FuturaParagraph>
      </Container>
    </div>
  </div>
);
