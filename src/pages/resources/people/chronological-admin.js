// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import { outstandingAdmin } from '../../../components/resources/resources-constants';
import { options } from '../../../utils/typography';

// Sidebar data
import Layout from '../../../components/layout';
import presets from '../../../utils/presets';
import resourcesSidebar from '../resources-links.yml';
import SidebarBody from '../../../components/shared/sidebar/sidebar-body';

// Local Variables
const propTypes = {
  location: PropTypes.shape({}).isRequired,
};

const rootStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const tableContainerStyles = {
  fontFamily: options.headerFontFamily.join(','),
  lineHeight: '1.6',
};

// Component Definition
class ChronologicalAdmin extends Component {
  renderTableRows = () =>
    outstandingAdmin.map((admin) => (
      <tr key={`${admin.name}`}>
        <th>{admin.year}</th>
        <th>
          <Link to={`/resources/people/${admin.name.toLowerCase().split(' ').join('-')}`}>
            {admin.name}
          </Link>
        </th>
      </tr>
    ));

  render() {
    const { location } = this.props;

    return (
      <Layout location={location}>
        <Helmet>
          <title>TMAC | Outstanding Administrators</title>
        </Helmet>
        <div css={rootStyles}>
          <Container>
            <CardHeadline>Outstanding Administrators</CardHeadline>

            <div css={tableContainerStyles}>
              Chronological listing of all TMAC Outstanding Administrator Award
              Recipients
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>{this.renderTableRows()}</tbody>
              </table>
            </div>
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
  }
}

ChronologicalAdmin.propTypes = propTypes;

export default ChronologicalAdmin;
