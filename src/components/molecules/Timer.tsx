import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';

interface ITimer {
  endTime: Date;
  showTimer?: boolean;
}

export default function Timer({ endTime, showTimer }: ITimer) {
  const [days, hours, minutes, seconds] = useCountdown(endTime);

  return minutes <= 5 ? (
    <>
      <Alert severity="warning">
        {minutes < 0
          ? 'Tempo esgotado'
          : `Faltam ${minutes + 1} min pra acabar`}
      </Alert>
    </>
  ) : (
    <>{showTimer ? JSON.stringify({ days, hours, minutes, seconds }) : <></>}</>
  );
}

const useCountdown = (targetDate: Date) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};
