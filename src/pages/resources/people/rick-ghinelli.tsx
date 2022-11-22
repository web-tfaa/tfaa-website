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
const name = 'Rick Ghinelli';

// Component Definition
const RickGhinelli: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146399/rick-ghinelli.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2013-2014</CardHeadline>

    <FuturaParagraph>
      Rick Ghinelli graduated from the University of Houston with a Bachelor
      of Music Education and earned his Masters of Administration from Sam
      Houston State University. He retired in 2013 after working 31 years in
      the Spring Independent School District. He was a successful middle
      school band director, and his bands earned a number of awards on both
      the local and state levels, including being selected as a finalist in
      the Texas Music Educators Association Honor Band Competition. Mr.
      Ghinelli continued his career in Spring ISD as an elementary assistant
      principal, a middle school assistant principal, and a middle school
      principal. In 2000, he was offered the position of Director of
      Performing and Visual Arts for the district, a position he held until
      his retirement. During that time, Mr. Ghinelli was fortunate to work
      with a number of very talented fine arts teachers, whose programs
      consistently earned the highest awards at the local, state, and
      national levels including a Bands of America Grand Championship and
      multiple appearances at TMEA and the Midwest Band and Orchestra
      Clinic.
    </FuturaParagraph>
    <FuturaParagraph>
      In 2012, Mr. Ghinelli received the Administrator of the Year award
      from Culture Shapers, a Houston-based organization dedicated to
      supporting the arts in schools. In 2013, he was inducted into the
      Alpha Chapter of Phi Beta Mu, and in 2014, he was honored as the
      Distinguished Alumnus in Music Education from the Moores School of
      Music at the University of Houston.
    </FuturaParagraph>
    <FuturaParagraph>
      In his current position as the Educational Support Manager in the
      Division of Education for Conn-Selmer, Inc., Rick continues to be a
      strong advocate for music education and is a frequent presenter at
      conferences, universities and school districts across Texas and the
      nation. He also continues to take an active role in music
      administration as a leader in the Music Administration Collaborative,
      a Conn-Selmer initiative to create a nationwide network of music
      education leaders.
    </FuturaParagraph>
  </PeoplePage>
);

export default RickGhinelli;
