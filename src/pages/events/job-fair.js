// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Sidebar data
import eventsSidebar from './events-links.yml';

// Local Variables
const indentStyles = {
  marginLeft: 16,
};

// Component Definition
const JobFair = ({ location }) => (
  <Layout location={location}>
    <Container>
      <Helmet>
        <title>TMAC | Job Fair</title>
      </Helmet>
      <h1>TMAC Job Fair</h1>

      <section>
        <h4>Who</h4>
        <p css={indentStyles}>
          *District representatives must be TMAC members to participate in the
          TMAC/TMEA job fair (see&nbsp;
          <a
            href="https://docs.google.com/document/d/1qA1cX-SQd7_A8CDYGDIPtjJawoSaCKstATsQXoojPoE/edit"
            rel="noopener noreferrer"
            target="_blank">
            Job Fair Rules
          </a>
          )
        </p>
      </section>

      <section>
        <h4>When</h4>
        <p css={indentStyles}>
          Friday, February 15, 2019
          <br />
          6:00-8:00 PM
        </p>
      </section>

      <section>
        <h4>Where</h4>
        <div css={indentStyles}>
          <a
            href="http://www.sahbgcc.com/"
            rel="noopener noreferrer"
            target="_blank">
            Henry B. Gonzalez Convention Center
          </a>
          ,&nbsp; Bridge Hall
          <p>
            <a
              href="https://www.google.com/maps/place/Henry+B.+Gonzalez+Convention+Center/@29.4205819,-98.4839688,15z/data=!4m5!3m4!1s0x0:0x9adbeeaa9ace85f0!8m2!3d29.4205819!4d-98.4839688"
              rel="noopener noreferrer"
              target="_blank">
              900 E. Market St
              <br />
              San Antonio, TX 78205
            </a>
          </p>
        </div>
      </section>

      <section>
        <h4>Contact</h4>
        <p css={indentStyles}>
          For more information contact{' '}
          <a href="mailto:patricia.h.moreno@austinisd.org">Patricia Moreno</a>,
          TMAC President.
        </p>
      </section>
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
        <SidebarBody inline yaml={eventsSidebar} />
      </div>
    </Container>
  </Layout>
);

JobFair.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default JobFair;
