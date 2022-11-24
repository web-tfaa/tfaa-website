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
const name = 'Peter Warshaw';

// Component Definition
const PeterWarshaw: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146399/peter-warshaw.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2011-2012</CardHeadline>
    <CardHeadline>2014 TMAC Outstanding Administrator</CardHeadline>

    <FuturaParagraph>
      Peter J. Warshaw is the retired Fine Arts Director for Leander ISD.
      Previously, Mr. Warshaw served as the Coordinator of Fine Arts for
      Bryan ISD, as well as the Director of Bands at J. J. Pearce High
      School in Richardson ISD. During his tenure at Pearce High School, the
      band performed twice by invitation in New York&apos;s Carnegie Hall and was
      awarded the Sudler Flag of Honor in 2000. In 2001, the Symphonic I
      Band, under Mr. Warshaw&apos;s direction, was selected as the Texas Music
      Educators Association Class 4A Honor Band.
    </FuturaParagraph>
    <FuturaParagraph>
      Mr. Warshaw has been a presenter at the Midwest Clinic, the TMEA and
      TBA Conventions, the Midwest Clinic, and the CEDFA Conference. He is a
      life member of the International Percy Grainger Society and received
      the Grainger Medallion from the International Percy Grainger Society
      in 1998, in recognition of his distinctive contribution to the music
      of Percy Grainger. He has served as a guest lecturer in music
      education at Sam Houston State University and The University of Texas
      at Austin and is in great demand as an adjudicator throughout the
      state.
    </FuturaParagraph>
    <FuturaParagraph>
      Under Mr. Warshaw&apos;s leadership, Leander ISD fine arts programs
      annually present district-wide events showcasing the work of student
      artists and performers. Additionally, four LISD groups have performed
      at the Midwest Clinic, two at the Western International Band Clinic,
      and two at the TMEA Convention. Mr. Warshaw retired from LISD in 2022.
    </FuturaParagraph>
  </PeoplePage>
);

export default PeterWarshaw;
