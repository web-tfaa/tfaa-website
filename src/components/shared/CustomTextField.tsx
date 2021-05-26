// External Dependencies
import { FormikHandlers } from 'formik';
import { TextField } from '@material-ui/core';
import React, { FC } from 'react';

// Local Typings
interface Props {
  errorMessage: unknown; // will cast to string
  fullWidth?: boolean;
  hasError: boolean;
  id: string; // applied to id and name
  isTouched: boolean | undefined;
  label: string;
  onChange: FormikHandlers['handleChange'];
  value: string | undefined;
}

/*
 * Use this in a Formik context
 *
 */

// Component Definition
const CustomTextField: FC<Props> = ({
  errorMessage,
  fullWidth = true,
  hasError,
  id,
  isTouched,
  label,
  onChange,
  value,
  ...otherProps
}) => (
  <TextField
    {...otherProps}
    color="primary"
    error={isTouched && hasError}
    fullWidth={fullWidth}
    helperText={isTouched && errorMessage as string}
    id={id}
    label={label}
    name={id}
    onChange={onChange}
    value={value}
    variant="filled"
  />
);

export default CustomTextField;
