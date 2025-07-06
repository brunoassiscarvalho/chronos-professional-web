import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import React from 'react';

export function BasicTimePicker({ name, error, label }: any) {
  const [value, setValue] = React.useState<Date | null>(null);
  const errorMessage = error && error[name];
  return (
   
    <TimePicker
      label={label}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={errorMessage}
          name={name}
          helperText={errorMessage}
        />
      )}
    />
  );
}
