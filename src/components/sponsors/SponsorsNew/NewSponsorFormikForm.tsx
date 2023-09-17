// External Dependencies
import { Form, FormikErrors, FormikHandlers, FormikTouched } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import React from 'react';
import Typography from '@mui/material/Typography';

// Internal Dependencies
import {
  CloudinaryUploadResult,
  NewSponsorForm,
} from '.';
import { SPONSOR_LEVEL_OPTIONS } from './constants';
import CloudinaryUploadWidget from '../../shared/CloudinaryUploadWidget';
import CtaButton from '../../shared/CtaButton';
import CustomSelect from '../../shared/CustomSelect';
import CustomTextField from '../../shared/CustomTextField';
import EnhancedAlert from '../../shared/EnhancedAlert';

// Local Typings
interface Props {
  formikErrors: FormikErrors<NewSponsorForm>;
  formikTouched: FormikTouched<NewSponsorForm>;
  formikValues: NewSponsorForm;
  imageError?: string;
  imageUrl?: string;
  onFormikBlur: FormikHandlers['handleBlur'];
  onFormikChange: FormikHandlers['handleChange'];
  onFormikSubmit: FormikHandlers['handleSubmit'];
  onUpdateImageError: (error: string) => void;
  onUpdateImageUrl: (url: string) => void;
}

interface CloudinaryWidget {
  open: () => void;
  close: (options: { quiet: boolean }) => void;
}

// Component Definition
const NewSponsorFormikForm: React.FC<Props> = ({
  formikErrors,
  formikTouched,
  formikValues,
  imageError,
  imageUrl,
  onFormikBlur,
  onFormikChange,
  onFormikSubmit,
  onUpdateImageError,
  onUpdateImageUrl,
}) => {
  const hasTouchedForm = Object.values(formikTouched).length > 0;
  const hasErrors = Object.values(formikErrors).length > 0;

  function handleOnUpload(
    error: string,
    result: CloudinaryUploadResult,
    widget: CloudinaryWidget,
  ) {

    if (error) {
      onUpdateImageError(error);

      widget.close({
        quiet: true
      });
      return;
    }

    onUpdateImageUrl(result?.info?.secure_url);
  }

  const shouldPreventSubmit = hasTouchedForm && (hasErrors || !imageUrl);

  return (
    <Form onSubmit={onFormikSubmit}>
      <Box marginBottom={3}>
        <CustomTextField
          errorMessage={formikErrors.SponsorOrganization}
          hasError={Boolean(formikErrors.SponsorOrganization)}
          isTouched={formikTouched.SponsorOrganization}
          label="Sponsor Organization*"
          name="SponsorOrganization"
          onBlur={onFormikBlur}
          onChange={onFormikChange}
          value={formikValues.SponsorOrganization}
        />
      </Box>

      <Box marginBottom={3}>
        <CustomSelect
          label="Sponsor Level*"
          name="SponsorLevel"
          options={SPONSOR_LEVEL_OPTIONS}
        />
      </Box>

      <Box marginBottom={3}>
        <CustomTextField
          errorMessage={formikErrors.OrganizationWebsiteAddress}
          hasError={Boolean(formikErrors.OrganizationWebsiteAddress)}
          isTouched={formikTouched.OrganizationWebsiteAddress}
          label="Sponsor Website Address*"
          name="OrganizationWebsiteAddress"
          onBlur={onFormikBlur}
          onChange={onFormikChange}
          value={formikValues.OrganizationWebsiteAddress}
        />
      </Box>

      {imageUrl ? null : (
        <Box marginBottom={3}>
          <Typography sx={{ marginBottom: 3 }}>
            Add Sponsor Logo
          </Typography>

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
            <Box marginBottom={2}>
              <EnhancedAlert severity="error">
                {imageError}
              </EnhancedAlert>
            </Box>
          </Collapse>
        </Box>
      )}

      {imageUrl ? (
        <Box marginBottom={3}>
          <Typography sx={{ marginBottom: 3 }}>
            Sponsor Logo
          </Typography>

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
        onChange={onFormikChange}
        type="text"
        value={formikValues.honeypot}
      />

      <Box
        mb={2.5}
        mt={1}
        width="100%"
      >
        <EnhancedAlert severity={shouldPreventSubmit ? 'error' : 'info'}>
          Please enter a value in each required field and upload a logo image.
        </EnhancedAlert>
      </Box>

      <CtaButton
        disabled={shouldPreventSubmit}
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
};

export default NewSponsorFormikForm;
