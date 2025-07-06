import { Box, Button, Grid, Stack } from '@mui/material';
import { object, string, AnyObjectSchema, array } from 'yup';
import { useState } from 'react';
import SmartForm from '../../components/organisms/form/SmartForm';
import { BasicTimePicker } from '../../components/molecules/dateTime/timePicker';

import SmartFormArray from '../../components/organisms/form/SmartFormArray';
import SimpleCheckBox from '../../components/molecules/toggles/SimpleCheckBox';
import InputDate from '../../components/molecules/dateTime/InputDate';
import SliderSteps from '../../components/molecules/sliders/SliderSteps';

export default function FormSchedule() {
  const [errors, setErrors] = useState<any>();

  const userSchema: AnyObjectSchema = object({
    times: array().of(
      object({
        startTime: string().required('Campo obrigatório'),
        endTime: string().required('Campo obrigatório'),
      }),
    ),
  });

  function submitForm(success: any, error: any) {
    console.log(success);
    if (error) setErrors(error);
  }

  return (
    <SmartForm onSubmit={submitForm} validationSchema={userSchema}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SimpleCheckBox name="sunday" label="Domingo" error={errors} />
          <SimpleCheckBox name="monday" label="Segunda" error={errors} />
          <SimpleCheckBox name="tuesday" label="Terça" error={errors} />
          <SimpleCheckBox name="wednesday" label="Quarta" error={errors} />
          <SimpleCheckBox name="thursday" label="Quinta" error={errors} />
          <SimpleCheckBox name="friday" label="Sexta" error={errors} />
          <SimpleCheckBox name="saturday" label="Sábado" error={errors} />
        </Grid>
        <Grid item xs={12}>
          <InputDate name="startDate" label="Data incial" error={errors} />
        </Grid>
        <Grid item xs={12}>
          <InputDate name="endDate" label="Data final" error={errors} />
        </Grid>
        <Grid item xs={2}>
          <SliderSteps
            name="interval"
            label="Tempo de cada consulta"
            defaultValue={30}
            step={30}
            min={30}
            max={120}
          />
        </Grid>
        <Grid item xs={12}>
          <SmartFormArray name="times" moveble={false}>
            <BasicTimePicker
              name="startTime"
              label="Horário incial das squencia"
              error={errors}
            />
            <BasicTimePicker
              name="endTime"
              label="Horário final das squencia"
              error={errors}
            />
          </SmartFormArray>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit">confirmar</Button>
        </Grid>
      </Grid>
    </SmartForm>
  );
}
