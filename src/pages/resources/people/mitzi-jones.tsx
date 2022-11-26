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
const name = 'Mitzi Jones';

// Component Definition
const MitziJones: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146400/mitzi-jones.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2005-2006</CardHeadline>
    <CardHeadline>2013 TMAC Outstanding Administrator</CardHeadline>

    <FuturaParagraph>
      Mitzi Jones is in her thirteenth year as a fine arts administrator for
      the Katy Independent School District. As Assistant Director of Fine
      Arts, Mitzi&apos;s supervisory role includes elementary music, elementary
      theatre and visual arts kindergarten through twelfth grade. She is
      directly involved with curriculum, professional development, fine arts
      facility and operations as well as various other district fine arts
      organizational events.
    </FuturaParagraph>
    <FuturaParagraph>
      Mitzi holds a Bachelor of Education with a Music Minor and emphasis in
      elementary music education from Sam Houston State University, where
      she was listed in Who&apos;s Who in American Colleges and Universities,
      enjoyed her role as principal violinist, and served as president of
      the student chapter of the American String Teachers&apos; Association. She
      studied Kodály pedagogy with Virginia Irvin and Dr. Alan Strong. Later
      in her educational career, she obtained a Master of Supervision and
      Instruction with music emphasis from Sam Houston State University.
    </FuturaParagraph>
    <FuturaParagraph>
      During Mrs. Jones&apos; career in the Katy ISD Fine Arts Department, she
      initiated the organization and development of the district&apos;s
      Elementary Honor Choir. The choir is in its eleventh season with two
      successful performances at TMEA&apos;s State Convention and appearances at
      the Houston Children&apos;s and the Aldine Children&apos;s Choir Festival as
      well as the Texas Association of School Administrator&apos;s opening
      ceremony.
    </FuturaParagraph>
    <FuturaParagraph>
      While working with fifty-two campuses and over one hundred and fifty
      fine arts teachers, Mitzi has had the honor of being awarded the
      prestigious greater Houston area&apos;s Culture Shapers&apos; Art Administrator
      of the Year (2004). Mrs. Jones is an active member of TAEA (Region IV
      Representative 2002-03), TMEA and TMAC and enjoys serving the Katy
      community in its many faceted fine arts opportunities.
    </FuturaParagraph>
    <FuturaParagraph>
      Mitzi and her husband Michael (orchestra director, Katy ISD Mayde
      Creek High School) have two sons. Matthew is a student at Texas A & M
      University and Philip is beginning his journey as a Katy High School
      Tiger. She enjoys performing on her principle instrument, violin,
      gardening, volunteering at church and school and being a proud and
      loud Katy Tiger Varsity football fan!
    </FuturaParagraph>
  </PeoplePage>
);

export default MitziJones;
