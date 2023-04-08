// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import FuturaParagraph from '../../../components/shared/futura-paragraph';
import PeoplePage from '../../../components/shared/PeoplePage';
import { appName } from '../../../utils/app-constants';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const name = 'Dinah Menger';

// Component Definition
const DinahMenger: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="c_scale,w_738/v1680970374/dinah_menger_square.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2022-2023</CardHeadline>

    <FuturaParagraph>
      Dinah recently retired as the Director of Vocal and Elementary Music for
      the Fort Worth ISD, overseeing 134 music programs. Prior to her
      appointment in Fort Worth, Dinah served as conductor/lecturer at Baylor
      University from 2013-2015 and was the Choir Director at Arlington High
      School in Arlington, Texas from 1995-2013. Choirs under her direction
      performed at the 2005 and 2009 TMEA Conventions and the 2007 and
      2013 national ACDA conventions, as well as several European
      performance opportunities.
    </FuturaParagraph>

    <FuturaParagraph>
      Dinah&apos;s passion for public school education
      has led her to work in organizations that promote and support equitable
      fine arts programs for all teachers and their students. She has served in
      leadership roles in the Texas Music Educators Association, the UIL
      Prescribed Music Committee, and the Texas Music Adjudicators
      Association. She currently serves as the Immediate Past President of
      the {appName}.
    </FuturaParagraph>

    <FuturaParagraph>
      Dinah received her BFA
      from the University of Arizona and her Masters in Conducting from
      Texas State University. Dinah is a frequent UIL judge, clinician, voice
      teacher/coach, teacher consultant, and professional development
      presenter. She and her husband, Christopher, are devoted to their 3
      children and wonderful spouses, and 3 grandchildren who they spend as
      much time with as is humanly possible!
    </FuturaParagraph>
  </PeoplePage>
);

export default DinahMenger;
