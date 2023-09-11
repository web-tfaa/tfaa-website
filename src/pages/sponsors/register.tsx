// External Dependencies
import Box from '@mui/material/Box';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Layout from '../../components/layout';
import DrumBanner from '../../components/shared/DrumBanner';
// import SponsorRegisterContent from '../../components/register/SponsorRegisterContent';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100vw',
});

const StyledOpenInNewIcon = styled(OpenInNewIcon)({
  '&&': {
    color: 'inherit',
    fontSize: '0.8em',
    marginLeft: '0.25em',
  }
}) as typeof OpenInNewIcon;

// Component Definition
const SponsorsRegister: React.FC<Props> = ({ location }) => {
  return (
    <Layout
      location={location}
      pageTitle="Membership Registration"
    >
      <StyledRoot>
        {/* <SponsorRegisterContent /> */}

        <DrumBanner drumBannerTitle="Sponsors Registration" />

        <Box marginY={6}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScixBGNVLwsLURlTHn0Y35Ix11uYOM9s4gEG00SPH3BVhPrZA/viewform?usp=sharing"
            target="_blank"
          >
            Please select this link to complete the Sponsorship Registration Form and submit payments.
            <StyledOpenInNewIcon />
          </a>
          </Box>
      </StyledRoot>
    </Layout>
  );
};

export default SponsorsRegister;
