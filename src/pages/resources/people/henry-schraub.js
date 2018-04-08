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
      <title>TMAC | Henry Schraub</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523144823/henry-schraub.jpg"
        />
        <h2 css={headingNameStyles}>Henry Schraub</h2>
        <CardHeadline>2000 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Henry Schraub retired as Director of Fine Arts from the Birdville Independent School District in 2003 after serving in that position for twenty-seven years. Prior to this position, Mr. Schraub taught band and choir in the Seguin and Bishop, Texas Independent School Districts and was the Supervisor of Music and Director of Bands with the Weatherford, Texas Independent School District.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Schraub’s bands were consistent Sweepstakes winners in UIL competition, and his Bishop and Weatherford bands ranked third in the State Honor Band Competition sponsored by the Texas Music Educators Association. His Weatherford band also was selected “Best in Class” at the Tri-State Music Festival in Enid, Oklahoma. A number of his former students have pursued musical careers throughout the United States. Mr. Schraub regularly serves as a clinician and consultant throughout Texas and has served as an adjudicator at the district, regional, area and state levels.
        </FuturaParagraph>
        <FuturaParagraph>
          He presently serves as the conductor of The Greater Fort Worth Community Band. Mr. Schraub received his Bachelor of Music with honors and Master of Music degrees from the University of Texas at Austin and has completed additional work at the University of North Texas and Texas Women’s University. Mr. Schraub is a member of the Texas Music Educators Association, Texas Music Adjudicators Association, Texas Bandmasters Association, Phi Mu Alpha, Pi Kappa Lambda, and Phi Beta Mu National Honorary Bandmasters Fraternity.
        </FuturaParagraph>
        <FuturaParagraph>
          He served as TMEA Region 5 Band Chairman and Region 5 TMEA Chairman. He is a Past-President of the Texas Music Educators Association and the Texas Music Adjudicators Association. Mr. Schraub received the 2000 Outstanding Music Educator Award for Texas from the National Federation of Interscholastic Music Associations. He was named the 2002-2003 Music Administrator of the Year by the Texas Music Administrators Conference. The Birdville Independent School District was recognized as one of the “100 Best Communities for Music Education in America”. In 2007 Mr. Schraub was inducted into the Phi Beta Mu Texas Bandmasters Hall of Fame.
        </FuturaParagraph>
      </Container>
    </div>
  </div>
);
