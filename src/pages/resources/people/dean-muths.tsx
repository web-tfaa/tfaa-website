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
const name = 'Dean Muths';

// Component Definition
const DeanMuths: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523153280/dean-muths.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2016-2017</CardHeadline>

    <FuturaParagraph>Dean Muth&apos;s bio coming soon!</FuturaParagraph>
  </PeoplePage>
);

export default DeanMuths;
