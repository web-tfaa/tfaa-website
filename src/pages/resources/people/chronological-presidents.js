// External Dependencies
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import { pastPresidents } from '../../../components/resources/resources-constants';

// Sidebar data
import Layout from '../../../components/layout';
import MobileDivider from '../../../components/shared/MobileDivider';
import SidebarBody from '../../../components/shared/sidebar/SidebarBody';
import resourcesSidebar from '../resources-links.yml';
import { options } from '../../../utils/typography';

// Local Variables
const propTypes = {
  location: PropTypes.shape({}).isRequired,
};

const StyledRoot = styled.div({
  '.tableContainer': {
    fontFamily: options.headerFontFamily.join(','),
    lineHeight: '1.6',
  },

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

// Component Definition
const ChronologicalPresidents = ({ location }) => {
  const presidentsList = useMemo(() =>
    pastPresidents.map((pres) => (
      <tr key={pres.year}>
        <th>{pres.year}</th>
        <th>
          <Link to={`/resources/people/${pres.name.toLowerCase().split(' ').join('-')}`}>
            {pres.name}
          </Link>
        </th>
      </tr>
    )), []);

  return (
    <Layout location={location}>
      <Helmet>
        <title>TMAC | Past Presidents</title>
      </Helmet>

      <StyledRoot>
        <Container>
          <CardHeadline>Past Presidents</CardHeadline>

          <div className="tableContainer">
            Chronological listing of all past TMAC Presidents
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{presidentsList}</tbody>
            </table>
          </div>

          <MobileDivider>
            <SidebarBody
              inline
              yaml={resourcesSidebar}
            />
          </MobileDivider>
        </Container>
      </StyledRoot>
    </Layout>
  );
};

ChronologicalPresidents.propTypes = propTypes;

export default ChronologicalPresidents;
