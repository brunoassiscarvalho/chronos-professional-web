import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Content from '../../components/organisms/Content';
import ScheduleBatchForm from './ScheduleBatchForm';
import ScheduleService from './ScheduleService';

interface IScheduleBatchExclude {
  service?: ScheduleService;
}

export default function ScheduleBatchExclude({
  service = new ScheduleService(),
}: IScheduleBatchExclude) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState<boolean>(false);

  function submitSchedule(event: any) {
    setIsloading(true);
    service
      .deleteScheduleBatch(event)
      .then(() => {
        enqueueSnackbar('Horarios excluidos!', { variant: 'warning' });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setIsloading(false));
  }

  return (
    <Content title="Exlcuir horários na agenda" loadingListSize={9}>
      <ScheduleBatchForm
        onSubmit={submitSchedule}
        withoutInterval
        isLoading={isLoading}
      />
    </Content>
  );
}
