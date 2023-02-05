// External Dependencies
import React from 'react';

// Internal Dependencies
import { TfaaAuthUser } from '../../layout';
import MemberContentBanner from './MemberContentBanner';
import WelcomeBanner from './WelcomeBanner';

// Local Typings
interface Props {
  authUser: TfaaAuthUser | null;
}

// Component Definition
const MemberContent: React.FC<Props> = ({ authUser }) => {
  return (
    <>
      <MemberContentBanner />

      <WelcomeBanner authUser={authUser} />
    </>
  );
};

export default MemberContent;
