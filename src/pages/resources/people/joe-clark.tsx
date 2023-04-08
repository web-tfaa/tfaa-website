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
const name = 'Joe Clark';

// Component Definition
const JoeClark: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1566826627/joe-clark.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2020-2021</CardHeadline>

    <FuturaParagraph>
      Dr. Joe Clark is in his 24th year in education and his tenth year as the
      Director of Performing and Visual Arts for the Spring Independent School
      District in Houston, Texas. Prior to administration, Dr. Clark served
      as a band director in several schools in Spring ISD including Spring High
      School, Bammel Middle School, and Claughton Middle School, as well as,
      Industrial Jr. High and Industrial High School in Industrial ISD.
      While in these positions, his ensembles have placed in the State finals,
      received “Best-in-Class” at concert band and jazz festivals and
      Sweepstakes at UIL. While at Spring High School, he co-directed Midwest
      performances in 2008, 2009 and led the Spring High School Jazz Ensemble
      at the 2010 Midwest Clinic.
    </FuturaParagraph>

    <FuturaParagraph>
      As a strong advocate of the fine arts and arts integration, Dr. Clark
      remains active as a clinician, guest lecturer and mentor for young
      teachers as well as an active UIL adjudicator. He is also proud to have
      previously served as a President of the Texas Fine Arts Administrators
      (TFAA) organizaiton.
    </FuturaParagraph>

    <FuturaParagraph>
      Dr. Clark earned his B.M. in music and his M.M. in conducting from Sam
      Houston State University; and his Ed.D. in Educational Leadership from
      the University of Houston.  Dr. Clark is a proud member of Phi Beta Mu
      (Alpha Chapter), Kappa Kappa Psi, Phi Mu Alpha Sinfonia, TMEA, TBA, and
      TMAA. Joe and his wife Heather reside in Spring, Texas with their
      7-year-old daughter, Darcy Anne Clark whose favorite color is pink and
      just put two hands together in her last piano recital!
    </FuturaParagraph>
  </PeoplePage>
);

export default JoeClark;
