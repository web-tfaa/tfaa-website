// External Dependencies
import Box from '@mui/material/Box';
import React from 'react';

// Internal Dependencies
import CtaButton from './CtaButton';
import DrumBanner from './DrumBanner';
import EnhancedAlert from './EnhancedAlert';

// Component Definition
const RestrictedAccess: React.FC = () => {
  return (
    <>
      <DrumBanner drumBannerTitle="Not Allowed" />

      <Box margin={4}>
        <EnhancedAlert
          className="adminCard"
          severity="warning"
          sx={{ maxWidth: '75%' }}
          title="Admin Users Only"
        >
          This data is only available for admin users.
        </EnhancedAlert>

        <Box marginTop={4}>
          <CtaButton
            colorVariant="resources"
            fontWeight={600}
            size="large"
            to="/"
            width={180}
            >
            View Home Page
          </CtaButton>
        </Box>
      </Box>
    </>
  );
};

export default RestrictedAccess;
