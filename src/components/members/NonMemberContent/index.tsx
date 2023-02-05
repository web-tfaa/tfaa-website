// External Dependencies
import React from 'react';

// Internal Dependencies
import MemberInfoList from './MemberInfoList';
import MembersBanner from './MembersBanner';
import MembersHeroBannerImage from './MembersHeroBannerImage';
import MembersInfoBanner from './MembersInfoBanner';
import MembersOneTwoThree from './MembersOneTwoThree';
import WhereWeHaveBeen from '../../about/WhereWeHaveBeen';

// Component Definition
const NonMemberContent: React.FC = () => {
  return (
    <>
      <MembersBanner />

      <MembersInfoBanner />

      <MembersOneTwoThree />

      <MembersHeroBannerImage />

      <MemberInfoList />

      <WhereWeHaveBeen color="membership" />
    </>
  );
};

export default NonMemberContent;
