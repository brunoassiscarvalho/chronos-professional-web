import { Stack, Typography, Box, Divider } from '@mui/material';
import { IAppointment } from '../../interfaces/Appointment';
import AppointmentDate from './AppointmentDate';
import PatientDisplay from './PatientDisplay';

interface IAppointmentDisplay {
  appointment: IAppointment;
}

export default function AppointmentDisplay({
  appointment,
}: IAppointmentDisplay) {
  return (
    <Stack spacing={3}>
      {appointment.patient && (
        <>
          <Typography color="text.secondary">Paciente</Typography>
          <Box>
            <PatientDisplay {...(appointment.patient as any)} />
          </Box>
          <Divider />
        </>
      )}
      <AppointmentDate appointment={appointment} />
    </Stack>
  );
}
