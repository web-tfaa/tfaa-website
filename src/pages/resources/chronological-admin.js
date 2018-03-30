// External Dependencies
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import Link from 'gatsby-link';

// Internal Dependencies
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import FuturaParagraph from '../../components/shared/futura-paragraph';
import { outstandingAdmin } from './resources-constants';
import { options } from '../../utils/typography';

// Local Variables
const rootStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const tableContainerStyles = {
  fontFamily: options.headerFontFamily.join(`,`),
  lineHeight: '1.6',
};

// Component Definition
class ChronologicalAdmin extends Component {
  renderTableRows = () =>
    outstandingAdmin.map(admin => {
      console.log('admin', admin.name);
      return (
        <tr key={`${admin.name}`}>
          <th>{admin.year}</th>
          <th>
            <Link to={`/resources/people/#${admin.name.toLowerCase().split(' ').join('-')}`}>
              {admin.name}
            </Link>
          </th>
        </tr>
      )});

  render() {
    return (
      <div>
        <Helmet>
          <title>TMAC | Outstanding Administrators</title>
        </Helmet>
        <div
          css={rootStyles}
        >
          <Container>
            <CardHeadline>Outstanding Administrators</CardHeadline>

            <div
              css={tableContainerStyles}
            >
              Chronological listing of all TMAC Outstanding Administrator Award Recipients
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTableRows()}
                </tbody>
              </table>
            </div>

          </Container>
        </div>
      </div>
    );
  }
}

export default ChronologicalAdmin;
