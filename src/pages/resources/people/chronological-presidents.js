// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import { pastPresidents } from '../../../components/resources/resources-constants';

// Sidebar data
import Layout from '../../../components/layout';
import SidebarBody from '../../../components/shared/sidebar/sidebar-body';
import presets from '../../../utils/presets';
import resourcesSidebar from '../resources-links.yml';
import { options } from '../../../utils/typography';

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
class ChronologicalPresidents extends Component {
  renderTableRows = () =>
    pastPresidents.map((pres, index) => (
      // eslint-disable-next-line
      <tr key={`${pres.name}-${index}`}>
        <th>{pres.year}</th>
        <th>
          <Link to={`/resources/people/${pres.name.toLowerCase().split(' ').join('-')}`}>
            {pres.name}
          </Link>
        </th>
      </tr>
    ));

  render() {
    const { location } = this.props;
    return (
      <Layout location={location}>
        <Helmet>
          <title>TMAC | Past Presidents</title>
        </Helmet>
        <div css={rootStyles}>
          <Container>
            <CardHeadline>Past Presidents</CardHeadline>

            <div css={tableContainerStyles}>
              Chronological listing of all past TMAC Presidents
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
  }
}

ChronologicalPresidents.propTypes = propTypes;

export default ChronologicalPresidents;
