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
const name = 'Nellie Ponikvar';

// Component Definition
const NelliePonikvar: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146399/nellie-ponikvar.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>2009 TMAC Outstanding Administrator</CardHeadline>

    <FuturaParagraph>
      Nellie Ponikvar is currently the Director of Fine Arts for the Socorro
      Independent School District and has served in this position since
      2001. She is currently completing her thirty-ninth year in education.
      Her teaching career began as the Band Director for Canutillo
      Independent School District in 1971. Her band was the first El Paso
      area band to compete in UIL competition. Nellie also worked for the
      Ysleta Independent School District as a teacher, campus administrator
      and Interim Fine Arts Director.
    </FuturaParagraph>
    <FuturaParagraph>
      Nellie attended the University of Texas at El Paso where she was an
      officer in Tau Beta Sigma for four years and Sigma Alpha Iota for two
      years. She received her degree in Music Education and later obtained
      Elementary Certification. She attended Sul Ross University where she
      received a Masters in Administration.
    </FuturaParagraph>
    <FuturaParagraph>
      She is currently the Executive Secretary for the University
      Interscholastic League, Region 22 and has held that position for the
      past 15 years. During her tenure, Region 22 has grown from one school
      district participation, to encompass all districts from Marfa, Texas
      to Anthony, Texas.
    </FuturaParagraph>
    <FuturaParagraph>
      Over the past nine years, groups in Socorro all participate in UIL
      competitions. One of its bands has been selected to participate in the
      State Marching Contest four times and the first elementary program in
      the El Paso area has been selected to perform at the Texas Music
      Educators Association Conference.
    </FuturaParagraph>
    <FuturaParagraph>
      She has served on the University Interscholastic League Technical
      Advisory Committee and been the region elementary chair for two years.
      Nellie organized the El Paso area Fine Arts Supervisors and has served
      as Area A Marching chair and co-chair. She served on the Board of
      Directors for the El Paso Wind Symphony and is a member of Phi Delta
      Kappa.
    </FuturaParagraph>
    <FuturaParagraph>
      Her honors include, Teacher of Month and finalist for campus Teacher
      of the Year. She was recently selected as a National Federation of
      High School Music Association&apos;s Outstanding Music Educator. In 2008-09
      Nellie was selected as the “Texas Music Administrator of the Year” by
      the Texas Music Administrators Conference.
    </FuturaParagraph>
    <FuturaParagraph>
      Nellie currently resides in El Paso, Texas with her family.
    </FuturaParagraph>
  </PeoplePage>
);

export default NelliePonikvar;
