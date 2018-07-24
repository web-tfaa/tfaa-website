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
      <title>TMAC | Mollie Tower</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Mollie Tower"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/mollie-tower.jpg"
        />
        <h2 css={headingNameStyles}>Mollie Tower</h2>
        <CardHeadline>TMAC Past President, 1996-1997</CardHeadline>

        <FuturaParagraph>
          Mollie Tower teaches undergraduate courses in music education in the Texas State University School of Music. Before moving to Texas State, she was the National Music Consultant for Glencoe/McGraw-Hill Publishing Company for 6 years, and Supervisor of Choral and General Music for the Austin Independent School District for 21 years.
        </FuturaParagraph>
        <FuturaParagraph>
          Ms. Tower is a prolific writer. She is a Senior Author of three music textbooks series published by McGraw-Hill, NY, which have been adopted in Texas and are widely used throughout the United States and internationally. She created the concept, and continues to be the Senior Author and National Clinician for the Music Memory Program, a classical music listening curriculum for elementary children published by Arts Education IDEAS Publishing, Conn. Routledge Publishers, London, England, published her most recent publication, Using Music To Enhance Student Learning: A Practical Guide for Classroom Teachers, in January 2011.
        </FuturaParagraph>
        <FuturaParagraph>
          Ms. Tower has held leadership roles as an officer of the Music Educators National Conference, the Texas Music Administrators Conference, and the Texas Music Educators Conference. She continues to present workshops for public schools throughout the United States, at national, regional and state conferences, as well as the University of Texas Continuing Education Dept. In 2008, the Delta Kappa Gamma Society International named her “Austin Educator of the Year.”
        </FuturaParagraph>
        <FuturaParagraph>
          As a third generation educator, she is delighted that her two daughters – Debbie Tannert and Sheryl Maklary – are both master teachers in their fields. She also has a granddaughter, Christina Tannert, who is working toward a degree from Trinity University to become a Choral Director.
        </FuturaParagraph>
      </Container>
    </div>
  </div>
);
