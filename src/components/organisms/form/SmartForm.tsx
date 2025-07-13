import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ReactNode } from 'react';

interface ISmartForm {
  onSubmit: (success: any, error?: any, action?: string) => void;
  children: ReactNode;
  validationSchema?: any;
}

export default function SmartForm({
  onSubmit,
  children,
  validationSchema,
}: ISmartForm) {
  function submitForm(form: any) {
    form.preventDefault();

    const formData = Array.from(form.target).reduce<any>(
      (accFormData: any, formItem: any) => {
        const { name, value, validations } = formItem;
        const [arrayName, indexArrayItem, nameArrayField] = name.split('-');
        if (arrayName && indexArrayItem && nameArrayField) {
          if (!accFormData[arrayName]) {
            accFormData[arrayName] = [];
          }
          if (!accFormData[arrayName][indexArrayItem]) {
            accFormData[arrayName][indexArrayItem] = {
              [nameArrayField]: valueStringToBoolean(value),
            };
          }
          accFormData[arrayName][indexArrayItem][nameArrayField] =
            valueStringToBoolean(value);
        } else if (name && value)
          accFormData[name] = valueStringToBoolean(value);

        return accFormData;
      },
      {},
    );

    try {
      if (validationSchema)
        validationSchema.validateSync(formData, { abortEarly: false });
      onSubmit(formData, null, form?.nativeEvent?.submitter?.name);
    } catch (err: any) {
      const newError = err?.inner?.reduce((accError: any, error: any) => {
        if (error.path.includes('].')) {
          accError[error.path.split('[').join('-').split('].').join('-')] =
            error.message;
        } else {
          accError[error.path] = error.message;
        }

        return accError;
      }, {});
      onSubmit(null, newError, form?.nativeEvent?.submitter?.name);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box
        component="form"
        onSubmit={submitForm}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Box sx={{ width: '100%' }}>{children}</Box>
      </Box>
    </LocalizationProvider>
  );
}

function valueStringToBoolean(value: any): any {
  if (value === 'false') return false;
  else if (value === 'true') return true;
  else return value;
}
