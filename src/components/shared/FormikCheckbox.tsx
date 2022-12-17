// External Dependencies
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useField } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props extends CheckboxProps {
  helperText?: string;
  label: string;
  name: string;
}

// Local Variables
const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '.label': {
    marginLeft: theme.spacing(1),
  },
}));

// Component Definition
const FormikCheckbox: FC<Props> = ({
  inputProps = {},
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField(name);

  const hasError = !!meta.error;
  const isTouched = !!meta.touched;

  return (
    <FormControl
      component="fieldset"
      error={isTouched && hasError}
      required
    >
      <StyledFormControlLabel
        classes={{ label: 'label' }}
        control={(
          <Checkbox
            color="primary"
            {...field}
            {...props}
            checked={field.value}
            inputProps={{
              ...inputProps,
            }}
          />
        )}
        label={label}
      />
    </FormControl>
  );
};

export default FormikCheckbox;
