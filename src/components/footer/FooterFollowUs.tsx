// External Dependencies
import { Box } from '@mui/material';
import React, { FC } from 'react';

// Internal Dependencies
import { facebookUrl, twitterUrl } from '../../utils/app-constants';

// Component Definition
const FooterFollowUs: FC = () => {
  return (
    <div className="linkList">
      FOLLOW US
      <hr />
      <Box>
        <a
          href={facebookUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          Facebook
        </a>
      </Box>
      <Box>
        <a
          href={twitterUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          Twitter
        </a>
      </Box>
    </div>
  );
};

export default FooterFollowUs;
