// External Dependencies
import { Box } from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import React, { FC } from 'react';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Component Definition
const FooterLearnMore: FC = () => {
  return (
    <div className="linkList">
      LEARN MORE
      <hr />
      <Box>
        <Link to="/about">About {appNameShort}</Link>
      </Box>
      <Box>
        <Link to="/events">Events</Link>
      </Box>
      <Box>
        <Link to="/resources">Resources</Link>
      </Box>
      <Box>
        <Link to="/members">Members</Link>
      </Box>
      <Box>
        <Link to="/sponsors">Sponsors</Link>
      </Box>
    </div>
  );
};

export default FooterLearnMore;
