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
const name = 'Patricia Moreno';

// Component Definition
const PatriciaMoreno: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523131020/Moreno.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2018-2019</CardHeadline>
    <FuturaParagraph>
      Patricia Moreno, M.M., currently serves as the Austin ISD
      Instructional Coordinator of General Music and Choral Music, leading one hundred thirty
      music educators that instruct approximately forty thousand students in music and choral
      music classes. She taught general and choral music for seventeen years in Hays
      Consolidated ISD in Title I schools. She is the co-founder and Director of the Kodály
      Certification Program at Texas State University. She was also appointed by the State Board
      of Education to serve on the revised Texas Essential Knowledge and Skills (TEKS)
      committee; co-author of an article, “Fine Arts TEKS Revisions Complete” in TMEA&apos;s
      Southwestern Musician, reviewer for Oxford University Press and presents workshops across
      the state.
    </FuturaParagraph>
  </PeoplePage>
);

export default PatriciaMoreno;
