// External Dependencies
import { Box } from '@mui/material';
import React, { FC } from 'react';

// Internal Dependencies
import { facebookUrl, instragramUrl, twitterUrl } from '../../utils/app-constants';

// Component Definition
const FooterFollowUs: FC = () => {
  <h3>bro</h3>
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
          href={instragramUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          Instagram
        </a>
      </Box>

      <Box>
        <a
          href={twitterUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          Twitter/X
        </a>
      </Box>
    </div>
  );
};

export default FooterFollowUs;
