// External Dependencies
import Divider from '@mui/material/Divider';
import React from 'react';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

// Internal Dependencies
import { Sponsor } from '../../utils/hooks/useGetSponsorData';
import SponsorImageLink from './SponsorImageLink';
import { Typography } from '@mui/material';

// Local Typings
interface Props {
  sponsorData: Sponsor[];
}

// Local Variables
const StyledStack = styled(Stack)(({ theme }) => ({
  '.sponsorLevelDivider': {
    backgroundColor: theme.palette.text.primary,
    height: 1,
  },
  '.sponsorLevelTitle': {
    fontWeight: 600,
  },
}));

// Component Definition
const SponsorGrid = ({
  sponsorData,
}: Props): JSX.Element => {
  const georgiaOKeeffeSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Georgia O\'Keeffe');
  const gustavMahlerSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Gustav Mahler');
  const marthaGrahamSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Martha Graham');
  const arthurMillerSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Arthur Miller');
  const platinumSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Platinum');
  const goldSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Gold');
  const silverSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Silver');

  const georgiaOKeeffeElements = georgiaOKeeffeSponsors?.map((sponsor) => (
    <SponsorImageLink
      key={sponsor.SponsorOrganization}
      logoUrl={sponsor.LogoUrl}
      sponsorLevel={sponsor.SponsorLevel}
      sponsorName={sponsor.SponsorOrganization}
      websiteUrl={sponsor.OrganizationWebsiteAddress}
    />
  ));

  const gustavMahlerElements = gustavMahlerSponsors?.map((sponsor) => (
    <SponsorImageLink
      key={sponsor.SponsorOrganization}
      logoUrl={sponsor.LogoUrl}
      sponsorLevel={sponsor.SponsorLevel}
      sponsorName={sponsor.SponsorOrganization}
      websiteUrl={sponsor.OrganizationWebsiteAddress}
    />
  ));

  const marthaGrahamElements = marthaGrahamSponsors?.map((sponsor) => (
    <SponsorImageLink
      key={sponsor.SponsorOrganization}
      logoUrl={sponsor.LogoUrl}
      sponsorLevel={sponsor.SponsorLevel}
      sponsorName={sponsor.SponsorOrganization}
      websiteUrl={sponsor.OrganizationWebsiteAddress}
    />
  ));

  const arthurMillerElements = arthurMillerSponsors?.map((sponsor) => (
    <SponsorImageLink
      key={sponsor.SponsorOrganization}
      logoUrl={sponsor.LogoUrl}
      sponsorLevel={sponsor.SponsorLevel}
      sponsorName={sponsor.SponsorOrganization}
      websiteUrl={sponsor.OrganizationWebsiteAddress}
    />
  ));

  const platinumElements = platinumSponsors?.map((sponsor) => (
    <SponsorImageLink
      key={sponsor.SponsorOrganization}
      logoUrl={sponsor.LogoUrl}
      sponsorLevel={sponsor.SponsorLevel}
      sponsorName={sponsor.SponsorOrganization}
      websiteUrl={sponsor.OrganizationWebsiteAddress}
    />
  ));

  const goldElements = goldSponsors?.map((sponsor) => (
    <SponsorImageLink
      key={sponsor.SponsorOrganization}
      logoUrl={sponsor.LogoUrl}
      sponsorLevel={sponsor.SponsorLevel}
      sponsorName={sponsor.SponsorOrganization}
      websiteUrl={sponsor.OrganizationWebsiteAddress}
    />
  ));

  const silverElements = silverSponsors?.map((sponsor) => (
    <SponsorImageLink
      key={sponsor.SponsorOrganization}
      logoUrl={sponsor.LogoUrl}
      sponsorLevel={sponsor.SponsorLevel}
      sponsorName={sponsor.SponsorOrganization}
      websiteUrl={sponsor.OrganizationWebsiteAddress}
    />
  ));

  return (
    <StyledStack
      direction="column"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      useFlexGap
    >
      {georgiaOKeeffeSponsors?.length > 0 && (
        <>
        <div>
          <Typography
            className="sponsorLevelTitle"
            variant="h6"
          >
            Georgia O'Keeffe Sponsors
          </Typography>

          <Divider className="sponsorLevelDivider" />
        </div>

          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            useFlexGap
          >
            {georgiaOKeeffeElements}
          </Stack>
        </>
      )}
      {gustavMahlerSponsors?.length > 0 && (
        <>
          <div>
            <Typography
              className="sponsorLevelTitle"
              variant="h6"
            >
              Gustav Mahler Sponsors
            </Typography>

            <Divider className="sponsorLevelDivider" />
          </div>

          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            useFlexGap
          >
            {gustavMahlerElements}
          </Stack>
        </>
      )}
      {marthaGrahamSponsors?.length > 0 && (
        <>
          <div>
            <Typography
              className="sponsorLevelTitle"
              variant="h6"
            >
              Martha Graham Sponsors
            </Typography>

            <Divider className="sponsorLevelDivider" />
          </div>

          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            useFlexGap
          >
            {marthaGrahamElements}
          </Stack>
        </>
      )}
      {arthurMillerSponsors?.length > 0 && (
        <>
          <div>
            <Typography
              className="sponsorLevelTitle"
              variant="h6"
            >
              Arthur Miller Sponsors
            </Typography>

            <Divider className="sponsorLevelDivider" />
          </div>

          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            useFlexGap
          >
            {arthurMillerElements}
          </Stack>
        </>
      )}
      {platinumSponsors?.length > 0 && (
        <>
          <div>
            <Typography
              className="sponsorLevelTitle"
              variant="h6"
            >
              Platinum Sponsors
            </Typography>

            <Divider className="sponsorLevelDivider" />
          </div>

          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            useFlexGap
          >
            {platinumElements}
          </Stack>
        </>
      )}
      {goldSponsors?.length > 0 && (
        <>
          <div>
            <Typography
              className="sponsorLevelTitle"
              variant="h6"
            >
              Gold Sponsors
            </Typography>

            <Divider className="sponsorLevelDivider" />
          </div>

          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            useFlexGap
          >
            {goldElements}
          </Stack>
        </>
      )}
      {silverSponsors?.length > 0 && (
        <>
          <div>
            <Typography
              className="sponsorLevelTitle"
              variant="h6"
            >
              Silver Sponsors
            </Typography>

            <Divider className="sponsorLevelDivider" />
          </div>

          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            useFlexGap
          >
            {silverElements}
          </Stack>
        </>
      )}
    </StyledStack>
  );
};

export default SponsorGrid;
