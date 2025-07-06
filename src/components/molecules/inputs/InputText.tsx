import { TextField } from '@mui/material';
import { IFormItem } from '../../organisms/form/FormItem';

interface IInputText extends IFormItem {
  placeholder?: string;
  type?: string;
  validations?: any;
  format?: string;
  defaultValue?: any;
  autoComplete?: string;
  autoFocus?: boolean;
}

export default function InputText({
  label,
  error,
  name,
  placeholder,
  type,
  defaultValue,
  validations,
  autoFocus,
}: IInputText) {
  console.log('InputText', error);
  const errorMessage = error && error[name];
  console.log('InputTextMessage', { name, errorMessage });
  return (
    <TextField
      defaultValue={defaultValue}
      error={errorMessage}
      name={name}
      helperText={errorMessage}
      label={label}
      type={type}
      placeholder={placeholder}
    />
  );
}
