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
const name = 'Jim Egger';

// Component Definition
const JimEgger: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1532300879/jim-egger.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2020-2021</CardHeadline>

    <FuturaParagraph>
      Jim Egger served as the Director of Fine Arts for
      McAllen ISD beginning in the Fall of 2014.
      Prior to this position, Mr. Egger was the Director
      of Bands at McAllen High School, a position he held from 2002-2014.
      While at McHi, the bands under his direction excelled. In 2004,
      the McAllen High School Marching Band advanced to the UIL State
      Marching Band Contest for the first time in over 20 years.
      The McAllen High School Wind Ensemble was also awarded
      Sweepstakes at UIL Concert & Sightreading Contest every
      year that Mr. Egger was at McAllen High School. The
      Wind Ensemble also advanced to the Area Round of the
      TMEA Honor Band Competition the last three  times for
      his biennial event. In 2013 the Music Department of
      McAllen High School was awarded as a National Semifinalist
      with the Grammy In Schools Grant. Before arriving at McAllen
      High School, Mr. Egger served as an assistant band director
      at McAllen Nikki Rowe High School for ten years. While at
      Rowe High School, he started the Award-Winning Rowe High
      School Jazz Band and also directed the Concert Band. The
      Rowe HS Concert Band was the first sub non-varsity band
      in McAllen ISD history to be awarded Superior Ratings
      in Concert and the Sweepstakes Award at UIL. Mr. Egger
      began teaching in McAllen ISD in 1988 as an assistant
      band director at McAllen Memorial High School.
    </FuturaParagraph>
    <FuturaParagraph>
      Mr. Egger has presented clinics at the Texas Music Educators Association,
      Texas Bandmasters Association Conventions and the Texas Music Administrators
      Conference Fall Retreat as well as several school districts in the Rio Grande
      Valley. He has also served as a band clinician for several high school and
      middle school bands in Edcouch-Elsa, Edinburg, Harlingen, Hidalgo, La Joya,
      McAllen, Mission, PSJA, Rio Grande City, Roma, San Benito and Sharyland. Mr.
      Egger has been the clinician of TMEA Region Jazz Bands in Region 15 & 28.
      He has also conducted All-City Bands for Edinburg CISD, McAllen ISD, Mission
      CISD and PSJA ISD. Mr. Egger has as the Rio Grande Valley TUBACHRISTMAS
      Coordinator for the past thirty years. This event has become one of the
      largest of its kind in the United States.
    </FuturaParagraph>
    <FuturaParagraph>
      It was an honor for Mr. Egger to serve as the Texas Music Administrators
      Assoication President for 2020-2021. Serving during the COVID-19 Pandemic
      was a challenge but in the end, TMAC has become more connected and calibrated
      than ever before. Through the resilience of the membership, the future is
      very bright for TMAC. Mr. Egger has slso served as the TMEA Region 15 President,
      Vice President, Band Division Chairman, Band Division Vice Chairman and
      Jazz Chairman. He has also served as a member of the TMEA State Board and
      the UIL Music Advisory Committee.  Mr. Egger is also one of the founding
      members of the Rio Grande Valley Band Director Hall of Fame Committee,
      the first of its kind in the state of Texas. Earlier this year, a new
      entity, the Texas Arts Education Campaign was formed, and Mr. Egger serves
      as one of the founding Board Members.
    </FuturaParagraph>
    <FuturaParagraph>
      He received his Bachelor of Music Education and Masters of Music Performance
      (Trombone) from the University of Mississippi.
    </FuturaParagraph>
    <FuturaParagraph>
      Professional memberships include Phi Beta Mu, Texas Music Educators Association,
      Texas Bandmasters Association, Texas Music Adjudicators Association, Life Member
      of Phi Mu Alpha Sinfonia - Professional Music Fraternity, International Trombone
      Association, Life Member of Phi Kappa Phi.
    </FuturaParagraph>
    <FuturaParagraph>
      The most treasured aspect of Mr. Egger’s life is his wife Sandy and three children,
      Jay, Emily, and Jack. Mr. Egger and his wife now reside in Georgetown and love the
      Texas Hill Country!
    </FuturaParagraph>
  </PeoplePage>
);

export default JimEgger;
