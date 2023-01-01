// External Dependencies
import { Avatar, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

// Internal Dependencies
import { facebookUrl, twitterUrl } from '../../utils/app-constants';

// Component Definition
const FooterFollowUsIconList: FC = () => {
  return (
    <div className="followUsIconList">
      <Typography sx={{ fontSize: 14 }}>
        FOLLOW US
      </Typography>

      <div>
        <IconButton
          href={facebookUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          <Avatar>
            <FacebookIcon fontSize="small" />
          </Avatar>
        </IconButton>

        <IconButton
          href={twitterUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          <Avatar>
            <TwitterIcon fontSize="small" />
          </Avatar>
        </IconButton>
      </div>
    </div>
  );
};

export default FooterFollowUsIconList;
