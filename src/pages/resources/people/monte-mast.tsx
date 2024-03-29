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
const name = 'Monte Mast';

// Component Definition
const MonteMast: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523158748/monte-mast-1.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>2018 TMAC Outstanding Administrator</CardHeadline>

    <FuturaParagraph>
      Monte Mast is currently the Director of Fine Arts for the Klein
      Independent School District in Klein, Texas. A graduate of the
      University of Akron, he taught for one year in the Coventry Local
      School District before he was lured to teach in Texas. He spent five
      years at Calallen Middle School before accepting the position of
      Assistant Band Director at Klein Oak High School. In the 13 ½ years he
      spent as the assistant or associate at Klein Oak, his bands were UIL
      Sweepstakes winners, two time Best-in-Class and three time runner-up
      festival winners, and three time UIL Area Marching Contest
      participants. He became the first Fine Arts Program Coordinator for
      Klein ISD in January 2006 and stepped into the role of the Director of
      Fine Arts after the retirement of his mentor Bob Blanton in July 2007.
    </FuturaParagraph>
    <FuturaParagraph>
      As Klein ISD&apos;s Director of Fine Arts, Monte oversees the
      administration and personnel for the band, orchestra, choral,
      elementary music, theatre arts, dance, and visual art programs for the
      district&apos;s 5 high schools, 9 (soon to be 10) intermediates, and 31
      elementary campuses. He has been involved with bond planning,
      technology, curriculum, facilities design, professional development
      and GPA committees for the district. During his tenure as the Director
      of Fine Arts, he has successfully added 68 fine arts instructional
      positions, built an elementary art program where one did not exist,
      and increased fine arts stipends by over $400,000. He finished an
      instrument replacement plan for the district&apos;s 2015 bond plan that was
      approved that will include just under $5 million in funding with more
      than $1 million additionally for fine arts technology upgrades. During
      his tenure as Director of Fine Arts, ensembles from Klein ISD have
      been invited to perform at TMEA 11 times, the Midwest Clinic 6 times,
      the Music for All National Festival 8 times and Klein ISD was named a
      Best Community for Music by the NAMM Foundation 9 times.
    </FuturaParagraph>
    <FuturaParagraph>
      Monte has given presentations on diverse topics including how to get a
      teaching job, standards based fine arts grading, instrument
      evaluation, student motivation, effective presentation techniques and
      marching band adjudication. Monte is a member of and/or has made
      presentations to the Texas Music Educators Association, Texas Music
      Administrators Conference, Texas Bandmasters Association, Texas Art
      Educators Association, the Midwest Clinic, and the Conn-Selmer Music
      Administration Collaborative as well as multiple individual ISD&apos;s. He
      conducts the annual fine arts stipend survey for the Texas Music
      Administrators Conference and has done additional research on fine
      arts teacher certification trends in Texas.
    </FuturaParagraph>
    <FuturaParagraph>
      Whether as a performer, staff member, designer or judge, Monte&apos;s
      marching arts experiences have been important parts of shaping his
      career. His time in the Bluecoats and Phantom Regiment Drum Corps led
      him into becoming the primary visual designer for more than a dozen
      bands in Texas, Ohio, Missouri, and Kansas. He spent three years as a
      member of the Phantom Regiment brass instructional staff and was
      instructing the corps in 1996 when they won their first DCI title. He
      judged indoor guards for the Texas Color Guard Circuit for ten years
      including four championship panels. Between drum corps and marching
      band, he has judged contests in 40 states counting state championships
      in 11, including four UIL SMC assignments. Monte has judged for Drum
      Corps International since 2000 serving on six championship panels and
      also judges for Music for All/Bands of America.
    </FuturaParagraph>
    <FuturaParagraph>
      Monte recently celebrated his 20th anniversary with his wife Karen.
      They have two children Garrett (string bass player and theatre techie)
      and Julianne (artist and beginning oboist). In his limited spare time,
      Monte is a coffee connoisseur and an avid oenophile (wine geek).
    </FuturaParagraph>
  </PeoplePage>
);

export default MonteMast;
