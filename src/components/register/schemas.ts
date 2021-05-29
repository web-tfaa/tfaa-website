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
