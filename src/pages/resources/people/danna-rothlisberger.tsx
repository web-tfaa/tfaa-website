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
const name = 'Danna Rothlisberger';

// Component Definition
const DannaRohtlisberger: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146399/danna-rothlisberger.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2002-2003</CardHeadline>

    <FuturaParagraph>
      Dr. Danna Rothlisberger retired as the Director of Performing Arts for
      the Lewisville Independent School District, a position he held from
      1992-2007. Dr. Rothlisberger implemented the orchestra program in
      LISD. Additionally, he founded the LISD Fifth Grade Honor Choir.
      During his tenure, many LISD groups were awarded state and national
      honors. LISD was selected as one of the Top 100 Communities for Music
      Education on several occasions.
    </FuturaParagraph>
    <FuturaParagraph>
      Prior appointments included: Director of Secondary Music and Director
      of Bands for the Grapevine-Colleyville ISD, 1988-1992; Director of
      Bands at L.D. Bell HS in the Hurst-Euless-Bedford ISD, 1984-1988; L.D.
      Bell assistant band director, 1979-1984; Director of Bands, Mount
      Vernon I.S.D., 1978-79. He started his career in Greenville, Texas
      where he worked as the high school assistant band director in
      1974-1975 before becoming the Director of Bands at the junior high,
      1975-1978. He received a Bachelor of Music Education degree in 1974
      and a Master of Music Degree in Music Education in 1977 from East
      Texas State University, Commerce, Texas. He was awarded a Doctor of
      Education degree in May of 1995 also from East Texas State University,
      now Texas A&M—Commerce.
    </FuturaParagraph>
    <FuturaParagraph>
      Dr. Rothlisberger held memberships in the Texas Music Administrators
      Conference, serving as the secretary-treasurer from 1997-99,
      vice-president from 1999-2001 and president in 2002-2003; Texas
      Bandmasters Association, Texas Orchestra Directors Association; Texas
      Music Adjudicators Association; Texas Music Educators Association;
      Music Educators National Conference; Phi Beta Mu; Phi Delta Kappa,
      Lake Cities Chapter, serving as president in 1995; Association for
      Supervision and Curriculum Development, Texas Choral Directors
      Association; Texas Educational Theatre Association; Alpha Chi; Phi Eta
      Sigma; and International Who’s Who of Professionals.
    </FuturaParagraph>
    <FuturaParagraph>
      Dr. Rothlisberger received the Administrators Excellence Award from
      the Texas Chapter of the American Sting Association with NSOA in
      February 2002.
    </FuturaParagraph>
    <FuturaParagraph>
      Dr. Rothlisberger now lives in Provo, UT with his lovely wife,
      Suzette.
    </FuturaParagraph>
  </PeoplePage>
);

export default DannaRohtlisberger;
