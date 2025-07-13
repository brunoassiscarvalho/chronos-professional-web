import { TextField, useMediaQuery, useTheme } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { IFormItem } from '../../organisms/form/FormItem';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  type: string;
}

const inputTypes: any = {
  phone: '(00)00000-0000',
  cep: '00.000-000',
  cpf: '000.000.000-00',
};

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref: any) {
    const { onChange, type, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={inputTypes[type]}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

interface IInputText extends IFormItem {
  placeholder?: string;
  type?: string;
  validations?: any;
  format?: string;
  defaultValue?: any;
  autoComplete?: string;
  autoFocus?: boolean;
  rows?: number;
  fullWidth?: boolean;
  readOnly?: boolean;
  shrink?: boolean;
}

export default function InputText({
  label,
  error,
  name,
  placeholder,
  type,
  defaultValue,
  rows,
  fullWidth,
  readOnly,
  format,
  shrink,
}: IInputText) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  const errorMessage = error && error[name];

  const [value, setValue] = useState<any>(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      InputProps={{
        readOnly: readOnly,
        ...(format && { inputComponent: TextMaskCustom as any }),
      }}
      InputLabelProps={{ shrink: shrink }}
      value={value}
      onChange={handleChange}
      size={matches ? 'medium' : 'small'}
      name={name}
      fullWidth={fullWidth}
      multiline={!!rows}
      rows={rows}
      defaultValue={defaultValue}
      error={errorMessage}
      helperText={errorMessage}
      label={label}
      type={format || type}
      placeholder={placeholder}
    />
  );
}
