// External Dependencies
import React from "react";
import Link from "gatsby-link";
import Helmet from 'react-helmet';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import Container from '../../components/shared/container';
import presets from '../../utils/presets';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Sidebar data
import resourcesSidebar from './resources-links.yml';

const ExternalLink = ({ children, to }) => (
  <a
    css={{
      display: 'inline-block',
      marginBottom: 10,
    }}
    href={to}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
);

// Component Definition
export default () =>
  <Container>
    <Helmet>
      <title>TMAC | Resources</title>
    </Helmet>
    <h1>Resources</h1>
    <section>
      <h2>Texas State Standards</h2>
      <ExternalLink to="https://tea.texas.gov/Academics/Curriculum_Standards/TEKS_Texas_Essential_Knowledge_and_Skills_(TEKS)_Review/Fine_Arts_Texas_Essential_Knowledge_and_Skills/">Fine Arts Texas Essential Knowledge and Skills</ExternalLink>
    </section>
    <section>
      <h2>Professional Organizations</h2>
      <div><ExternalLink to="https://acda.org/">American Choral Directors Association</ExternalLink></div>
      <div><ExternalLink to="http://aosa.org/">American Orff-Schulwerk Association</ExternalLink></div>
      <div><ExternalLink to="https://www.astastrings.org/">American String Teachers Association</ExternalLink></div>
      <div><ExternalLink to="https://www.cedfa.org/">Center for Educator Development in Fine Arts</ExternalLink></div>
      <div><ExternalLink to="https://nafme.org/">National Association for Music Education</ExternalLink></div>
      <div><ExternalLink to="https://nationalbandassociation.org/">National Band Association</ExternalLink></div>
      <div><ExternalLink to="http://www.oake.org/">Organization of American Kodály Educators</ExternalLink></div>
      <div><ExternalLink to="http://www.pas.org/">Percussive Arts Society</ExternalLink></div>
      <div><ExternalLink to="https://www.tmea.org/">Texas Music Educators Association</ExternalLink></div>
    </section>
    <section
      css={{ marginBottom: 32 }}
    >
      <h2>Archived Files</h2>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127306/Abilene-ISD-Supplemental-Music-Lesson-Manual.pdf">Abilene ISD Supplemental Music Lesson Manual</ExternalLink> — 2006-2007</div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127307/Abilene-Supplemental-Music-Lesson-Approved-Instructors.pdf">Abilene ISD Supplemental Music Lesson Instructors</ExternalLink> — 2006-2007</div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127306/Professional-Learning-Communities-summary.pdf">PLC Summary – Katy ISD</ExternalLink> — October 2008</div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127306/PLC-El-Music-JonesMitzi-Nov-09.pdf">PLC for Elementary Music – Katy ISD</ExternalLink> — November 2009</div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127306/Podcasting-in-the-Fine-Arts-Classroom.pdf">Podcasting in the Fine Arts Classroom – Killeen ISD</ExternalLink></div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127306/Podcast-History.pdf">Podcast History – Killeen ISD</ExternalLink> — November 2009</div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127307/TMAC-2007-Julie-Romeo-Presentation.pdf">Romeo Music Tecnology Presentation</ExternalLink> — 2007</div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127307/Sample-iPod-Class-Notice.pdf">Sample iPod Class Notice – Killeen ISD</ExternalLink></div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127307/Surviving-the-4x4.pdf">Surviving the 4 x 4 Plan – McKinney ISD</ExternalLink> — 2007</div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127309/TX_Music_Curriculum_K_5.pdf">TMAC Music Curriculum: Grades K-5</ExternalLink></div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127307/TX_Music_Curriculum_6.pdf">TMAC Music Curriculum: Grade 6</ExternalLink></div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127307/TX_Music_Curriculum_7_8.pdf">TMAC Music Curriculum: Grades 7-8</ExternalLink></div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127306/TX_Music_Curriculum_I_IV.pdf">TMAC Music Curriculum: Levels I-IV</ExternalLink></div>
      <div><ExternalLink to="https://res.cloudinary.com/tmac/image/upload/v1523127308/Texas-Commission-Arts-Presentation.pdf">Texas Commission on the Arts Presentation</ExternalLink> — November 2009</div>
    </section>
    <div
      css={{
        display: `block`,
        [presets.Tablet]: {
          display: `none`,
        },
      }}
    >
      <hr css={{
        border: 0,
        height: 2,
        marginTop: 10,
      }} />
      <SidebarBody inline yaml={resourcesSidebar} />
    </div>
  </Container>
