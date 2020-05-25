// External Dependencies
import { Helmet } from 'react-helmet';
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
const CamilleBach = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Camille Bach</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Camille Bach"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/camille-bach.jpg"
        />
        <h2 css={headingNameStyles}>Camille Bach</h2>
        <CardHeadline>TMAC Past President, 2000-2002</CardHeadline>
        <CardHeadline>2005 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Frances Camille Bach retired from San Antonio ISD after 22 years as
          High School English/Choir teacher, Elementary Music teacher, and Fine
          Arts Administrator. She served as the Texas Music Administrators
          Conference officer 1998-2002, Texas Fine Arts Summit Presenter Cadre
          for 5 years, Texas Art Educators Conference Co Chair, Urban Symposium
          coordinator and presenter. Camille was chosen for the Japan Fulbright
          Scholarship and Teacher to Teacher Training Corp for the US Department
          of Education. She received the awards for the Salute to Quality in
          Education, Outstanding Texas Art Administrator, Outstanding Texas
          Music Administrator, and Ford Salute to Education. Camille was active
          with the mariachi program and with students traveled to Germany,
          Guadalajara, Tucson, Albuquerque, San Francisco, Orlando, and
          throughout Texas. She was involved in the design and construction of
          the 8 high school state-of-the-art Music facilities. After retirement,
          she taught high school English at the International School of Beijing.
          She currently is enjoying retirement in San Antonio.
        </FuturaParagraph>
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
          <SidebarBody inline yaml={resourcesSidebar} />
        </div>
      </Container>
    </div>
  </Layout>
);

CamilleBach.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default CamilleBach;
