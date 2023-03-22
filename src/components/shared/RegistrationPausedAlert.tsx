// External Dependencies
import { appNameShort } from '../../utils/app-constants';
import Box from '@mui/material/Box';
import EnhancedAlert from './EnhancedAlert';
import React from 'react';

// Local Typings
interface Props {
  isMembership?: boolean;
}

// Component Definition
const RegistrationPausedAlert: React.FC<Props> = ({ isMembership = true }) => {
  const type = isMembership ? 'Membership' : 'Sponsorship';

  return (
    <Box mt={3}>
      <EnhancedAlert title={`${type} Notice`}>
        {appNameShort} {type} will open up again on July 1st.
      </EnhancedAlert>
    </Box>
  );
};

export default RegistrationPausedAlert;
