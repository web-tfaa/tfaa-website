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
const name = 'Camille Bach';

// Component Definition
const CamilleBach: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523146399/camille-bach.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2000-2002</CardHeadline>
    <CardHeadline>2005 TMAC Outstanding Administrator</CardHeadline>

    <FuturaParagraph>
      Frances Camille Bach retired from San Antonio ISD after 22 years as
      High School English/Choir teacher, Elementary Music teacher, and Fine
      Arts Administrator. She served as the Texas Music Administrators
      Conference officer 1998-2002, Texas Fine Arts Summit Presenter Cadre
      for 5 years, Texas Art Educators Conference Co Chair, Urban Symposium
      coordinator and presenter. Camille was chosen for the Japan Fulbright
      Scholarship and Teacher to Teacher Training Corp for the US Department
      of Education. She received the awards for the Salute to Quality in
      Education, Outstanding Texas Art Administrator, Outstanding Texas
      Music Administrator, and Ford Salute to Education. Camille was active
      with the mariachi program and with students traveled to Germany,
      Guadalajara, Tucson, Albuquerque, San Francisco, Orlando, and
      throughout Texas. She was involved in the design and construction of
      the 8 high school state-of-the-art Music facilities. After retirement,
      she taught high school English at the International School of Beijing.
      She currently is enjoying retirement in San Antonio.
    </FuturaParagraph>
  </PeoplePage>
);

export default CamilleBach;
