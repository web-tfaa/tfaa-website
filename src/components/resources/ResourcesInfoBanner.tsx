// External Dependencies
import React from 'react';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import { appName, appNameShort } from '../../utils/app-constants';
import InfoBanner from '../shared/InfoBanner';

// Component Definition
const ResourcesInfoBanner: React.FC = () => {
  return (
    <InfoBanner color="resources">
      <Typography paragraph>
        {appNameShort} provides Fine Arts Administrators the resources
        to advance high-quality education for all Texas students.
      </Typography>

      <Typography paragraph>
        Welcome to {appNameShort} — {appName} resources. Here you will
        find important and relevant information about managing Texas
        Fine Arts programs.
      </Typography>

      <Typography paragraph>
        If you have any questions about this site or need any help,
        please feel free to contact us at any time.
      </Typography>
    </InfoBanner>
  );
};

export default ResourcesInfoBanner;
