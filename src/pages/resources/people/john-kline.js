// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import FuturaParagraph from '../../../components/shared/futura-paragraph';

// Sidebar data
import Layout from '../../../components/layout';
import presets from '../../../utils/presets';
import resourcesSidebar from '../resources-links.yml';
import SidebarBody from '../../../components/shared/sidebar/sidebar-body';

// Local Variables
const rootStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const imageStyles = {
  marginBottom: 0,
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
const JohnKline = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | John Kline</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="John Kline"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146400/john-kline.jpg"
        />
        <h2 css={headingNameStyles}>John Kline</h2>
        <CardHeadline>TMAC Past President, 2004-2005</CardHeadline>
        <CardHeadline>2006 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          John Kline hails from Abilene, Texas where he attended Abilene High
          School. He is a graduate of Abilene Christian University where he
          received his Bachelor’s Degree in Music Education in 1973. John also
          holds a Master’s Degree in Music from the University of Texas at
          Commerce, and a Supervisor’s Certification from the University of
          North Texas. Having served as a band director in the Mesquite
          Independent School District for over 25 years, John’s bands at North
          Mesquite High School received numerous honors: being named a finalist
          in the Parade of Champions Marching Contest seven years in a row,
          being a consistent UIL Sweepstakes winner, and being chosen as Grand
          Champion Band at the Opryland Music Festival. John has served as the
          Director of Fine Arts for the Mesquite ISD since 1995, overseeing all
          of the fine arts including secondary band, orchestra, choir, theatre,
          art, dance, and elementary art and music. John was also the founder
          and conductor of the Mesquite Community Band and has served as the
          conductor of the Town North Concert Band and the Lakeshore Symphonic
          Winds.
        </FuturaParagraph>
        <FuturaParagraph>
          John Kline’s community organizations include being on the Board of
          Directors of the Mesquite Symphony Orchestra Association and the
          Mesquite Arts Council. His professional affiliations include the Texas
          Music Educator’s Association, Texas Bandmasters Association, Texas
          Educational Theatre Association, Texas and National Art Educators
          Association, Texas Music Administrators Conference, and the Mesquite
          Education Association. He has served as Region III TMEA Band
          Chairperson, as a member of the TMEA State Board and was the All State
          Symphonic Band organizer for the TMEA convention in 1998. He is past
          president of the Texas Music Administrator’s Conference, and was named
          their Music Administrator of the Year in 2005-06.
        </FuturaParagraph>
        <FuturaParagraph>
          In 1995, Mr. Kline was inducted into the Alpha Chapter of Phi Beta Mu,
          the National Honorary Bandmasters Fraternity. He has served as contest
          chairman and host for many region, area, and state marching contests
          held at Mesquite Memorial Stadium and has served as a UIL music
          adjudicator and clinician throughout the state.
        </FuturaParagraph>
        <FuturaParagraph>
          John is passionate about making quality musical sounds where the music
          tugs at the heart of performers and audience alike. “Great pitch,
          blend, balance, and rhythmic accuracy are very necessary and
          important”, John states, “but without careful attention to the musical
          phrase and without the passion behind the playing, the end product
          will be far from satisfying”. He credits three band directors as huge
          influences in his life. Ed George was his junior high band director
          and was also one of his professors at Abilene Christian. Tony Anderson
          was his high school band director at Abilene High School. It was Mr.
          Anderson who hired him to come to Mesquite in 1973 as his assistant at
          North Mesquite High School. Charles Trayler was John’s college band
          director at Abilene Christian and has been a huge influence on his
          life, his craft, and his philosophy of music education. John feels
          very lucky to have had these great mentors in his life. “There is not
          a day that goes by that I don’t use something that I learned from
          these men. I owe them a huge debt of gratitude.”
        </FuturaParagraph>
        <FuturaParagraph>
          John lives in Mesquite with his wonderful wife Vicky. He has one son,
          John David, one daughter-in-law, Tara, and two beautiful
          grandchildren, Kaylie and Madelyn. John’s hobbies include magic and
          photography. He is a Past President of the Dallas Magic Club and was
          named the Dallas Magician of the Year in 2005.
        </FuturaParagraph>
        {/* Mobile sidebar */}
        <div
          css={{
            display: `block`,
            [presets.Tablet]: {
              display: `none`,
            },
          }}>
          <hr
            css={{
              border: 0,
              height: 2,
              marginTop: 10,
            }}
          />
          <SidebarBody inline yaml={resourcesSidebar} />
        </div>
      </Container>
    </div>
  </Layout>
);

JohnKline.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default JohnKline;
