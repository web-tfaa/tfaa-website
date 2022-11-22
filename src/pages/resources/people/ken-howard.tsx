// External Dependencies
import { FC } from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import FuturaParagraph from '../../../components/shared/futura-paragraph';
import PeoplePage from '../../../components/shared/PeoplePage';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const name = 'Ken Howard';

// Component Definition
const KenHoward: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146399/ken-howard.png"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 1986-1987</CardHeadline>

    <FuturaParagraph>
      Samuel Ken Howard was born in Tyler, Texas and attended Tyler High
      School, where he was drum major of the band. During World War II, he
      served in the U.S. Army for three years in the 100th Infantry Division
      and at Seventh Army Headquarters, 18 months of which he was stationed
      in Germany and France.
    </FuturaParagraph>
    <FuturaParagraph>
      He received his Bachelor of Arts and Bachelor of Music degrees from
      Baylor, in 1949 and 1950. He earned a Bachelor of Sacred Music degree
      from Southwestern Theological Seminary in 1951, and a Master of
      Science degree from Baylor in 1965. After 15 years as choral director
      at Waco High School, he became Director of Music Education for the
      Waco Independent School District in 1964 and then Director of Fine
      Arts for WISD. He retired from the school system in 1991. During his
      tenure there he served often as adjudicator for University
      Interscholastic League Choral and Sight Reading Contests, as well as
      Solo and Ensemble Contests statewide, and he was a frequent clinician
      for school and church choral workshops. He also served as the Director
      of the Methodist Home Title I program for a number of years, and the
      Director of the WISD Elementary Gifted and Talented Program. Mr.
      Howard was the coordinator of the Children&apos;s Symphony programs, a
      collaboration of the Baylor Symphony and many area school districts,
      from 1964 to 1992. For 51 years, he also directed church choirs,
      serving successively as Minister of Music at Emmanuel Baptist Church,
      Columbus Avenue Baptist Church, Bellmead First Baptist Church, and
      Park Lake Drive Baptist Church. After retiring, he attended First
      Baptist Church.
    </FuturaParagraph>
    <FuturaParagraph>
      Mr. Howard was active in state and national professional
      organizations, holding offices including National Elementary Committee
      Chairman for the American Choral Directors Association, Vice President
      of the Texas Choral Directors Association, and Vice President of the
      Texas Music Educators Association. He served on the Texas State
      Textbook Committee. Locally, Mr. Howard was a member of the board of
      directors, and later president of the Waco Civic Chorus; he also
      served on the boards of the WISD Foundation, the Greater Waco Council
      for the Arts, and the Central Texas Council for Music Education. In
      retirement, he was active in the Waco Welcome Corps, the Coalition for
      Music Education, and the Gideons International. In 1988, Baylor
      University School of Music awarded him special recognition for
      distinguished service in music education. In 2001, a group of former
      high school students and friends established a scholarship at Baylor
      in his honor, and in 2008, he was honored with the Distinguished
      Retired Faculty Award by the WISD Education Foundation.
    </FuturaParagraph>
  </PeoplePage>
);

export default KenHoward;
