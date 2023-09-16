// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { Sponsor } from '../../utils/hooks/useGetSponsorData';
import { appNameShort } from '../../utils/app-constants';

// Local Typings
interface Props {
  logoUrl: Sponsor['LogoUrl'];
  sponsorLevel: Sponsor['SponsorLevel'];
  sponsorName: Sponsor['SponsorOrganization'];
  websiteUrl: Sponsor['OrganizationWebsiteAddress'];
}

// Local Variables
const StyledAnchor = styled.a({
  '&&' : {
    borderBottom: 'none',
    boxShadow: 'none',
  },
  maxWidth: '33%',
});

// Component Definition
const SponsorImageLink = ({
  logoUrl,
  sponsorLevel,
  sponsorName,
  websiteUrl,
}: Props): JSX.Element => {
  return (
    <StyledAnchor
      href={websiteUrl}
      rel="noreferrer noopener"
      target="_blank"
    >
      <img
        alt={`${sponsorName} — ${appNameShort} ${sponsorLevel} Sponsor`}
        src={logoUrl}
      />
    </StyledAnchor>
  );
};

export default SponsorImageLink;
