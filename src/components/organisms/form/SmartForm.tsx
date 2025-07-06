import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function SmartForm({
  onSubmit,
  children,
  validationSchema,
}: any) {
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
      onSubmit(formData, null);
    } catch (err: any) {
      const newError = err.inner.reduce((accError: any, error: any) => {
        if (error.path.includes('].')) {
          accError[error.path.split('[').join('-').split('].').join('-')] =
            error.message;
        } else {
          accError[error.path] = error.message;
        }

        return accError;
      }, {});
      console.log({ newError });
      onSubmit(null, newError);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={submitForm}>{children}</form>
    </LocalizationProvider>
  );
}

function valueStringToBoolean(value: any): any {
  if (value === 'false') return false;
  else if (value === 'true') return true;
  else return value;
}
