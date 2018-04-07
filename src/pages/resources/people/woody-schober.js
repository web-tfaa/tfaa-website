// External Dependencies
import Helmet from 'react-helmet';
import React from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import FuturaParagraph from '../../../components/shared/futura-paragraph';

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | Woody Schober</title>
    </Helmet>
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Container>
        <img
          src="https://res.cloudinary.com/tmac/image/upload/v1523131020/history_woody-schober.jpg"
        />
        <CardHeadline>Woody Schober</CardHeadline>

        <FuturaParagraph>
          Woody Schober is the retired Director of Performing Arts for the Irving Independent School District. A former band and choral director, Schober has conducted instrumental and vocal organizations and has served as a teacher and music administrator for the past fifty-one years. He is founder and past director of the Irving Boys Choir. In addition, he has conducted choral workshops and is an active adjudicator for the Texas Music Adjudicators Association.
        </FuturaParagraph>
        <FuturaParagraph>
          As the group enlarged in our area and across the state, we felt it would be beneficial to have music administration opportunities specifically targeting our work-related concerns at the TMEA conventions and summer meetings. The first TMAC officers were elected in February, 1983 at the Texas Music Educators Association Convention in San Antonio. The following people were elected as the charter officers of the TMAC organization: President R.J. (Dick) Winters, Music Coordinator for the Plano Independent School District; Vice President Woody Schober, Director of Music, Irving ISD; and Secretary-Treasurer Ken Howard, Music Supervisor, Waco ISD. Following the election of officers, meetings and workshops were scheduled at TMEA and at the summer conventions. These meetings addressed various topics including budget, curriculum, personnel, public relations, planning and organization, etc.
        </FuturaParagraph>
        <FuturaParagraph>
          As a music educator who spent 30 years in music administration, I was grateful for the help and assistance I received as a member of TMAC and applaud those now who are continuing to provide this worthwhile organization for the continued advancement of music education in our state.
        </FuturaParagraph>

        <div>Woody Schober,</div>
        <div>Director of Fine Arts, Retired</div>
        <div>Irving ISD, Irving, Texas</div>
      </Container>
    </div>
  </div>
);
