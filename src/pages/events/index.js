// External Dependencies
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import Container from '../../components/shared/container';
import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';

// Sidebar data
import eventsSidebar from './events-links.yml';

// Local Variables
const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  mobileHr: {
    border: 0,
    height: 2,
    marginTop: 10,
  },
  updatedLabel: {
    color: 'cadetblue',
    fontSize: '1rem',
  },
}));

// Component Definition
const Events = ({ data, location }) => {
  const classes = useStyles();

  return (
    <Layout location={location}>
      <Helmet>
        <title>TMAC | Events</title>
      </Helmet>

      <Container>
        <h1>{data.site.siteMetadata.title} Events</h1>

        <section>
          <h4>
            Summer Round Table
            {/* <span className={classes.updatedLabel}>(updated)</span> */}
          </h4>

          <EnhancedAlert severity="info">
            Details about the 2021 Summer Round Table will be available soon.
          </EnhancedAlert>

          {/* <p css={{ marginTop: 24, paddingLeft: 8 }}>
            Held in conjunction with the&nbsp;
            <a href="http://www.texasbandmasters.org/">Texas Bandmasters Association</a>
            ,&nbsp;
            <a href="https://www.tcda.net/">Texas Choral Directors Association</a>, and&nbsp;
            <a href="https://www.todaweb.org/">Texas Orchestra Directors Association</a> summer
            conventions. New music administrators are encouraged to attend!
          </p> */}

          <Box mt={3} pl={1}>
            Held in conjunction with these summer conventions:
            <ul>
              <li>
                <a href="http://www.texasbandmasters.org/">Texas Bandmasters Association</a>
              </li>
              <li>
                <a href="https://www.tcda.net/">Texas Choral Directors Association</a>
              </li>
              <li>
                <a href="https://www.todaweb.org/">Texas Orchestra Directors Association</a>
              </li>
            </ul>
          </Box>

        </section>
        <section>
          <h4>Fall Retreat</h4>

          <Box pl={1}>
            Fall Retreat schedule will be available mid Fall 2021
          </Box>

          {/* <p>
            The TMAC Fall Retreat is open to all current TMAC members who are in good standing
            (registered and paid). There is no separate conference registration process.
          </p> */}
        </section>

        <section>
          <h4>TMEA Round Table</h4>

          <p css={{ paddingLeft: 8 }}>
            Round Table Meeting at the{' '}
            <a href="https://www.tmea.org/">Texas Music Educators Association</a> convention.
          </p>
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
          <hr className={classes.mobileHr} />
          <SidebarBody inline yaml={eventsSidebar} />
        </div>
      </Container>
    </Layout>
  );
};

Events.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default Events;

export const query = graphql`
  query EventsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
