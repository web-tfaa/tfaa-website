// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql, Link } from 'gatsby';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Sidebar data
import aboutSidebar from './about-links.yml';

// Component Definition
const About = ({ data, location }) => (
  <Layout location={location}>
    <Container>
      <Helmet>
        <title>TMAC | About</title>
      </Helmet>
      <h1>About {data.site.siteMetadata.title}</h1>
      <section>
        <h4>Our Mission</h4>
        <p>
          To promote and support music education and music educators through
          collaboration, networking, and the sharing of best practices so that
          every child in Texas is assured of receiving quality instruction in
          the understanding, appreciation, and performance of music.
        </p>
      </section>
      <section>
        <h4>Purpose</h4>
        <p>
          The Texas Music Administrators Conference is organized exclusively for
          charitable, scientific and educational purposes, more specifically to
          promote and support music education and music educators through
          collaboration, networking, and the sharing of best practices so that
          every child in Texas is assured of receiving quality instruction in
          the understanding, appreciation, and performance of music.
        </p>
      </section>
      <section>
        <h4>
          <Link to="/about/constitution/">Constitution & Bylaws</Link>
        </h4>
      </section>
      <section>
        <h4>
          <Link to="/events">Events</Link>
        </h4>
        <ul>
          <li>Summer Convention</li>
          <li>Fall Retreat</li>
          <li>Fall Golf Tournament</li>
          <li>TMEA Round Table</li>
          <li>Job Fair / Job Fair Rules</li>
        </ul>
      </section>
      <section>
        <h4>
          <Link to="/about/history">History</Link>
        </h4>
      </section>
      <section>
        <h4>
          <Link to="/about/officers">Officers</Link>
        </h4>
      </section>
      <section>
        <h4>
          <Link to="/resources/people/chronological-presidents">
            Past Presidents
          </Link>
        </h4>
      </section>
      <section>
        <h4>
          <Link to="/about/philosophy">Statements of Philosophy</Link>
        </h4>
      </section>
      {/* Mobile sidebar */}
      <div
        css={{
          display: 'block',
          [presets.Tablet]: {
            display: 'none',
          },
        }}
      >
        <hr
          css={{
            border: 0,
            height: 2,
            marginTop: 10,
          }}
        />
        <SidebarBody inline yaml={aboutSidebar} />
      </div>
    </Container>
  </Layout>
);

About.propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default About;

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
