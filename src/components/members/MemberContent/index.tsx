// External Dependencies
import React from 'react';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import { TfaaAuthUser } from '../../layout';
import MemberContentBanner from './MemberContentBanner';

// Local Typings
interface Props {
  authUser: TfaaAuthUser | null;
}

// Component Definition
const MemberContent: React.FC<Props> = ({ authUser }) => {
  return (
    <>
      <MemberContentBanner />

      <Typography variant="h2">
        Member Dashboard
      </Typography>
    </>
  );
};

export default MemberContent;
