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
const name = 'Dan White';

// Component Definition
const DanWhite: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146400/dan-white.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2007-2008</CardHeadline>

    <FuturaParagraph>
      Dr. Dan White has served as Fine Arts Curriculum Specialist for the
      Wichita Falls Independent School District, Wichita Falls, Texas, since
      1999. Prior to taking the position with the WFISD, White served as
      Director of Choral Activities at Midwestern State University, Wichita
      Falls, Texas, from 1992-99, where he also served as Music Program
      Chair from 1996-99, and Director of Choral Activities at Wayland
      Baptist University, Plainview, Texas, from 1985-92. White also taught
      high school choral music at Roswell High School, Roswell, New Mexico
      (1982-85) and Plainview High School, Plainview, Texas (1980-82).
      Choirs under the direction of Dr. White have performed at the Texas
      Music Educators Association Convention and for the American Choral
      Directors Association Southwest Division Conference Convention. White
      holds the Ph.D. in Fine Arts degree from Texas Tech University, Master
      of Music degrees in Choral Conducting and Theory and Composition from
      Eastern New Mexico University, and the Bachelor of Music Education
      degree from Wayland Baptist University.
    </FuturaParagraph>
  </PeoplePage>
);

export default DanWhite;
