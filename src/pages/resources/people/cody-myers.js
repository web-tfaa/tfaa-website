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
      <title>TMAC | Cody Myers</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Cody Myers"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/cody-myers.jpg"
        />
        <h2 css={headingNameStyles}>Cody Myers</h2>
        <CardHeadline>TMAC Past President, 2003-2004</CardHeadline>
        <CardHeadline>2015 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Cody Myers has been the Director of Fine Arts for Amarillo ISD since July, 1997. On his watch the music program in Amarillo, Texas has flourished and it’s performing ensembles have continued their history of outstanding accomplishments. Myers and his staff  are responsible for staffing, budget, curriculum, staff development, and administrative support for Music, Art, Theatre, and Dance in Amarillo ISD. Myers is  an advocate for the arts through state affiliations and his local activity as a liaison with UIL and local arts organizations. He has served on a number of boards of directors for arts organizations in Amarillo, including the Amarillo Symphony, Greater Southwest Music Festival, Amarillo Youth Orchestra, TriState Fair Parade, and the steering committee for Window on a Wider World, to name a few.
        </FuturaParagraph>
        <FuturaParagraph>
          Cody Myers earned both his Bachelor of Music Education and Master of Education degrees from West Texas State University in Canyon, Texas where he was a trumpet student of Dave Ritter and a band student of his mentor, Dr. Gary Garner. Prior to his appointment in Amarillo, Cody taught band in Tulia, Dimmitt, Dumas, and Midland High School. His bands were consistent winners in UIL competitions and festivals for both concert and marching band. Myers’ bands have appeared in the UIL State Marching Band Contest, TMEA Honor Band semifinals for 3A and 5A, and the 1995 George W. Bush Gubernatorial Parade in Austin. Many of Myers’ students have been named to the Texas All State Band and have gone on to successful careers as music faculty or professional musicians throughout the United States.
        </FuturaParagraph>
        <FuturaParagraph>
          Myers is a very active clinician, judge, and consultant throughout Texas and the southern United States. In addition to his work with ensembles in Amarillo ISD, he conducts over one hundred clinics annually and has twice been named Conductor in Residence for the St. George’s School in Vancouver, British Columbia. Cody is a guest lecturer in music education at universities across the state. He has participated in workshops and clinics for TBA, TMEA, and TMAC.
        </FuturaParagraph>
        <FuturaParagraph>
          Cody Myers holds membership in the Texas Music Educators Association, Alpha Chapter of Phi Beta Mu, and is Past President of both the Texas Music Administrators Conference and the Texas Bandmasters Association. He served six years on the UIL Technical Advisory Committee. Mr. Myers performs with the First Baptist Church Orchestra in Amarillo. He is married to Starrla, a first grade teacher and sign language specialist. They have two grown children. Kaci serves in the United States Navy, and Holt served as a United States Marine.
        </FuturaParagraph>
      </Container>
    </div>
  </div>
);
