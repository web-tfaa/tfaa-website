// External Dependencies
import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import HeroBannerImage from '../shared/HeroBannerImage';
import { appName, appNameShort } from '../../utils/app-constants';

// Component Definition
const ResourcesHeroBannerImage: FC = () => {
  return (
    <HeroBannerImage
      imageOpacity={0.2}
      imageUrl="https://res.cloudinary.com/tmac/image/upload/v1675101117/violin-performer.png"
      mobileImageUrl="https://res.cloudinary.com/tmac/image/upload/v1675101766/violin-performer-mobile.png"
      tagline="Be part of something beautiful"
      title="Fine Arts are for Everyone"
    >
      <Typography
        paragraph
        variant="body2"
      >
        {appNameShort} — {appName} provide training and resources to transform
        students through the pursuit of excellence in the Arts.
      </Typography>

      <Typography variant="body2">
        {appNameShort} provides a powerful network for Fine Arts administrators
        and leaders to support teachers and transform programs into communities
        of visual and performing artists.
      </Typography>
    </HeroBannerImage>
  );
};

export default ResourcesHeroBannerImage;
