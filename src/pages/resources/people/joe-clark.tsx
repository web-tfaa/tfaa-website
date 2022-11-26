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
      More info coming soon...
    </FuturaParagraph>
  </PeoplePage>
);

export default JoeClark;
