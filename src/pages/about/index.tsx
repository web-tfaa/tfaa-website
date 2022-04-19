// External Dependencies
import { Helmet } from 'react-helmet';
import { FC } from 'react';
import { graphql, Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';

// Sidebar data
import aboutSidebar from './about-links.yml';

// Local Typings
interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      }
    }
  };
  location: any;
}

// Local Variables
const useStyles = makeStyles((theme) => ({
  underline: {
    textDecoration: 'underline',
  },
}));

// Component Definition
const About: FC<Props> = ({ data, location }) => {
  const classes = useStyles();

  return (
    <Layout location={location}>
      <Container>
        <Helmet>
          <title>TMAC | About</title>
        </Helmet>

        <h1>About {data.site.siteMetadata.title}</h1>

        <section>
          <h4>Our Mission</h4>
          <p>
            TMAC equips leaders to advance high quality fine arts education for all.
          </p>
        </section>

        <section>
          <h4>Purpose</h4>
          <ul>
            <li>
              <span className={classes.underline}>Advocating</span>{' '}
              tirelessly for the advancement of fine arts education,
              community engagement, and increased access to arts education.
            </li>
            <li>
              <span className={classes.underline}>Collaborating</span>{' '}
              as Fine Arts Administrators to provide support,
              guidance, and professional learning opportunities.
            </li>
            <li>
              Consciously{' '}
              <span className={classes.underline}>supporting</span>{' '}
              all students, educators, and programs in ways
              that develop lasting relationships with all stakeholders.
            </li>
            <li>
              <span className={classes.underline}>Developing</span>{' '}
              partnerships that allow for lasting collaborative relationships
              between arts organizations, school districts, and other stakeholders.
            </li>
            <li>
              <span className={classes.underline}>Holding</span>{' '}
              students and their potential for achievement at the center
              of all decision-making, instructional support, and planned trainings.
            </li>
          </ul>
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
            <li>TMEA Round Table</li>
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
