// External Dependencies
import Helmet from 'react-helmet';
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
export default ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Craig Welle</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Craig Welle"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/craig-welle.jpg"
        />
        <h2 css={headingNameStyles}>Craig Welle</h2>
        <CardHeadline>TMAC Past President, 1994-1996</CardHeadline>
        <CardHeadline>2004 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Craig Welle served as TMAC President from 1994-96. As a TMAC Board
          member, he edited The Texas School Music Program: Description and
          Standards first published in Southwestern Musician Special Edition in
          March, 1993 and the TMAC survey of Texas music programs. During his
          tenure on the TMAC Board, Craig was Music/Fine Arts Coordinator for
          the Spring Branch school district in Houston, a position he held for
          fifteen years. In 2003 Craig received the Music Administrator of the
          Year award from TMAC and the Administrator Excellence award from the
          Texas Chapter of ASTA.
        </FuturaParagraph>
        <FuturaParagraph>
          When Welle took the position in Spring Branch, the district was coming
          to terms with a major demographic shift and UIL music event
          participation was in steep decline. Within the next ten years with one
          additional middle school campus, the district was sending twice as
          many groups on a regular basis including bands, choirs and orchestras
          from most campuses and the number of first division ratings had
          doubled as well. Mr. Welle was instrumental in expanding an elementary
          Suzuki strings program which greatly improved the orchestra program in
          the district resulting in six string orchestras and one full orchestra
          named as TMEA Honor Orchestras over an eight-year period. In order to
          increase interest and participation in music programs, he also
          collaborated with community arts organizations and PTA’s to put the
          ARTS Partners program in place that provided field trips to major arts
          venues in Houston for twenty thousand elementary and middle school
          students. In 1997 the project was named the Outstanding Partnership in
          Texas by the Texas Association of Partnerships in Education and also
          resulted in Mr. Welle being awarded PTA Life Membership by the Spring
          Branch Council of PTA’s in 1991 and the Jacob L. and Sophia Meyer Farb
          School Bell Award by the Houston Symphony in 1996. In 2001, Spring
          Branch ISD received the Arts Basic Award from the Texas Commission on
          the Arts for its commitment to arts education.
        </FuturaParagraph>
        <FuturaParagraph>
          Prior to his position in Spring Branch, Welle taught choir, band, and
          general music for fourteen years in Texas, Iowa and in overseas
          schools in Japan, Germany, and Saudi Arabia. He earned his BME from
          Morningside College in Sioux City, Iowa, an MA in Music Education from
          the University of Iowa, and Mid-Management Educator Certification
          through the University of St. Thomas in Houston. In addition to
          teaching he performed regularly as a tenor soloist and choral musician
          in a number of venues including the Saratoga – Potsdam Choral
          Institute, New York, with the Philadelphia Orchestra conducted by
          Eugene Ormandy, Aaron Copland and John Pritchard in 1976, Classical
          Music Seminar, Eisenstadt, Austria, conducted by Dr. Don Moses in
          1981-82, Dorian Opera Festival in Decorah, Iowa, in 1988, and a
          variety of choirs in Houston between 1988 and 2005 including St.
          Mark’s Episcopal Church, Congregation Beth Israel, St. Philip
          Presbyterian Church and St. Martin’s Episcopal Church.
        </FuturaParagraph>
        <FuturaParagraph>
          As president of the Texas Music Educators Conference from 2002-2004,
          Welle led the effort to establish the biennial MENC Southwestern
          Division Symposium for Music Education in Urban and Rural Schools and
          served as Conference Chair in 2003, 2005, and 2007. It successfully
          convened again in June, 2009 and planning for 2011 is underway. He
          became president of the Southwestern Division of MENC, the National
          Association for Music Education in 2009, serving on the National
          Executive Board through June, 2011 and from July, 2012 to June, 2013.
          He was nominated by MENC and accepted the invitation to serve a three
          year term on the College Board’s Arts Academic Advisory Committee in
          2010.
        </FuturaParagraph>
        <FuturaParagraph>
          Craig served on Texas board of the Association for Supervision and
          Curriculum Development (ASCD). Through Texas ASCD, he worked with key
          arts leaders in Texas to organize the Texas Fine Arts Network, a
          predecessor of the Texas Coalition for Quality Arts Education, for
          which he was a member of the Executive Board from 1997-2005. He was
          elected to the National ASCD Board in 1998 for a four-year term, and
          served on the Local Arrangements Committee for the 2002 ASCD National
          Conference in San Antonio.
        </FuturaParagraph>
        <FuturaParagraph>
          In 2005, Craig took the position of Director of Fine Arts in Dallas
          Independent School District and in 2007 was named Executive Director
          for Enrichment Curriculum and Instruction, supervising the
          district-wide fine arts, physical education, library media services,
          instructional technology, JROTC, languages other than English and out
          of school time enrichment programs in the District. A large part of
          his work has been to establish and implement standards of service for
          all students in the district in all enrichment subjects.
          Implementation of these standards is being accomplished through the
          Thriving Minds initiative, a partnership among Dallas ISD, City of
          Dallas and community partners coordinated by Big Thought, a local
          non-profit organization. As part of this project, Dallas ISD doubled
          the number of district-funded music teachers in order to place them at
          all elementary campuses by formula based upon enrollment. Another
          major focus has been to increase student participation in band
          beginning with the middle school programs where numbers increased from
          2,243 in 2004 to 4,010 in 2010. The number of Dallas ISD middle school
          and high school music groups participating in yearly UIL events
          increased from 87 in 2005-06 to 128 in 2009-10 and in 2009, Welle was
          elected chair of the Region 20 Music UIL Executive Committee.
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
