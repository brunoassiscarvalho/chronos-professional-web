import { Button, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AppointmentService from './AppointmentService';

interface IAppointmentCancel {
  service?: AppointmentService;
}

export default function AppointmentCancel({
  service = new AppointmentService(),
}: IAppointmentCancel) {
  const { appointment } = useOutletContext<any>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState<boolean>(false);

  function cancelAppointment() {
    setIsloading(true);
    service
      .cancelAppointment(appointment)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setIsloading(false));
  }

  return (
    <Stack spacing={3}>
      <Typography>
        <b>Deseja cancelar o agendamento?</b>
      </Typography>
      {!isLoading && (
        <Stack direction="row" spacing={3}>
          <Button onClick={cancelAppointment}>Sim</Button>
          <Button onClick={() => navigate(-1)}>Não</Button>
        </Stack>
      )}
    </Stack>
  );
}
