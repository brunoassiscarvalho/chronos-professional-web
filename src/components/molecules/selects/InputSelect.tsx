import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Theme,
  TextField,
} from '@mui/material';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputSelect extends IFormItem {
  options?: any;
  defaultValue?: any;
}

export default function InputSelect({
  options,
  label,
  name,
  defaultValue,
  error,
}: IInputSelect) {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const errorMessage = error && error[name];

  return (
    <FormControl fullWidth>
      <TextField
        select
        name={name}
        defaultValue={defaultValue}
        label={label}
        error={errorMessage}
        helperText={errorMessage}
      >
        {options?.map(({ value, text }: any) => (
          <MenuItem key={value} value={value}>
            {text}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
