// External Dependencies
import Box from '@mui/material/Box';
import React from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';

// Internal Dependencies
import { addSponsorSchema } from './schema';
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
