// External Dependencies
import { FormikHandlers, useField, useFormikContext } from 'formik';
import { TextField } from '@mui/material';
import { FC, useEffect } from 'react';

// Internal Dependencies
import { formatPhone } from '../../utils/formatPhone';

// Local Typings
interface Props {
  errorMessage: unknown; // will cast to string
  fullWidth?: boolean;
  hasError: boolean;
  isTouched: boolean | undefined;
  label: string;
  name: string; // applied to id and name
  onBlur: FormikHandlers['handleBlur'];
  onChange?: FormikHandlers['handleChange'];
  type?: string;
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
  isTouched,
  label,
  name,
  type,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();

  const [field] = useField(name);

  const { value: valueFromFormikField } = field;

  // We have to use Formik's system to manually format phone numbers
  useEffect(() => {
    if (type === 'tel' && valueFromFormikField.length > 0) {
      setFieldValue(
        name,
        formatPhone(valueFromFormikField) as string,
      );
    }
  }, [name, setFieldValue, type, valueFromFormikField]);

  const updatedField = {
    ...field,
    value: valueFromFormikField,
  };

  return (
    <TextField
      {...otherProps}
      color="primary"
      error={isTouched && hasError}
      fullWidth={fullWidth}
      helperText={isTouched && errorMessage as string}
      id={name}
      label={label}
      variant="filled"
      {...updatedField}
    />
  );
};

export default CustomTextField;
