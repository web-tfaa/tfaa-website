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
const name = 'Jan Schronk';

// Component Definition
const JanSchronk: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523145741/jan-schronk.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 1990-1992</CardHeadline>
    <CardHeadline>2002 TMAC Outstanding Administrator</CardHeadline>

    <FuturaParagraph>
      Jan Schronk was born in Indianapolis, Indiana, June 30, 1938, to
      Edward and Grace Raasch. Three and a half years later her brother,
      Douglas, was born. Her family moved to Vincennes Indiana and to Mt.
      Vernon Illinois where the band program began in the fifth grade. After
      seeing a Tommy Dorsey short film Jan informed her parents she wanted
      to play the trombone. When her parents could not convince her that a
      flute or clarinet was more appropriate for a young lady, she began a
      long relationship with the trombone. She won first divisions on class
      one solos under the direction of her high school band director, Lloyd
      Cook in Corpus Christi, Texas. It was during high school that she also
      auditioned for and participated in the acapella choir with George
      Smith. Playing the trombone continued during her freshman year in
      college and choir throughout her college career.
    </FuturaParagraph>

    <FuturaParagraph>
      At fourteen, Jan began working at a local Corpus Christi radio station
      and at fifteen, she worked in television. Her weekly program,
      Chalktalks with Jan, continued through her sophomore year in college.
    </FuturaParagraph>

    <FuturaParagraph>
      Jan attended Southwestern University in Georgetown, Texas on a full
      scholarship. Theatre and English were her majors, but music continued
      to play an important part in her life. She received her Master of
      Science from the University of North Texas and her Mid-Management
      Certification from Texas Women&apos;s University in Denton.
    </FuturaParagraph>

    <FuturaParagraph>
      After moving to Dallas, Jan accepted a contract with the Dallas
      Independent School District on a Wednesday morning. On Wednesday
      afternoon KERA offered her a position. Timing directed her career. She
      taught a course called auditorium at Nathaniel Hawthorne Elementary
      School. Jan had sixty to ninety students every thirty minutes.
      Responsibilities included creative drama, Roberts Rules of Order
      within a weekly club meeting, and responsibility for one program per
      month. She learned how important it was to work with the music teacher
      during this period.
    </FuturaParagraph>

    <FuturaParagraph>
      Jan&apos;s son was born in 1960. Chip works for HBO PPV in New York City as
      Manager-Operations. He has performed with Granbury Opera House and
      written and performed his own play off Broadway. He has played trumpet
      since junior high, and as an adult plays piano and flute. His wife,
      Judy, a former Broadway dancer, is a published novelist and director
      of The Writer&apos;s Circle, an enrichment and professional development
      program for creative writers, teachers and children in West Orange,
      New Jersey. Grandsons Colin and Cooper take viola and piano lessons
      and are the most loved grandsons in the world.
    </FuturaParagraph>

    <FuturaParagraph>
      In 1970, Jan began her career with Hurst-Euless-Bedford ISD at Central
      Junior High School. In 1974, she transferred to Trinity High School to
      head the theatre department. She has also taught and directed plays at
      Tarrant Community College. As an actress, Jan has performed at TCC,
      Circle Theatre, Casa Manana, and various community theatres.
    </FuturaParagraph>

    <FuturaParagraph>
      Jan met her husband, Stacy Schronk, in 1971, when auditioning for a
      role at TCC. Stacy was head of the theatre department at TCC for
      thirty-three years. He holds a Bachelor Degree in Vocal Music
      Education and a Master of Fine Arts degree in Musical Theatre from the
      University of Oklahoma. He has performed at Casa Manana, Granbury
      Opera House, and Lyric Theatre in Oklahoma City. They have been
      married since 1972.
    </FuturaParagraph>

    <FuturaParagraph>
      When Jerry Longwell retired as Director of Fine Arts for the HEB
      school district, Jan decided to apply for the position. From 1986 to
      May of 2000, Jan enjoyed working with dedicated fine arts teachers and
      a district supportive of the arts. During her tenure as Director of
      Fine Arts, band assistants were added to all five junior high schools
      and assistant choir directors were hired for the junior and senior
      high choral programs. The District Elementary Choir was instituted and
      full time elementary music teachers were added to all elementary
      schools, completing the initiative started by Jerry Longwell. The
      Suzuki String Program was added to the elementary music program and an
      orchestra program developed at the junior high and high school levels
      as students moved through the system. Group honors achieved during
      this time included State Marching Champion, BOA champion, TMEA Junior
      High Honor Band, and guest groups invited to perform from the band and
      choir programs, in addition to the elementary district choir singing
      during the convention. She has served on the UIL Musical Technical
      Committee., and was a member of TMEA, TCDA and TBA.
    </FuturaParagraph>

    <FuturaParagraph>
      Jan would like to thank TMEA and the Texas Music Administrators
      Conference for welcoming her into the organizations and supporting her
      in her role as Director of Fine Arts for HEB-ISD.
    </FuturaParagraph>
  </PeoplePage>
);

export default JanSchronk;
