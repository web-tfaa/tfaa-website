// External Dependencies
import React from 'react';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import HeroBannerImage from '../../shared/HeroBannerImage';
import { appNameShort } from '../../../utils/app-constants';

// Component Definition
const MembersHeroBannerImage: React.FC = () => {
  return (
    <HeroBannerImage
      imageOpacity={0.4}
      imageUrl="https://res.cloudinary.com/tmac/image/upload/v1675209763/woman-painting-on-canvas.png"
      mobileImageUrl="https://res.cloudinary.com/tmac/image/upload/v1675209763/woman-painting-on-canvas.png"
      tagline="Be part of something beautiful"
      title="Equity. Access. Excellence in Fine Arts Education"
      withButton
    >
      <Typography
        paragraph
        variant="body2"
      >
        Membership is open to Fine Arts administrators in any public school,
        charter school, private school, institution of higher education,
        or organization that supports the mission of {appNameShort}:
        to equip leaders to advance high quality fine arts education for all.
      </Typography>
    </HeroBannerImage>
  );
};

export default MembersHeroBannerImage;
