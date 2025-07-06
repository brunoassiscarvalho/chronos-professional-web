import { TextField } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputDate extends IFormItem {
  defaultDate?: Date;
}

export default function InputDate({ defaultDate, label, name }: IInputDate) {
  const [value, setValue] = useState<Date>(defaultDate || new Date());
  return (
    <DatePicker
      renderInput={(props) => <TextField {...props} name={name} />}
      label={label}
      value={value}
      onChange={(newValue: Date | null) => {
        if (newValue) setValue(newValue);
      }}
    />
  );
}
