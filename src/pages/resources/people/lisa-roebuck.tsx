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
const name = 'Lisa Roebuck';

// Component Definition
const LisaRoebuck: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="ar_1:1,c_fill,g_auto,w_1000/v1590082444/lisa-roebuck.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>2020 TMAC Outstanding Administrator</CardHeadline>
    <FuturaParagraph>
      Lisa Weinheimer Roebuck currently serves Round Rock ISD as the Director of Fine Arts.
      Round Rock ISD serves approximately 50,000 students that attend the district&apos;s 55
      campuses. The district offers numerous course selections for students in the areas of
      dance, music, theatre and visual art and is extremely proud of their strong and vital fine
      arts programs.
    </FuturaParagraph>
    <FuturaParagraph>
      Lisa grew up in Fredericksburg, Texas. She holds a Bachelor of Music Education from the
      University of Texas at Austin, a Kodály Music Certification from Texas State University
      and a Masters in Educational Leadership from Lamar University. She taught general music at
      the elementary level and choral music at the secondary level for 21 years. Lisa taught in
      both public and private schools before entering the world of full time fine arts
      administration in 2006. She presents professional development for other school districts
      and educational service centers in the areas of elementary music, choir, fine arts
      curriculum and program development.
    </FuturaParagraph>
    <FuturaParagraph>
      Lisa has served as the Elementary Music Region 26 Chair for the Texas Music Educators
      Association, and President of the Kodály Educators of Texas. She collaborated with
      &qout;The Vision Committee for Curriculum and Assessments in the Arts&qout; for the Texas
      Music Administration Conference/Texas Music Educators Association and was selected by the
      State Board of Education and worked on the Fine Arts TEKS Revision Committee.
    </FuturaParagraph>
    <FuturaParagraph>
      She is strongly committed to quality music and overall fine arts education in the state of
      Texas. She strives to accomplish this goal by offering a high level of professional
      development and supportive systems for the teachers who instruct the deserving and
      talented students in the state
    </FuturaParagraph>
  </PeoplePage>
);

export default LisaRoebuck;
