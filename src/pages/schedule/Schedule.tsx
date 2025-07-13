import { Button, Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IAppointment } from '../../interfaces/Appointment';
import { useSnackbar } from 'notistack';
import HttpException from '../../services/HttpException';
import FullCalendar from '../../components/molecules/FullCalendar';
import ScheduleService from './ScheduleService';
import DialogModal from '../../components/organisms/DialogModal';
import { useNavigate, useParams } from 'react-router-dom';
import AppointmentDisplay from '../../components/molecules/AppointmentDisplay';
import { getUser } from '../../utils/Api';
import ProfessionalDisplay from '../../components/molecules/ProfessionalDisplay';
import { IProfessional } from '../../interfaces/Professional';

interface ISchedule {
  service?: ScheduleService;
}

export default function Schedule({
  service = new ScheduleService(),
}: ISchedule) {
  const user = getUser();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const { professionalId } = useParams<any>();

  const [appointments, setAppointments] = useState<IAppointment[]>();
  const [event, setEvent] = useState<any>();
  const [professional, setProfessional] = useState<IProfessional>();

  useEffect(() => {
    if (professionalId) getProfessional();
    getProfessionalSchedules();
  }, []);

  function getProfessional() {
    if (professionalId)
      service
        .getProfessional(professionalId)
        .then((res: IProfessional) => {
          setProfessional(res);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        });
  }

  function getProfessionalSchedules() {
    const query = professionalId ? { professional: professionalId } : undefined;
    service
      .getNextSchedule(query)
      .then((res: IAppointment[]) => {
        setAppointments(res);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  }

  function onSelectEvent({ end, start, extendedProps }: any) {
    setEvent({ end, start, extendedProps });
  }

  return (
    <Content title="Agenda" isLoading={isLoading} loadingListSize={9}>
      <Stack
        spacing={3}
        width="100%"
        justifyContent="space-between"
        paddingBottom={3}
      >
        {professional && <ProfessionalDisplay {...professional} />}
        {user.position !== 'concierge' && (
          <Box display="flex" justifyContent="space-between">
            <Stack direction="row" spacing={3} width="100%">
              <Button onClick={() => navigate('/main/incluir-horarios')}>
                Liberar horários
              </Button>
              <Button onClick={() => navigate('/main/appointment-new')}>
                Consulta Avulsa
              </Button>
            </Stack>
            <Button onClick={() => navigate('/main/excluir-horarios')}>
              Excluir horários
            </Button>
          </Box>
        )}
      </Stack>
      <FullCalendar
        onSelectEvent={onSelectEvent}
        events={appointments}
        selectable
      />

      <DialogModal
        title={
          event?.extendedProps?.patient
            ? 'Horário agendado'
            : 'Horário disponível'
        }
        open={!!event}
        onClose={() => {
          setEvent(undefined);
        }}
        actions={
          event?.extendedProps?.patient ? (
            <>
              <Button
                onClick={() =>
                  navigate(
                    `/main/tele-atendimento/${event?.extendedProps?._id}`,
                  )
                }
              >
                Iniciar consulta
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    `/main/appointment/${event?.extendedProps?._id}/cancel`,
                  )
                }
              >
                Cancelar agendamento
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() =>
                  navigate(
                    `/main/appointment/${event?.extendedProps?._id}/book`,
                  )
                }
              >
                Realizar agendamento
              </Button>
            </>
          )
        }
      >
        {event && (
          <>
            <AppointmentDisplay appointment={event.extendedProps} />
          </>
        )}
      </DialogModal>
    </Content>
  );
}
