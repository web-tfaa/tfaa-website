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
const WinterRoundTable = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Summer Round Table</title>
    </Helmet>
    <Container>
      <h1>2017 Summer Convention Round Table</h1>
      <section>
        <h4>When</h4>
        <p css={indentStyles}>Wednesday, February 14, 2018</p>
        <p css={indentStyles}>12:00-5:00 PM</p>
      </section>

      <section>
        <h4>Where</h4>
        <div css={indentStyles}>
          <a
            href="http://www.marriott.com/hotels/travel/satdt-san-antonio-marriott-riverwalk/?scid=bb1a189a-fec3-4d19-a255-54ba596febe2"
            rel="noopener noreferrer"
            target="_blank">
            Marriott Riverwalk
          </a>
          , Salon ABC (tentative location)
          <p>
            <a
              href="https://www.google.com/maps/place/889+E+Market+St,+San+Antonio,+TX+78205/@29.4224582,-98.4864776,17z/data=!3m1!4b1!4m5!3m4!1s0x865c58aa7befb2d7:0xb0912174007dfe05!8m2!3d29.4224582!4d-98.4842889"
              rel="noopener noreferrer"
              target="_blank">
              889 E. Market St
              <br />
              San Antonio, TX 78205
            </a>
          </p>
        </div>
      </section>

      <section>
        <h4>Why</h4>
        <p css={indentStyles}>
          Held in conjunction with the&nbsp;
          <a href="https://www.tmea.org/">
            Texas Music Educators Association
          </a>{' '}
          convention.
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

WinterRoundTable.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default WinterRoundTable;
