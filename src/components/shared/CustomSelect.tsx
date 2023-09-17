// External Dependencies
import React, {
  FC, useMemo,
} from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectProps } from '@mui/material/Select';
import clsx from 'clsx';
import styled from 'styled-components';

// Local Typings
export interface SelectOption {
  id: string | number;
  label: string;
}
export interface CustomSelectProps extends SelectProps {
  error?: boolean;
  helperText?: React.ReactNode;
  isLoading?: boolean;
  label: string;
  menuClasses?: string;
  name: string;
  onChange?: SelectProps['onChange'];
  options?: SelectOption[];
}

// Local Variables
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '&.customSelectForm': {
    margin: '8px 0',
  },
  '.helperText': {
    margin: '8px 14px 0',
  },
  '.input': {
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9em',
    },
  },
  '.label': {
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9em',
    },
  },
}));

// Local Components
const LoadingComponent: FC = () => (
  <Box pr={2}>
    <CircularProgress size={24} />
  </Box>
);

/*
 * This component should be used in a Formik context
 *
 */

// Component Definition
const CustomSelect: FC<CustomSelectProps & SelectProps> = ({
  error,
  // fullWidth = true,
  helperText,
  inputProps = {},
  isLoading,
  label,
  menuClasses = '',
  name,
  onChange,
  options,
  // required = false,
  // size,
  // variant = 'filled',
  ...props
}) => {
  const [field, meta] = useField(name);

  const hasError = Boolean(meta.error);
  const isTouched = Boolean(meta.touched);

  const optionValues = useMemo(
    () => options?.map((opt) => opt.id).join('-'),
    [options],
  );

  const updatedField = {
    ...field,
    ...(onChange && { onChange }),
  };

  const id = `select-${label}`;

  let helperOrErrorText = helperText;

  if (isTouched && hasError) {
    helperOrErrorText = meta.error;
  }

  return (
    <StyledFormControl
      className={clsx(
        'customSelectForm',
        menuClasses,
      )}
      fullWidth
      variant="filled"
    >
      <InputLabel
        className="label"
        htmlFor={id}
        id={field.name}
      >
        {label}
      </InputLabel>

      <Select
        IconComponent={isLoading ? LoadingComponent : undefined}
        MenuProps={{ disablePortal: true }}
        disabled={isLoading}
        error={error || (isTouched && hasError)}
        id="custom-tfaa-select"
        inputProps={{
          'aria-label': label,
          classes: { root: 'input' },
          id,
          name,
          ...inputProps,
        }}
        key={optionValues} // this is necessary to get formik to grab value when options are async
        labelId={field.name}
        native={!inputProps?.readOnly}
        type="text"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...updatedField}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {options?.length
          && options.map(({ id: optionId, label: optionLabel }) => (
            <option
              key={optionId}
              value={optionId}
            >
              {optionLabel}
            </option>
          ))}
      </Select>

      {helperOrErrorText && (
        <FormHelperText
          className="helperText"
          error={error || (isTouched && hasError)}
        >
          {helperOrErrorText}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default CustomSelect;
