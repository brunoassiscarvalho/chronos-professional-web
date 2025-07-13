import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Button,
  ButtonBase,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IAppointment } from '../../interfaces/Appointment';
import { useSnackbar } from 'notistack';
import { converteDateBars, formatOnlyHours } from '../../utils/Dates';
import HttpException from '../../services/HttpException';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ScheduleService from '../schedule/ScheduleService';

interface ISchedule {
  service?: ScheduleService;
}

export default function TeleAttendanceList({
  service = new ScheduleService(),
}: ISchedule) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [appointments, setAppointments] = useState<IAppointment[]>();

  useEffect(() => {
    service
      .getNextSchedule({ patientExists: true, time: 'future' })
      .then((res: any) => {
        setAppointments(res);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <Content
      title="Agenda"
      withoutGoBack
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={500}
    >
      <Stack spacing={3}>
        <Button onClick={() => navigate('/main/agenda')} sx={{ margin: 3 }}>
          <Add /> Horários Disponíveis
        </Button>
        <List sx={{ width: '100%', maxWidth: 600 }}>
          <Divider />
          {appointments?.map((appointment: IAppointment) => (
            <>
              <ButtonBase
                sx={{ width: '100%', padding: 2 }}
                key={appointment._id}
                component={ListItem}
                onClick={() =>
                  navigate('/main/tele-atendimento/' + appointment._id)
                }
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={converteDateBars(appointment.start)}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {`${formatOnlyHours(
                          appointment.start,
                        )} - ${formatOnlyHours(appointment.end)}`}
                      </Typography>
                    </>
                  }
                />
                <ListItemText
                  primary="Teleconsulta"
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {appointment.patient?.name}
                      </Typography>
                    </>
                  }
                />
              </ButtonBase>
              <Divider />
            </>
          ))}
        </List>
      </Stack>
    </Content>
  );
}
