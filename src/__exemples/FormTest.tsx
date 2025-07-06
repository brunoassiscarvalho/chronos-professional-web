import * as React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { object, string, AnyObjectSchema, array } from 'yup';
import { useState } from 'react';
import SmartForm from '../components/organisms/form/SmartForm';
import { BasicTimePicker } from '../components/molecules/dateTime/timePicker';
import { AutocompleteComboBox } from '../components/molecules/selects/AutocompleteComboBox';
import InputText from '../components/molecules/inputs/InputText';
import SmartFormArray from '../components/organisms/form/SmartFormArray';

const arrayItem = {
  teste: [
    { field1: 'sdfasdfsdf', field2: 'sdfasdfsdf' },
    { field1: '4444444', field2: '5555' },
    { field1: 'AAAAA', field2: 'PPPPPP' },
  ],
};

export default function FormTest() {
  const [errors, setErrors] = useState<any>();

  const userSchema: AnyObjectSchema = object({
    name: string().required('Campo obrigatório'),
    startDate: string().required('Campo obrigatório'),
    movie: string().required('Campo obrigatório'),
    teste: array().of(
      object({ field1: string().required('Campo obrigatório') }),
    ),
  });

  function submitForm(success: any, error: any) {
    console.log(success);
    if (error) setErrors(error);
  }

  return (
    <SmartForm onSubmit={submitForm} validationSchema={userSchema}>
      <Stack>
        <InputText
          name="name"
          label="Nome"
          error={errors}
          validations={'teste'}
        />
        <BasicTimePicker name="startDate" label="Data incial" error={errors} />
        <Box>
          <BasicTimePicker name="endDate" label="Data final" error={errors} />
          <Box>
            <AutocompleteComboBox name="movie" label="Filmes" error={errors} />
          </Box>
          <SmartFormArray defaultValues={arrayItem.teste} name="teste">
            <InputText name="field1" label="Nome" error={errors} />
            <InputText name="field2" label="Nome" error={errors} />
            <BasicTimePicker
              name="startDate"
              label="Data incial"
              error={errors}
            />
          </SmartFormArray>
        </Box>
        <Button type="submit">confirmar</Button>
      </Stack>
    </SmartForm>
  );
}
