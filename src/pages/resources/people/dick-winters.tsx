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
const name = 'Dick Winters';

// Component Definition
const DickWinters: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146399/dick-winters.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 1983-1985</CardHeadline>

    <FuturaParagraph>
      Richard J. (Dick) Winters was born in Beaver Falls, PA on July 14,
      1929 to Harry R. and Ruth Winters. Following graduation from
      Hillsborough High School, Tampa, FL, he enlisted in the U.S. Marine
      Corps and served for two years. Following two years of service in the
      Marine Corps, Dick graduated in the 1963 charter class of the
      University of South Florida, with a B.A. in Music Education. Dick did
      post graduate studies at the Southwestern Baptist Theological Seminary
      in Fort Worth and received his MME degree in Guidance and Counseling
      from the University of North Texas.
    </FuturaParagraph>
    <FuturaParagraph>
      Dick began his teaching career in 1966 as choir director in the Plano
      Independent School District, at Plano High School and at Plano Senior
      High School. He went on to become the Director of Performing Arts for
      the Plano School District. He was the “Voice of the Wildcats” football
      team and then the “Voice of Two Great Cats” with the addition of Plano
      East Senior High School. He was elected the first president of the
      Texas Music Administrators Conference at the organizational meeting
      held during the TMEA convention in February of 1983. He was a
      long-time member of TMEA, TCDA, ACDA, and the North Central Texas
      Association for Supervision and Curriculum Development, as well as a
      music adjudicator for Oklahoma schools.
    </FuturaParagraph>
    <FuturaParagraph>
      Dick played saxophone in his church orchestra in addition to playing
      in the Plano Community Band, of which he was a founder. He organized
      and directed the Plano Community Chorus in 1968 and was a member of
      the Singing Men of North Central Texas. Dick was named one of the
      Plano ISD 100 Heroes and Plano Citizen of the Year 1975. He retired
      from Plano ISD in 1989 and passed away in 2010.
    </FuturaParagraph>
  </PeoplePage>
);

export default DickWinters;
