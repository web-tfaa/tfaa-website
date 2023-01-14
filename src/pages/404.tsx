// External Dependencies
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import React, { FC } from 'react';
import { Link } from 'gatsby-theme-material-ui';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../utils/app-constants';
import Layout from '../components/layout';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledContainer = styled(Container)(({ theme }) => ({
  '&.MuiPaper-root': {
    display: 'flex',
    justifyContent: 'center',
    maxHeight: 240,
    maxWidth: 500,
  },
  'h1, h2': {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightMedium,
  },
  h1: {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 42,
    },
    fontSize: 64,
    lineHeight: '92px',
  },

  backgroundColor: theme.palette.tfaa.backgroundLight,
}));

// Component Definition
const FourOhFour: FC<Props> = ({ location }) => (
  <Layout location={location}>
    <StyledContainer
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        paddingTop: 10,
      }}
    >
      <Card>
        <CardContent>
          <h1>Page not found</h1>

          <p>
            Try heading back to our <Link to="/">main page</Link> to find out more
            about {appNameShort}!
          </p>
        </CardContent>
      </Card>
    </StyledContainer>
  </Layout>
);

export default FourOhFour;
