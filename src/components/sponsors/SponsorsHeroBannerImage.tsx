// External Dependencies
import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import HeroBannerImage from '../shared/HeroBannerImage';

// Component Definition
const SponsorsHeroBannerImage: FC = () => {
  return (
    <HeroBannerImage
      imageOpacity={0.2}
      imageUrl="https://res.cloudinary.com/tmac/image/upload/v1675109791/art-teacher-with-class.png"
      leftAlign
      mobileImageUrl="https://res.cloudinary.com/tmac/image/upload/v1675110598/art-teacher-with-class-mobile.png"
      tagline="Be part of something beautiful"
      title={(
        <>
          Join. Learn.
          <br />
          Lead.
        </>
      )}
    >
      <Typography
        paragraph
        variant="body2"
      >
        Student and professional subscribers can access tools and
        resources to understand, appreciate, and perform the arts,
        including study materials, practice tests, forums,
        educational content, career in the arts tools.
      </Typography>
    </HeroBannerImage>
  );
};

export default SponsorsHeroBannerImage;
