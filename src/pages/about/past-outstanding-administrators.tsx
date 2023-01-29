// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import React, { FC, useMemo } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { outstandingAdmin } from '../../components/about/about-constants';
import Layout from '../../components/layout';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.tableContainer': {
    '& table': {
      margin: theme.spacing(2),
    },

    lineHeight: '1.6',
  },

  h1: {
    fontWeight: 900,
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(3),
  },

  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: theme.spacing(6),
  width: '100vw',
}));

// Component Definition
const PastOutstandingAdministrators: FC<Props> = ({ location }) => {
  const outstandingAdminList = useMemo(() =>
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
    <Layout
      location={location}
      pageTitle={`${appNameShort} Past Outstanding Administrators`}
    >
      <StyledRoot>
        <Typography
          component="h1"
          variant="h5"
        >
          Past Outstanding Administrators
        </Typography>

        <Typography paragraph>
          Chronological listing of all {appNameShort}{' '}
          Outstanding Administrator Award Recipients
        </Typography>

        <Card
          className="tableContainer"
          variant="outlined"
        >
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>{outstandingAdminList}</tbody>
          </table>
        </Card>
      </StyledRoot>
    </Layout>
  );
};

export default PastOutstandingAdministrators;
