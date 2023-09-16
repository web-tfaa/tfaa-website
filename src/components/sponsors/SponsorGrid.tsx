// External Dependencies
import React from 'react';
import Stack from '@mui/material/Stack';

// Internal Dependencies
import { Sponsor } from '../../utils/hooks/useGetSponsorData';
import SponsorImageLink from './SponsorImageLink';
import { Typography } from '@mui/material';

// Local Typings
interface Props {
  sponsorData: Sponsor[];
}

// Component Definition
const SponsorGrid = ({
  sponsorData,
}: Props): JSX.Element => {
  // const georgiaOKeeffeSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Georgia O\'Keeffe');
  // const gustavMahlerSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Gustav Mahler');
  const marthaGrahamSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Martha Graham');
  // const arthurMillerSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Arthur Miller');
  // const platinumSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Platinum');
  // const goldSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Gold');
  // const silverSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Silver');

  const marthaGrahamElements = marthaGrahamSponsors?.map((sponsor) => (
    <SponsorImageLink
      key={sponsor.SponsorOrganization}
      logoUrl={sponsor.LogoUrl}
      sponsorLevel={sponsor.SponsorLevel}
      sponsorName={sponsor.SponsorOrganization}
      websiteUrl={sponsor.OrganizationWebsiteAddress}
    />
  ));

  return (
    <Stack
      direction="column"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      useFlexGap
    >
      {marthaGrahamSponsors?.length > 0 && (
        <>
          <Typography variant="h6">Martha Graham Sponsors</Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
          >
            {marthaGrahamElements}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default SponsorGrid;
