import { Button, FormHelperText, Grid, Skeleton, Stack } from '@mui/material';
import * as Yup from 'yup';
import { useState } from 'react';
import SmartForm from '../../components/organisms/form/SmartForm';
import InputTime from '../../components/molecules/dateTime/InputTime';
import SmartFormArray from '../../components/organisms/form/SmartFormArray';
import SimpleCheckBox from '../../components/molecules/toggles/SimpleCheckBox';
import InputDate from '../../components/molecules/dateTime/InputDate';
import SliderStepsInput from '../../components/molecules/sliders/SliderSteps';

interface IFormSchedule {
  withoutInterval?: boolean;
  onSubmit?: (data: any) => void;
  appointment?: any;
  isLoading: boolean;
}

export default function ScheduleBatchForm({
  onSubmit,
  withoutInterval,
  appointment = { hours: [{}] },
  isLoading,
}: IFormSchedule) {
  const [errors, setErrors] = useState<any>();

  const scheduleSchema: Yup.AnyObjectSchema = Yup.object({
    startDate: Yup.date()
      .required('Campo obrigatório')
      .typeError('Data inválida'),
    endDate: Yup.date()
      .required('Campo obrigatório')
      .typeError('Data inválida'),
    hours: Yup.array()
      .of(
        Yup.object({
          startTime: Yup.date()
            .required('Campo obrigatório')
            .typeError('Hora inválida'),
          endTime: Yup.date()
            .required('Campo obrigatório')
            .typeError('Hora inválida'),
        }).required('É obrigatório selecionar os horários'),
      )
      .required('É obrigatório selecionar os horários'),
  });

  function submitForm(success: any, error: any) {
    const daysWeek = convertCheckboxToArray(success);

    const newError = error;
    if (!daysWeek.length) {
      newError['weekDays'] = 'Selecione um dia';
      [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ].forEach((day) => (newError[day] = 'X'));
    }
    setErrors(newError);
    if (onSubmit && success) {
      const { endDate, startDate, interval, hours } = success;
      onSubmit({ endDate, startDate, interval, daysWeek, hours });
    }
  }

  function convertCheckboxToArray(data: any) {
    const weekDays: Array<string> = [];
    for (const key in data) {
      const item = data[key as keyof typeof data];
      if (typeof item === 'boolean' && item) {
        weekDays.push(key);
      }
    }
    return weekDays;
  }

  return (
    <>
      <SmartForm onSubmit={submitForm} validationSchema={scheduleSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            Dias da semana
          </Grid>
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
            {errors?.weekDays && (
              <FormHelperText error={true}>{errors.weekDays}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            Datas
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <InputDate
                name="startDate"
                label="Incial"
                error={errors}
                defaultDate={appointment?.startDate}
                minDate={new Date()}
              />{' '}
              <InputDate
                name="endDate"
                label="Final"
                error={errors}
                defaultDate={appointment?.endDate}
                minDate={new Date()}
              />
            </Stack>
          </Grid>
          {!withoutInterval && (
            <Grid item xs={3}>
              <SliderStepsInput
                name="interval"
                label="Tempo de cada consulta em minutos"
                defaultValue={30}
                step={10}
                min={30}
                max={120}
                valueLabelDisplay="on"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <SmartFormArray
              name="hours"
              moveble={false}
              label="Turnos dos atendimentos"
              direction="row"
              defaultValues={appointment?.hours}
            >
              <InputTime
                name="startTime"
                label="Horário incial da sequência"
                error={errors}
              />
              <InputTime
                name="endTime"
                label="Horário final da sequência"
                error={errors}
              />
            </SmartFormArray>
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Button type="submit">Confirmar</Button>
            )}
          </Grid>
        </Grid>
      </SmartForm>
    </>
  );
}
