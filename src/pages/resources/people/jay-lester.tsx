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
const name = 'Jay Lester';

// Component Definition
const JayLester: FC<Props> = ({ location }) => (
  <PeoplePage
    imgSrc="v1523131021/Lester.jpg"
    location={location}
    name={name}
  >
    <CardHeadline>TMAC Past President, 2019-2020</CardHeadline>

    <FuturaParagraph>
      A product of the Abilene public schools, Jay Lester currently
      serves Abilene ISD as Executive Director of Fine Arts. He also serves as the UIL Music
      Region 6 Executive Secretary Elect and as a consultant for ScholarshipAuditions.com.
      Previously, he held the Director of Fine Arts position in Victoria ISD from 2008-2012 and
      was the conductor/founder of the Crossroads Community Band. Mr. Lester began his teaching
      career as a band director in Odessa and later taught band and orchestra at Clack Middle
      School and Cooper High School in Abilene. In Allen ISD he served as Director of Bands at
      the Lowery Freshman Center while assisting with the Allen High School bands and
      orchestras. The Allen band received the coveted Sudler Shield for marching bands by the
      John Philip Sousa Foundation in 2004. In 2006, the Allen band marched in the
      internationally televised Tournament of Roses Parade in Pasadena, California. Later that
      year, Jay co-conducted the Allen Full Orchestra at the Midwest Clinic in Chicago,
      Illinois.
    </FuturaParagraph>

    <FuturaParagraph>
      Jay is proud graduate of Cooper High School in Abilene where he graduated with honors
      while participating in golf, band, choir, show choir, theatre, speech, and film club.
      Highlights include the 1990 Tournament of Roses Parade, two trips to the UIL state
      marching band contest, a half-time performance at a Dallas Cowboys football game, and a
      choir tour of Colorado. He earned both the Bachelor and Master of Music degrees from
      Hardin-Simmons University where he studied trumpet with John Daniel and Scott Mather.
      Other trumpet teachers included Dave Scott, Paul Hankins, and Stacy Blair. While at HSU,
      he studied conducting from Scott Mather, Dr. Loyd Hawthorne, and Don Hanna. Upon
      graduation, he was awarded the Spear&apos;s Gold Medal as outstanding band graduate in 1994.
      Jay graduated from the University of North Texas with a Master&apos;s degree in Educational
      Administration in 2007. His post graduate studies have included coursework in music from
      the VanderCook College of Music, the University of Miami, and Hardin-Simmons University.
      In addition, he has participated in workshops at the Conn Selmer Institute, Texas Tech,
      West Texas A&M, UNT, and the Ohio State University.
    </FuturaParagraph>

    <FuturaParagraph>
      Mr. Lester has presented workshops for many conferences including the Texas Music
      Educators Association, Texas Bandmasters Association, Texas Orchestra Directors
      Association, Texas Music Administrators Conference, and the Midwest Clinic for Bands &
      Orchestras. In addition, he has presented workshops in over 20 school districts and at
      several universities. Jay stays active as a music adjudicator as an active member of the
      Texas Music Adjudicators Association judging concert band, marching band, and orchestra
      each year. He has also judged TMEA Honor Band and Orchestra contests at the Area and State
      level. Jay enjoys judging music festivals for Director&apos;s Choice, Peak, and South Coast.
    </FuturaParagraph>

    <FuturaParagraph>
      Additionally, Mr. Lester has also been involved with the Texas Art Educators Association,
      the Texas Dance Educators Association, the Texas Theatre Administrators Conference. In
      2016, he helped charter the Lone Star State affiliate chapter of the International Trumpet
      Guild which serves West Texas trumpet enthusiasts. As a trumpeter, Jay has performed with
      the Abilene Philharmonic Orchestra, the Midland-Odessa Symphony, the Allen Philharmonic,
      the Big Spring Symphony, the Lone Star Brass Quintet, the Key City Brass Quintet, the
      Corpus Christi Wind Symphony, the Texana Community Band, the Abilene Community Band, and
      the Crossroads Community Band. He currently performs on trumpet and bass guitar with the
      Celebration Orchestra at First Baptist Church in Abilene as well as in orchestra pits for
      local musicals.
    </FuturaParagraph>

    <FuturaParagraph>
      Jay serves on the board of directors for the Abilene Teachers Federal Credit Union, the
      Grace Museum, the Paramount Theatre (Chairman), the HSU Cowboy Band Foundation. He is also
      a member of the Abilene Downtown Association, the Abilene Education Foundation Young
      Master&apos;s art show committee, the Grace Museum history committee, the City Sidewalks
      committee, the HSU Board of Development, the UIL State Music Technical Advisory Committee,
      and is the current President of the Texas Music Administrators Conference. Jay has served
      on the Budget Committee and as a Deacon at First Baptist Church of Abilene where he and
      his family worship. Jay&apos;s wife Lisa is an Instructional Coordinator at Bowie Elementary
      School in Abilene ISD. They have two sons, Michael, a music education major at Abilene
      Christian University, and Brian, a senior at Abilene High School who participates in band,
      choir, and tennis. In addition to supporting the arts, his alma mater, and his church, Jay
      enjoys the outdoors, travel, and film.
    </FuturaParagraph>
  </PeoplePage>
);

export default JayLester;
