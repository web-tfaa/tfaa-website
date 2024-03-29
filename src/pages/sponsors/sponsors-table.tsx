// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import FooterTopper from '../../components/footer/FooterTopper';
import Layout from '../../components/layout';
import SponsorsTableContent from '../../components/sponsors/SponsorsTable/SponsorsTableContent';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
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
const SponsorsTable: React.FC<Props> = ({ location }) => {
  return (
    <Layout
      location={location}
      pageTitle="Sponsors List"
    >
      <StyledRoot>
        <SponsorsTableContent />

        <FooterTopper color="membership" />
      </StyledRoot>
    </Layout>
  );
};

export default SponsorsTable;
