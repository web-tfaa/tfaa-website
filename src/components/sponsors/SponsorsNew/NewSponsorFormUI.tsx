// External Dependencies
import Collapse from '@mui/material/Collapse';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { addSponsorSchema } from './schema';
import { NewSponsorForm } from './index.d';
import EnhancedAlert from '../../shared/EnhancedAlert';
import NewSponsorFormikForm from './NewSponsorFormikForm';
import usePrevious from '../../../utils/hooks/usePrevious';
import { createSponsorDocument } from '../../../firebase/db';

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
const initialNewSponsorFormValues: NewSponsorForm = {
  honeypot: '',
  LogoUrl: '',
  OrganizationWebsiteAddress: '',
  SponsorLevel: '',
  SponsorOrganization: '',
};

// Component Definition
const NewSponsorFormUI: React.FC = () => {
  const [imageUrl, updateImageUrl] = useState<string>('');
  const [imageError, updateImageError] = useState<string>('');
  const [hasSubmitError, updateHasSubmitError] = useState<boolean>(false);

  const previousImageUrl = usePrevious(imageUrl);

  useEffect(() => {
    if (imageUrl && previousImageUrl) {
      updateImageError('');
    }
  }, [imageUrl, previousImageUrl]);

  const handleCompleteCreateNewSponsor = useCallback((hasError: boolean) => {
    if (hasError) {
      return updateHasSubmitError(true);
    }
    // Reset the form values
    updateImageUrl('');
    updateImageError('');

    // We do a hard push to the sponsor table page to ensure that the
    //  data around the image upload is reset correctly
    window.location.href = '/sponsors/sponsors-table';
  }, []);

  const handlePressSubmitButton = useCallback(async (values: NewSponsorForm) => {
    if (imageError) {
      // Return early if there is an image error
      return;
    }

    // Add the image URL to the form values
    const updatedValues = {
      OrganizationWebsiteAddress: values.OrganizationWebsiteAddress,
      SponsorLevel: values.SponsorLevel,
      SponsorOrganization: values.SponsorOrganization,
      LogoUrl: imageUrl,
    };

    // Create a new record in the Firestore database
    //  using the form values and the image URL
    createSponsorDocument(updatedValues, handleCompleteCreateNewSponsor);
  }, [imageUrl]);

  const handleUpdateImageUrl = useCallback((url: string) => {
    updateImageUrl(url);
  }, []);

  const handleUpdateImageError = useCallback((error: string) => {
    updateImageError(error);
  }, []);

  return (
    <StyledRoot>
      <Formik
        enableReinitialize
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
          return (
            <NewSponsorFormikForm
              formikErrors={errors}
              formikTouched={touched}
              formikValues={values}
              imageError={imageError}
              imageUrl={imageUrl}
              onFormikBlur={handleBlur}
              onFormikChange={handleChange}
              onFormikSubmit={handleSubmit}
              onUpdateImageError={handleUpdateImageError}
              onUpdateImageUrl={handleUpdateImageUrl}
            />
          );
        }}
      </Formik>

      <Collapse in={hasSubmitError}>
        <EnhancedAlert
          severity="error"
        >
          There was an error submitting your form. Please try again.
        </EnhancedAlert>
      </Collapse>
    </StyledRoot>
  );
};

export default NewSponsorFormUI;
