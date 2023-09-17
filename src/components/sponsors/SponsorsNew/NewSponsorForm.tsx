// External Dependencies
import { Form, Formik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import { addSponsorSchema } from './schema';
import CloudinaryUploadWidget from '../../shared/CloudinaryUploadWidget';
import CtaButton from '../../shared/CtaButton';
import CustomTextField from '../../shared/CustomTextField';
import EnhancedAlert from '../../shared/EnhancedAlert';

// Local Typings
type SponsorLevelType =
  | 'Gold'
  | 'Silver'
  | 'Platinum'
  | 'Georgia O\' Keeffe'
  | 'Arthur Miller'
  | 'Gustav Mahler'
  | 'Martha Graham';

interface NewSponsorForm {
  honeypot?: string;
  LogoUrl: string;
  OrganizationWebsiteAddress: string;
  SponsorLevel: SponsorLevelType;
  SponsorOrganization: string;
}

interface CloudinaryUploadResult {
  info: {
    secure_url: string;
  }
}

interface CloudinaryWidget {
  open: () => void;
  close: (options: { quiet: boolean }) => void;
}

// Local Variables
const StyledRoot = styled.div({
  '.honey': {
    height: 1,
    opacity: 0,
    width: 1,
  },
});

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const initialNewSponsorFormValues: Partial<NewSponsorForm> = {
  honeypot: '',
  OrganizationWebsiteAddress: '',
  SponsorOrganization: '',
};

const handlePressSubmitButton = (values: NewSponsorForm) => {
  console.log('values: ', values);
};

// Component Definition
const NewSponsorForm: React.FC = () => {
  const [imageUrl, updateImageUrl] = useState<string>('');
  const [imageError, updateImageError] = useState<string>('');

  function handleOnUpload(
    error: string,
    result: CloudinaryUploadResult,
    widget: CloudinaryWidget,
  ) {

    if (error) {
      updateImageError(error);

      widget.close({
        quiet: true
      });
      return;
    }

    updateImageUrl(result?.info?.secure_url);
  }


  return (
    <StyledRoot>
      <Formik
        initialValues={initialNewSponsorFormValues}
        validationSchema={addSponsorSchema}
        onSubmit={handlePressSubmitButton}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => {
          const hasTouchedform = Object.values(touched).length > 0;
          const hasErrors = Object.values(errors).length > 0;

          return (
            <Form onSubmit={handleSubmit}>
              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.SponsorOrganization}
                  hasError={Boolean(errors.SponsorOrganization)}
                  isTouched={touched.SponsorOrganization}
                  label="Sponsor Organization*"
                  name="SponsorOrganization"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.SponsorOrganization}
                />
              </Box>

              {imageUrl ? null : (
                <Box mb={3}>
                  <Typography sx={{ marginBottom: 3 }}>Add Sponsor Logo</Typography>

                  <CloudinaryUploadWidget onUpload={handleOnUpload}>
                    {({ open }: CloudinaryWidget) => {
                      function handleOnClick(event: React.SyntheticEvent<HTMLButtonElement>) {
                        event.preventDefault();
                        open();
                      }

                      return (
                        <Button
                          onClick={handleOnClick}
                          startIcon={<AddIcon />}
                          variant="outlined"
                        >
                          Upload an Image
                        </Button>
                      )
                    }}
                  </CloudinaryUploadWidget>

                  <Collapse in={Boolean(imageError)}>
                    <Box mt={2}>
                      <EnhancedAlert severity="error">
                        {imageError}
                      </EnhancedAlert>
                    </Box>
                  </Collapse>
                </Box>
              )}

              {imageUrl ? (
                <Box mb={3}>
                  <Typography sx={{ marginBottom: 3 }}>Sponsor Logo</Typography>

                  <img
                    alt="sponsor logo"
                    src={imageUrl}
                  />
                </Box>
              ) : null}

              {/* Hidden input to help curtail spam */}
              <input
                aria-label="hidden input"
                className="honey"
                id="honeypot"
                name="honeypot"
                onChange={handleChange}
                type="text"
                value={values.honeypot}
              />

              <Box
                mb={2.5}
                mt={1}
                width="100%"
              >
                <EnhancedAlert severity={hasTouchedform && hasErrors ? 'error' : 'info'}>
                  Please enter a value in all required fields.
                </EnhancedAlert>
              </Box>

              <CtaButton
                disabled={hasTouchedform && hasErrors}
                fontWeight={600}
                rightArrow
                size="large"
                type="submit"
                width={240}
              >
                Add Sponsor
              </CtaButton>
            </Form>
          );
        }}
      </Formik>
    </StyledRoot>
  );
};

export default NewSponsorForm;
