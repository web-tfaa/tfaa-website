// External Dependencies
import { FormikHandlers } from 'formik';
import { TextField } from '@material-ui/core';
import React, { FC } from 'react';

// Local Typings
interface Props {
  className?: string;
  hasError: boolean;
  id: string; // applied to id and name
  isTouched: boolean;
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
  className,
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
    className={className}
    color="primary"
    error={isTouched && hasError}
    fullWidth
    helperText={isTouched && hasError}
    id={id}
    label={label}
    name={id}
    onChange={onChange}
    value={value}
    variant="filled"
  />
);

export default CustomTextField;
