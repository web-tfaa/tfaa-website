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
      <title>TMAC | David Lambert</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="David Lambert"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523145946/david-lambert.jpg"
        />
        <h2 css={headingNameStyles}>David Lambert</h2>
        <CardHeadline>2003 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          David Lambert served 33 years as a music educator and retired as Director of Fine Arts for the Fort Bend Independent School District in 2004. He holds a Bachelor of Music degree and a Master of Arts degree from Stephen F. Austin State University in Nacogdoches, Texas, where he studied percussion and band methods with Mel Montgomery, and composition with Dr. Richard A. Coolidge. He also completed post graduate study and certification in school supervision and school administration at the University of Houston.
        </FuturaParagraph>
        <FuturaParagraph>
          Under his leadership, Fort Bend Independent School district created a cadre of exemplary teachers. Over the last twelve years of his tenure as Director of Fine Arts, the school district’s bands and orchestras were recognized with three honor performances at the Texas Music Educators Association’s (TMEA) conference and received fifteen invitations to perform at the Midwest Clinic in Chicago, Illinois. Prior to his appointment as Director of Fine Arts, he served as Assistant Director of Bands in the Nacogdoches Independent School District and in the Fort Bend Independent School District at both Dulles Middle School and John Foster Dulles High School. In 1976, he was appointed as Director of Bands at Dulles High School. Under his direction, the John Foster Dulles High School Band received numerous awards in state and national competitions.
        </FuturaParagraph>
        <FuturaParagraph>
          He is an active clinician and consultant. The Texas Music Administrators Conference named him Texas Music Administrator of the Year for 2000-2001. The Texas Thespians awarded him the Outstanding Administrator’s Award in 2001. The Texas Bandmasters Association presented him with the Lifetime Achievement Award for Music Administration in 2003. He was inducted into the Stephen F. Austin University Bandmasters Hall of Fame in 2009 and received a Distinguished Alumnus Award from Nacogdoches High School in the same year. He is a member of the Texas Music Educators Association, Texas Bandmasters Association, Past President of Alpha Chapter of the International Band Fraternity, Phi Beta Mu, and is presently serving as the President for the Texas Music Adjudicators Association (2009-2011), Executive Secretary for UIL Music Region 17 and Executive Secretary for Phi Beta Mu International Bandmasters Fraternity.
        </FuturaParagraph>
        <FuturaParagraph>
          He and his wife, Sheryl, have been married for thirty eight years (2010). They reside in Missouri City, Texas and have two sons, Jason and Jonathon.
        </FuturaParagraph>
      </Container>
    </div>
  </div>
);
