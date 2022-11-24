// External Dependencies
import { Box } from '@mui/material';
import React, { FC } from 'react';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Component Definition
const MemberInfoBlock: FC<Props> = ({ children }) => (
  <Box
    marginBottom={1}
    marginLeft={2}
  >
    {children}
  </Box>
);

export default MemberInfoBlock;
