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
const name = 'Woody Schober';

// Component Definition
const WoodySchober: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523131020/history_woody-schober.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 1985-1986 </CardHeadline>
    <CardHeadline>1999 TMAC Outstanding Administrator</CardHeadline>

    <FuturaParagraph>
      Woody Schober is the retired Director of Performing Arts for the
      Irving Independent School District. A former band and choral director,
      Schober has conducted instrumental and vocal organizations and has
      served as a teacher and music administrator for the past fifty-one
      years. He is founder and past director of the Irving Boys Choir. In
      addition, he has conducted choral workshops and is an active
      adjudicator for the Texas Music Adjudicators Association.
    </FuturaParagraph>
    <FuturaParagraph>
      Mr. Schober has a Bachelor of Music degree from North Texas State
      University and a Master of Science degree from East Texas State
      University. He has been president of the Texas Music Educators
      Conference, Texas Music Administrators Association, which he was one
      of the founders, and has served as chairman for various state and
      national Music Educators National Conference committees.
    </FuturaParagraph>
    <FuturaParagraph>
      In his community, he retired as Minister of Music at Oak View Baptist
      Church and received the Music Ministry Award of Distinction in 2005.
      He also is a past member of the Irving Arts Board. He was organizer
      and coordinator of the Irving Centennial Choir in 2003. He was
      selected to be Irving&apos;s High Spirited Citizen in 1988.
    </FuturaParagraph>
    <FuturaParagraph>
      He is a current member of the Entertainment Series of Irving Board of
      Directors. He is a current member and past president of the Irving
      Noon-Day Lions Club. He sings with the Singing Men of Texas and
      conducts the Irving Silvertones. His wife, Carol, is a retired teacher
      and his daughter, Lynn, works at the Irving Independent School
      District Administration Building. His son, David, and family live in
      Nashville where he is a recording engineer. In addition to their
      children, Carol and Woody have five wonderful grandchildren and one
      great-grandchild. Two of their grandchildren and a son-in-law also
      work in the Irving Independent School District.
    </FuturaParagraph>
  </PeoplePage>
);

export default WoodySchober;
