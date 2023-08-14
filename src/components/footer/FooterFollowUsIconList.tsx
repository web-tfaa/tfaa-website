// External Dependencies
import { Avatar, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

// Internal Dependencies
import { facebookUrl, instragramUrl, twitterUrl } from '../../utils/app-constants';

// Component Definition
const FooterFollowUsIconList: FC = () => {
  return (
    <div className="followUsIconList">
      <Typography sx={{ fontSize: 14 }}>
        FOLLOW US
      </Typography>

      <div>
        <IconButton
          aria-label="Facebook Link."
          href={facebookUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          <Avatar>
            <FacebookIcon fontSize="small" />
          </Avatar>
        </IconButton>

        <IconButton
          aria-label="Instagram Link."
          href={instragramUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          <Avatar>
            <InstagramIcon fontSize="small" />
          </Avatar>
        </IconButton>

        <IconButton
          aria-label="X Link."
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
