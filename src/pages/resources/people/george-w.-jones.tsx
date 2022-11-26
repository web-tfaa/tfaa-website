// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import FuturaParagraph from '../../../components/shared/futura-paragraph';
import PeoplePage from '../../../components/shared/PeoplePage';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const name = 'George W. Jones';

// Component Definition
const GeorgeWJones: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146399/george-w-jones.png"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2010-2011</CardHeadline>
    <CardHeadline>2010 TMAC Outstanding Administrator</CardHeadline>

    <FuturaParagraph>
      George W. Jones has served as the Director of Fine Arts for the
      Garland Independent School District since 1997. In this capacity, he
      oversees the daily operations, curriculum, staff development, budget,
      and staffing for Music, Art, Theatre Arts, Dance and Competitive
      Speech. He is a constant advocate for the arts in education.
    </FuturaParagraph>
    <FuturaParagraph>
      Prior to assuming this administrative position, he served as a band
      director in Garland for 18 years teaching at Memorial Middle School,
      South Garland High School, Lakeview Centennial High School and Rowlett
      High School. He is still active as a clinician and adjudicator for
      music programs across the State of Texas.
    </FuturaParagraph>
    <FuturaParagraph>
      Mr. Jones is a native of Pekin, Illinois where he was mentored by “The
      Leader of the Band” Lawrence Fogelberg. He holds a Bachelor of Music
      Education degree from Illinois Wesleyan University and a Master of
      Music from Southern Methodist University. He is a member of the Texas
      Music Educators&apos; Association, the Texas Bandmasters Association, Phi
      Beta Mu honorary music fraternity, and the Texas Music Administrators&apos;
      Conference. He is also a lifetime member of the PTA. In 2018, he was honored
      with the Lifetime Administration Achievement Award from the
      Texas Bandmasters Association.
    </FuturaParagraph>
    <FuturaParagraph>
      In addition to his duties in the GISD, George has served as conductor
      of the Richardson Community Band since 1983. During his tenure as
      director of the band, the band has grown both in size and popularity.
      He instituted the band&apos;s summer series, which has become a favorite
      summer activity for families across the Metroplex. In 2010, George was
      presented with the “Real Heroes Award” by the Richardson Coalition for
      his service as conductor of the RCB. In 2011, the Richardson Arts
      Alliance presented him with the “Lifetime Achievement Award.”
    </FuturaParagraph>
    <FuturaParagraph>
      George is married to Donna Jones, a teacher in the Garland ISD, and
      they have two children and one grandson. He retired from Garland ISD
      in 2019 and passed away in 2022.
    </FuturaParagraph>
  </PeoplePage>
);

export default GeorgeWJones;
