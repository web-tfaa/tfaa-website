// External Dependencies
import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import DrumBanner from '../../components/shared/DrumBanner';
import FooterTopper from '../../components/footer/FooterTopper';
import Layout from '../../components/layout';
import SponsorsNewContent from '../../components/sponsors/SponsorsNew/SponsorsNewContent';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.adminCard': {
    maxWidth: '75%',
  },

  '.paddingContainer': {
    padding: theme.spacing(0, 3, 3),
  },

  [theme.breakpoints.up('mobile')]: {
    paddingLeft: 0,
  },

  paddingLeft: 0,
  width: '0 auto',
}));

// Component Definition
const SponsorsNew: React.FC<Props> = ({ location })=> {
  return (
    <Layout
      location={location}
      pageTitle="Add Sponsor"
    >
      <StyledRoot>
        <SponsorsNewContent />

        <FooterTopper color="membership" />
      </StyledRoot>
    </Layout>
  );
};

export default SponsorsNew;
