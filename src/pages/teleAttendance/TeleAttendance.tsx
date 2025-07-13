import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Timer from '../../components/molecules/Timer';
import Content from '../../components/organisms/Content';
import { IAppointment } from '../../interfaces/Appointment';
import HttpException from '../../services/HttpException';
import { urlVideo } from '../../utils/Constants';
import AppointmentAdvisor from '../appointment/AppointmentAdvisor';
import PatientDetail from './PatientDetail';
import TeleAttendanceService from './TeleAttendanceService';

interface IAppointmentToken extends IAppointment {
  token: string;
}

const TeleAttendance = ({ service = new TeleAttendanceService() }: any) => {
  const { appointmentId } = useParams<any>();

  const [appointment, setAppointment] = useState<IAppointmentToken>();
  const [error, setError] = useState<HttpException>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    service
      .getAttendance(appointmentId)
      .then((res: any) => {
        setAppointment(res);
      })
      .catch((err: HttpException) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [appointmentId]);

  return (
    <Content title="Tele Atendimento" isLoading={isLoading}>
      {appointment ? (
        <Grid container>
          <Grid item lg={6} md={12} xs={12}>
            <Box
              zIndex={888}
              sx={{
                bgcolor: {
                  lg: 'transparent',
                  md: 'background.default',
                  sm: 'background.default',
                  xs: 'background.default',
                },
              }}
              position={{ xs: 'fixed', sm: 'fixed', md: 'fixed', lg: 'sticky' }}
              top={{ xs: 115, sm: 115, md: 115 }}
              width={{ xs: '97%', sm: '85%', md: '85%', lg: '95%' }}
              height={{ lg: '70vh', md: '40vh', sm: '40vh', xs: '40vh' }}
              p={1}
            >
              <Box
                component="iframe"
                src={`${urlVideo}/room/${appointment.token}`}
                width="100%"
                height="100%"
                border="none"
                allow="camera;microphone;display-capture"
              ></Box>
              <Divider sx={{ display: { lg: 'none', xl: 'none' } }} />

              <Timer endTime={appointment.end} />
            </Box>
          </Grid>
          <Grid item lg={6} md={12} xs={12}>
            <Box paddingTop={{ lg: 0, md: '40vh', sm: '45vh', xs: '45vh' }}>
              <PatientDetail patientIdProp={appointment?.patient?._id} />
            </Box>
          </Grid>
        </Grid>
      ) : (
        error && <TeleAttendanceFeedbacks internalCode={error?.internalCode} />
      )}
    </Content>
  );
};

function TeleAttendanceFeedbacks(props: any) {
  const { internalCode, appointment } = props;
  switch (internalCode) {
    case 'CHECK_APPOINTMENT_VIDEO_ANTECIPATION':
      return (
        <Stack spacing={3}>
          <Typography variant="h4"> Você chegou cedo!</Typography>
          <Typography variant="h6">
            {' '}
            Sua consulta sera liberada somente 15 minutos antes do tempo
            previsto
          </Typography>

          <AppointmentAdvisor />
        </Stack>
      );
    case 'CHECK_APPOINTMENT_VIDEO_LATE':
      return <>Sua consulta não esta mais disponível</>;
    default:
      return <>Ocorreu algum problema ao abrir sala de consulta </>;
  }
}

export default TeleAttendance;
