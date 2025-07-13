import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Content from '../../components/organisms/Content';
import { IAppointment } from '../../interfaces/Appointment';
import ScheduleBatchForm from './ScheduleBatchForm';
import ScheduleService from './ScheduleService';

interface IScheduleBatchInclude {
  service?: ScheduleService;
}

export default function ScheduleBatchInclude({
  service = new ScheduleService(),
}: IScheduleBatchInclude) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<IAppointment>();

  function submitSchedule(event: any) {
    setAppointment(event);
    setIsloading(true);
    service
      .includeScheduleBatch(event)
      .then(() => {
        enqueueSnackbar('Horarios Incluidos!', { variant: 'success' });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setIsloading(false));
  }

  return (
    <Content
      title="Inlcuir horários na agenda"
      // isLoading={isLoading}
      loadingListSize={9}
    >
      <ScheduleBatchForm
        onSubmit={submitSchedule}
        appointment={appointment}
        isLoading={isLoading}
      />
    </Content>
  );
}
