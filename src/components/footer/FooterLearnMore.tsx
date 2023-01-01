// External Dependencies
import { Box } from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import React, { FC } from 'react';

// Component Definition
const FooterLearnMore: FC = () => {
  return (
    <div className="linkList">
      LEARN MORE
      <hr />
      <Box>
        <Link to="/about">The issue</Link>
      </Box>
      <Box>
        <Link to="/about">How we help</Link>
      </Box>
      <Box>
        <Link to="/about">Get involved</Link>
      </Box>
      <Box>
        <Link to="/about">Latest news</Link>
      </Box>
    </div>
  );
};

export default FooterLearnMore;
