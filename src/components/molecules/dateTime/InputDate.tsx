import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputDate extends IFormItem {
  defaultDate?: Date;
  minDate?: Date;
}

export default function InputDate({
  defaultDate,
  label,
  name,
  minDate,
  error,
}: IInputDate) {
  const [value, setValue] = useState<Date | null>(
    defaultDate ? new Date(defaultDate) : null,
  );
  const errorMessage = error && error[name];
  return (
    <>
      <DatePicker
        renderInput={(props) => (
          <TextField
            {...props}
            error={errorMessage}
            helperText={errorMessage}
          />
        )}
        minDate={minDate}
        label={label}
        value={value}
        onChange={(newValue: Date | null) => {
          if (newValue) setValue(newValue);
        }}
      />
      <input
        name={name}
        value={value?.toUTCString()}
        style={{ display: 'none' }}
      />
    </>
  );
}
