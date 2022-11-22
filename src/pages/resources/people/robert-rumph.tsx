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
const name = 'Robert Rumph';

// Component Definition
const RobertRumph: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146400/robert-rumph.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2009-2010</CardHeadline>

    <FuturaParagraph>
      Upon high school graduation from Enid, Oklahoma, Robert came to Texas
      as quickly as possible! He attended West Texas A&M University in
      Canyon where he earned his full Texas citizenship by marrying his wife
      Johnny, a TMEA All-State Band member! Robert received his Bachelor of
      Music Education and Master of Music Degrees from WTAMU. As a band
      director for 10 years, his Canyon HS Bands were consistent sweepstakes
      winners.
    </FuturaParagraph>
    <FuturaParagraph>
      In 1996 he entered school administration, where he has served as a
      middle school principal, elementary principal, and superintendent. As
      superintendent of Wildorado ISD, the district was awarded as a
      National Title I School from the Texas Education Agency, and was a TEA
      Exemplary District for 5 consecutive years. From 2004 – 2010 Robert
      was the Director of Fine Arts for Lubbock ISD, where he served as TMAC
      President in 2010.
    </FuturaParagraph>
    <FuturaParagraph>
      He is currently the Director of Secondary and Federal Programs, Fine
      Arts, and Public Relations for Pampa ISD. His wife Johnny teaches
      elementary music for the district. Professional affiliations include
      TMEA, TMAC, TASPA, and TASBO. Robert and wife Johnny&apos;s proudest
      accomplishments are their three grown children, all products of Texas
      Public Schools, and talented band students throughout their school
      career.
    </FuturaParagraph>
  </PeoplePage>
);

export default RobertRumph;
