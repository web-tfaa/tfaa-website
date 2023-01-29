// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import React, { FC, useMemo } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { pastPresidents } from '../../components/about/about-constants';
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
const About: FC<Props> = ({ location }) => {
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
    <Layout
      location={location}
      pageTitle={`${appNameShort} Past Presidents`}
    >
      <StyledRoot>
        <h1>Past Presidents</h1>

        <Typography paragraph>
          Chronological listing of all past TMAC Presidents
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

            <tbody>{presidentsList}</tbody>
          </table>
        </Card>
      </StyledRoot>
    </Layout>
  );
};

export default About;
