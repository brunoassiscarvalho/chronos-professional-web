import { Box, Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PatientSelect from '../../components/molecules/selects/PatientSelect';
import { IPatient } from '../../interfaces/Patient';
import AppointmentService from './AppointmentService';
interface IAppointmentBook {
  service?: AppointmentService;
}

export default function AppointmentBook({
  service = new AppointmentService(),
}: IAppointmentBook) {
  const { appointment, setAppointment } = useOutletContext<any>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState<boolean>(false);

  const onSelectPatient = (patient: IPatient) => {
    setAppointment({ ...appointment, patient });
  };

  const removePatient = () => {
    const { patient, ...others } = appointment;
    setAppointment(others);
  };

  function saveEvent() {
    setIsloading(true);
    service
      .bookAppointment(appointment)
      .then(() => {
        enqueueSnackbar('Agendamento realizado!', { variant: 'success' });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setIsloading(false));
  }

  return (
    <Box>
      {!appointment?.patient ? (
        <PatientSelect onClick={onSelectPatient} />
      ) : (
        !isLoading && (
          <Stack direction="row" spacing={3}>
            <Button onClick={saveEvent}>Agendar</Button>
            <Button color="secondary" onClick={removePatient}>
              Alterar paciente
            </Button>
          </Stack>
        )
      )}
    </Box>
  );
}
