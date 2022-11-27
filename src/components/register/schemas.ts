// External Dependencies
import * as yup from 'yup';

export const registerMemberSchema = yup.object({
  Address1: yup
    .string()
    .trim()
    .required('Address 1 is required'),
  Address2: yup
    .string()
    .trim(),
  CellPhone: yup
    .string()
    .trim()
    .required('Cell Phone is required'),
  City: yup
    .string()
    .trim()
    .required('City is required'),
  District: yup
    .string()
    .trim()
    .required('District is required'),
  Email: yup
    .string()
    .trim()
    .email()
    .required('Email is required'),
  FirstName: yup
    .string()
    .trim()
    .required('First Name is required'),
  LastName: yup
    .string()
    .trim()
    .required('Last Name is required'),
  NewToTMAC: yup
    .boolean()
    .required(),
  OfficePhone: yup
    .string()
    .trim()
    .required('Office Phone is required'),
  State: yup
    .string()
    .trim()
    .required('State is required'),
  Title: yup
    .string()
    .trim()
    .required('Title is required'),
  ZipCode: yup
    .string()
    .trim()
    .required('Zip Code is required'),
});

export const registerSponsorSchema = yup.object({
  AmountDonated: yup
    .number()
    .required('Amount Donated is required'),
  City: yup
    .string()
    .trim()
    .required('City is required'),
  ContactAddress1: yup
    .string()
    .trim()
    .required('Contact Address 1 is required'),
  ContactPhone: yup
    .string()
    .trim()
    .required('Contact Phone is required'),
  Email: yup
    .string()
    .trim()
    .email()
    .required('Email is required'),
  OrganizationContactName: yup
    .string()
    .trim()
    .required('Organization Contact Name is required'),
  OrganizationWebsiteAddress: yup
    .string()
    .url()
    .trim()
    .required('Organization Website Address is required'),
  PaymentOption: yup
    .string()
    .trim()
    .required('Payment Option is required'),
  SponsorLevel: yup
    .string()
    .trim()
    .required('Sponsor Level is required'),
  SponsorOrganization: yup
    .string()
    .trim()
    .required('Sponsor Organization is required'),
  State: yup
    .string()
    .trim()
    .required('State is required'),
  Title: yup
    .string()
    .trim()
    .required('Title is required'),
  ZipCode: yup
    .string()
    .trim()
    .required('Zip Code is required'),
});
