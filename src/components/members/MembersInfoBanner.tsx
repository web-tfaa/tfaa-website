// External Dependencies
import React from 'react';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import { appName } from '../../utils/app-constants';
import InfoBanner from '../shared/InfoBanner';

// Component Definition
const MembersInfoBanner: React.FC = () => {
  return (
    <InfoBanner color="membership">
      <Typography paragraph>
        {appName} is the state-wide, non-profit professional
        association for and representative of all Fine Arts
        administrators in Texas.
      </Typography>

      <Typography paragraph>
        Our members promote and support Fine Arts education
        and Fine Arts educators through collaboration,
        networking, and the sharing of best practices so that
        every child in Texas is assured of receiving quality
        instruction in the understanding, appreciation,
        creation, and performance of the four artistic disciplines.
      </Typography>
    </InfoBanner>
  );
};

export default MembersInfoBanner;
