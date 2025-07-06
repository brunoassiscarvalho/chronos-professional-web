import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Skeleton,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IAppointment } from '../../interfaces/Appointment';
import { useSnackbar } from 'notistack';
import { formatHoursUTC, formatDateUTC } from '../../utils/Dates';
import HttpException from '../../services/HttpException';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ScheduleService from './ScheduleService';

interface ISchedule {
  service?: ScheduleService;
}

export default function Schedule({
  service = new ScheduleService(),
}: ISchedule) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [appointments, setAppointments] = useState<IAppointment[]>();

  useEffect(() => {
    service
      .getNextSchedule()
      .then((res: any) => {
        console.log('getNextSchedule', res);
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
    <Content title="Agenda" withoutGoBack>
      {isLoading ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Button onClick={() => navigate('/main/nova-agenda')}>
            <Add /> Horários Disponíveis
          </Button>
          <List sx={{ width: '100%', maxWidth: 600 }}>
            {appointments?.map((appointment: IAppointment) => (
              <Box key={appointment._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={formatDateUTC(appointment.start)}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {`${formatHoursUTC(
                            appointment.start,
                          )} - ${formatHoursUTC(appointment.end)}`}
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
                          {appointment.professional.name}
                        </Typography>
                        {` - ${appointment.professional.position}`}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Box>
            ))}
          </List>
        </>
      )}
    </Content>
  );
}
