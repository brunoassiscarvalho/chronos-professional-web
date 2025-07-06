import { Skeleton, Grid, Button, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IAppointment, IAppointmentBasic } from '../../interfaces/Appointment';
import { useSnackbar } from 'notistack';
import HttpException from '../../services/HttpException';
import FullCalendar from '../../components/molecules/FullCalendar';
import ScheduleService from './ScheduleService';
import DialogModal from '../../components/organisms/DialogModal';
import { formatDateUTC, formatHoursUTC } from '../../utils/Dates';
import { getUser } from '../../utils/Api';
import { IProfessionalBasicData } from '../../interfaces/Professional';


interface ISchedule {
  service?: ScheduleService;
}

export default function Schedule({
  service = new ScheduleService(),
}: ISchedule) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [appointments, setAppointments] = useState<IAppointment[]>();
  const [open, setOpen] = useState<any>();
  const [event, setEvent] = useState<any>();

  useEffect(() => {
    service
      .getNextSchedule()
      .then((res: IAppointment[]) => {
        setAppointments(res);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  function onSelectEvent({ end, start }: any) {
    // console.log({professional: getUser(),end,start});
    // const newAppointment:IAppointment ={
    //   end,start,
    //   professional:
    // }
  }

  function saveEvent(event: any) {
    // console.log({ event });
    // service
    //   .saveAppointment(event)
    //   .then((res) => {
    //     setOpen(false);
    //   })
    //   .catch((err) => {
    //     enqueueSnackbar(err.message, { variant: 'error' });
    //   });
  }

  function handleDateSelectTime({ end, start }: any) {
    console.log({ professional: getUser(), end, start });
    setOpen(true);
    const professional: IProfessionalBasicData = getUser();
    const newAppointment: IAppointmentBasic = {
      title: `Consulta - ${professional.position}`,
      end,
      start,
      professional,
    };
    setEvent(newAppointment);
  }

  function scheduleHandler(data:any) {
    console.log('new schedule', data);
  }

  return (
    <Content title="Nova Agenda">
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
        <FullCalendar
          onSelectEvent={onSelectEvent}
          events={appointments}
          onSelectTime={handleDateSelectTime}
          selectable
        />
      )}
      <DialogModal
        title="Confirmação de agendamento"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          event && (
            <>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancelar
              </Button>
              <Button onClick={() => saveEvent(event)}>Confirmar</Button>
            </>
          )
        }
      >
        {event && (
          <>
            <Typography>{event?.professional?.name}</Typography>
            <Typography>{formatDateUTC(event?.start || new Date())}</Typography>
            <Typography>
              {formatHoursUTC(event?.start || new Date())}
            </Typography>
            <Typography>{formatHoursUTC(event?.end || new Date())}</Typography>
            <Box>
             
            </Box>
          </>
        )}
      </DialogModal>
    </Content>
  );
}
