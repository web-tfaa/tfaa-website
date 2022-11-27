// External Dependencies
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import { outstandingAdmin } from '../../../components/resources/resources-constants';
import { options } from '../../../utils/typography';

// Sidebar data
import Layout from '../../../components/layout';
import resourcesSidebar from '../resources-links.yml';
import MobileDivider from '../../../components/shared/MobileDivider';
import SidebarBody from '../../../components/shared/sidebar/SidebarBody';

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
const ChronologicalAdmin = ({ location }) => {
  const adminList = useMemo(() =>
    outstandingAdmin.map((admin) => (
      <tr key={`${admin.year}`}>
        <th>{admin.year}</th>
        <th>
          <Link to={`/resources/people/${admin.name.toLowerCase().split(' ').join('-')}`}>
            {admin.name}
          </Link>
        </th>
      </tr>
    )), []);

  return (
    <Layout location={location}>
      <Helmet>
        <title>TMAC | Outstanding Administrators</title>
      </Helmet>

      <StyledRoot>
        <Container>
          <CardHeadline>Outstanding Administrators</CardHeadline>

          <div className="tableContainer">
            Chronological listing of all TMAC Outstanding Administrator Award
            Recipients
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{adminList}</tbody>
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

ChronologicalAdmin.propTypes = propTypes;

export default ChronologicalAdmin;
