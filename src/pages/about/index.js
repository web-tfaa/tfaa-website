// External Dependencies
import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

// Internal Dependencies
import Container from '../../components/shared/container';
import SidebarBody from '../../components/shared/sidebar-body';
import aboutSidebar from './about-links.yml';

// Component Definition
export default ({ data }) => (
  <Container>
    <Helmet>
      <title>About</title>
    </Helmet>
    <div>
      <h1
        css={{
          marginTop: 0,
        }}
      >
        About {data.site.siteMetadata.title}
      </h1>
      <section>
        <h4>Our Mission</h4>
        <p>
          To promote and support music education and music educators through collaboration, networking, and the sharing of best practices so that every child in Texas is assured of receiving quality instruction in the understanding, appreciation, and performance of music.
        </p>
      </section>
      <section>
        <h4>Purpose</h4>
        <p>
          The Texas Music Administrators Conference is organized exclusively for charitable, scientific and educational purposes, more specifically to promote and support music education and music educators through collaboration, networking, and the sharing of best practices so that every child in Texas is assured of receiving quality instruction in the understanding, appreciation, and performance of music.

        </p>
      </section>
      <section>
        <h4>
          <Link to={`/constitution/`}>
            Constitution & Bylaws
          </Link>
        </h4>
      </section>
      <section>
        <h4>
          <a href="#">Events</a>
        </h4>
        <ul>
          <li>Summer Convention</li>
          <li>Fall Retreat</li>
          <li>Fall Golf Tournament</li>
          <li>Winter Meetings</li>
          <li>Job Fair / Job Fair Rules</li>
        </ul>
      </section>
      <section>
        <h4>
          <Link to={`/history/`}>
            History
          </Link>
        </h4>
      </section>
      <section>
        <h4>
          <a href="#">Officers</a>
        </h4>
      </section>
      <section>
        <h4>
          <a href="#">Past Presidents</a>
        </h4>
      </section>
      <section>
        <h4>
          <a href="#">Sponsors</a>
        </h4>
      </section>
      <section>
        <h4>
          <a href="#">Statements of Philosophy</a>
        </h4>
      </section>
    </div>
    <SidebarBody inline yaml={aboutSidebar} />
  </Container>
);

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
