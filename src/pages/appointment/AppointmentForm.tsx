import { Button, Stack } from '@mui/material';
import { startOfYesterday } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import InputDate from '../../components/molecules/dateTime/InputDate';
import InputTime from '../../components/molecules/dateTime/InputTime';
import PatientSelect from '../../components/molecules/selects/PatientSelect';
import Content from '../../components/organisms/Content';
import SmartForm from '../../components/organisms/form/SmartForm';
import { IPatient } from '../../interfaces/Patient';
import { concatDateAndTime } from '../../utils/Dates';
import AppointmentService, { ICreateAppointment } from './AppointmentService';

interface IAppointmentBook {
  service?: AppointmentService;
}

const appointmentSchema: Yup.AnyObjectSchema = Yup.object({
  date: Yup.date()
    .required('Campo obrigatório')
    .min(
      startOfYesterday(),
      'Não é possível realizar agendametos com data anterior a hoje',
    )
    .typeError('Data inválida'),
  startTime: Yup.date().required('Campo obrigatório'),
  endTime: Yup.date().required('Campo obrigatório'),
});

export default function AppointmentForm({
  service = new AppointmentService(),
}: IAppointmentBook) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<any>();

  const [isLoading, setIsloading] = useState<boolean>(false);
  const [patient, setPatient] = useState<IPatient>();

  function saveEvent(appointment: ICreateAppointment) {
    setIsloading(true);

    service
      .createAppointment(appointment)
      .then(() => {
        enqueueSnackbar('Agendamento realizado!', { variant: 'success' });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setIsloading(false));
  }

  function submitForm(success: any, error: any) {
    if (success) {
      const start = concatDateAndTime(success.date, success.startTime);
      const end = concatDateAndTime(success.date, success.endTime);
      saveEvent({ end, start, patient });
    }
    setErrors(error);
  }

  return (
    <Content title="Agendamento Avulso" maxWidth={500}>
      <SmartForm onSubmit={submitForm} validationSchema={appointmentSchema}>
        <Stack spacing={2}>
          <PatientSelect onClick={setPatient} />
          <InputDate
            name="date"
            label="Data"
            error={errors}
            minDate={new Date()}
          />
          <InputTime name="startTime" label="Horário incial" error={errors} />
          <InputTime name="endTime" label="Horário final" error={errors} />
          {!isLoading && <Button type="submit">Realizar agendamento</Button>}
        </Stack>
      </SmartForm>
    </Content>
  );
}
