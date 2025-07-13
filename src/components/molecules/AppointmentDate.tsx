import { CalendarMonth, AccessTime } from '@mui/icons-material';
import { Typography, Stack } from '@mui/material';
import { IAppointment } from '../../interfaces/Appointment';

interface IAppointmentDate {
  appointment: IAppointment;
}

export default function AppointmentDate({ appointment }: IAppointmentDate) {
  return (
    <>
      <Typography color="text.secondary">Data</Typography>
      <Stack direction="row" spacing={3}>
        <CalendarMonth />
        <Typography>
          {new Date(appointment?.start)?.toLocaleString('pt-BR', {
            dateStyle: 'long',
          })}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={3}>
        <AccessTime />
        <Typography>
          {`${new Date(appointment?.start)?.toLocaleString('pt-BR', {
            timeStyle: 'short',
          })} - ${new Date(appointment?.end)?.toLocaleString('pt-BR', {
            timeStyle: 'short',
          })}`}
        </Typography>
      </Stack>
    </>
  );
}
