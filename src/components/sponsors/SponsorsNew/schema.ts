// External Dependencies
import * as yup from 'yup';

export const addSponsorSchema = yup.object({
  honeyPot: yup
    .string()
    .trim(),
  OrganizationWebsiteAddress: yup
    .string()
    .url()
    .trim()
    .required('Organization Website Address is required'),
  SponsorLevel: yup
    .string()
    .trim()
    .required('Sponsor Level is required'),
  SponsorOrganization: yup
    .string()
    .trim()
    .required('Sponsor Organization is required'),
  LogoUrl: yup
    .string()
    .url()
    .trim()
    .required('Logo URL is required'),
});
