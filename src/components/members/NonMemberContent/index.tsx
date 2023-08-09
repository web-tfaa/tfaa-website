// External Dependencies
import React from 'react';

// Internal Dependencies
import FooterTopper from '../../footer/FooterTopper';
import MemberInfoList from './MemberInfoList';
import MembersBanner from './MembersBanner';
import MembersHeroBannerImage from './MembersHeroBannerImage';
import MembersInfoBanner from './MembersInfoBanner';
import MembersOneTwoThree from './MembersOneTwoThree';

// Component Definition
const NonMemberContent: React.FC = () => {
  return (
    <>
      <MembersBanner />

      <MembersInfoBanner />

      <MembersOneTwoThree />

      <MembersHeroBannerImage />

      <MemberInfoList />

      <FooterTopper color="membership" />
    </>
  );
};

export default NonMemberContent;
