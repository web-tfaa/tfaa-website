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
const name = 'James Drew';

// Component Definition
const JamesDrew: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1567444074/james-drew.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>2019 TMAC Outstanding Administrator</CardHeadline>
    <FuturaParagraph>
      Since 2011, James Drew has served as the Director of Fine Arts
      for the Fort Bend Independent School District in Sugar Land, Texas. Prior to this
      appointment as Fine Arts Director, James conducted bands and orchestras in the Texas
      public schools for 21 years, one year in Killeen, Texas and the remaining 20 years in Fort
      Bend ISD. Ensembles under James&apos;s direction have been selected as state Honor Band
      finalists and performed at the prestigious Midwest Clinic on four separate occasions.
      James was chosen the Outstanding Young Bandmaster of the Year in 1997 by the honorary band
      director&apos;s fraternity, Phi Beta Mu.
    </FuturaParagraph>
    <FuturaParagraph>
      Since his appointment as Fine Arts Director, James has worked tirelessly to advance the
      Department&apos;s vision of becoming the premier school districts for Fine Arts education in
      the nation. With the Department&apos;s support, FBISD performing
      groups and individual students
      continue to garner state and national recognition. Under James&apos;s leadership, FBISD has
      added 134 teaching positions, three administrative positions, and two clerical positions
      to support Arts education. The Department&apos;s annual budget has increased from $1.5 million
      to $3.1 million and the District has purchased over $5 million in new instruments to
      replace aging inventory. To develop teaching capacity among
      FBISD&apos;s Fine Arts staff, James
      established a job-embedded professional growth model, linking classroom observations with
      professional coaching. He worked collaboratively with stakeholders to create an innovative
      program evaluation system to promote excellence in all artistic disciplines. James has
      implemented new curricula for the District&apos;s 80-plus Fine Arts courses, established a
      progressive arts-integration teacher network, and initiated an El-Sistema-type,
      after-school string program. James recently was named the 2019 Music Administrator of the
      Year by the Texas Music Administrators Conference.
    </FuturaParagraph>
    <FuturaParagraph>
      James earned a Bachelor of Music Education degree from Oral Roberts University, a Master
      of Music degree in Instrumental Conducting from West Texas State University, and a Master
      of Arts in Psychology degree from Houston Baptist University. James holds membership in
      the Texas Music Educators Association, Texas Bandmasters Association, Texas Music
      Administrators Conference, Alpha Chapter of Phi Beta Mu, and currently serves as the
      Concert Band Vice-President for the Texas Music Adjudicators Association.
    </FuturaParagraph>
  </PeoplePage>
);

export default JamesDrew;
