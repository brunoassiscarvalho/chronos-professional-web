import { FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface ISimpleCheckBox extends IFormItem {
  defaultChecked?: boolean;
}

export default function SimpleCheckBox({
  defaultChecked,
  name,
  label,
  error,
}: ISimpleCheckBox) {
  const errorMessage = error && error[name];
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      name={name}
      value={checked}
      control={
        <Checkbox
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={handleChange}
          sx={{ color: errorMessage && 'error.light' }}
        />
      }
      label={label}
    />
  );
}
