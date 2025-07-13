import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import AppointmentDisplay from '../../components/molecules/AppointmentDisplay';
import Content from '../../components/organisms/Content';
import { IAppointment } from '../../interfaces/Appointment';
import HttpException from '../../services/HttpException';
import AppointmentService from './AppointmentService';
interface IAppointmentBook {
  service?: AppointmentService;
}

export default function AppointmentDetail({
  service = new AppointmentService(),
}: IAppointmentBook) {
  const { enqueueSnackbar } = useSnackbar();
  const { patientId, appointmentId } = useParams();
  const [appointment, setAppointment] = useState<IAppointment>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (appointmentId)
      service
        .getAppointment(appointmentId)
        .then((res: any) => {
          setAppointment(res);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [patientId, appointmentId]);

  return appointment ? (
    <Content title="Consulta avulsa">
      <Stack spacing={3}>
        <AppointmentDisplay appointment={appointment} />
        <Outlet context={{ appointment, setAppointment }} />
      </Stack>
    </Content>
  ) : (
    <>Não encontrado</>
  );
}
