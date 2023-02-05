// External Dependencies
import Box from '@mui/material/Box';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
import Motifs from '../../../shared/Motifs';
import MemberStatus from './MemberStatus';

// Local Typings
interface Props {
  currentMemberData: TfaaMemberData | null;
  isAdmin: boolean;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  // '.welcomeMember': {
  //   [theme.breakpoints.down('mobile')]: {
  //     fontSize: 20,
  //   },
  //   fontSize: 30,
  //   fontWeight: 600,
  // },

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 8),
  },
  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(4, 5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 4),
  },

  // alignItems: 'center',
  // backgroundColor: theme.palette.tfaa.membership,
  // color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(8, 18),
  width: '100%',
}));


/*
 * This is where all of the interactive member content lives.
 *
 */

// Component Definition
const MemberInfo: React.FC<Props> = ({
  currentMemberData,
}) => {
  return (
    <StyledRoot>
      <Motifs small />

      <Box marginBottom={3}>
        <MemberStatus currentMemberData={currentMemberData} />
      </Box>
    </StyledRoot>
  );
};

export default MemberInfo;
