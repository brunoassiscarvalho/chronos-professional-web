import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputTime extends IFormItem {
  defaultDate?: Date;
}

export default function InputTime({
  defaultDate,
  name,
  error,
  label,
}: IInputTime) {
  const [value, setValue] = useState<Date | null>(defaultDate || null);
  const errorMessage = error && error[name];
  return (
    <>
      <TimePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          if (newValue) setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={errorMessage}
            helperText={errorMessage}
          />
        )}
      />
      <input
        name={name}
        value={value?.toUTCString()}
        style={{ display: 'none' }}
      />
    </>
  );
}
