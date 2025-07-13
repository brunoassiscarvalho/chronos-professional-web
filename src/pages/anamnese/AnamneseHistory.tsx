import { Grid, Skeleton, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import AnamneseDisplay from '../../components/molecules/AnamneseDisplay';
import { IAnamnese } from '../../interfaces/Anamnese';
import { IPatient } from '../../interfaces/Patient';
import HttpException from '../../services/HttpException';
import AnamneseService from './AnamneseService';

interface IAnamneseEvolution {
  service?: AnamneseService;
}

export default function AnamneseHistory({
  service = new AnamneseService(),
}: IAnamneseEvolution) {
  const { enqueueSnackbar } = useSnackbar();

  const patient: IPatient = useOutletContext<IPatient>();
  const { patientId = patient._id } = useParams<string>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [anamneses, setAnamneses] = useState<IAnamnese[]>();

  useEffect(() => {
    if (patientId) getAnamneses(patientId);
    else {
      setIsloading(false);
    }
  }, [patientId]);

  const getAnamneses = (patient: IPatient['_id']) => {
    service
      .getAnamneses({ patient, status: 'completed' })
      .then((res: IAnamnese[]) => {
        setAnamneses(res);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <>
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
        anamneses?.map((anamnese: IAnamnese) => (
          <Stack key={anamnese._id} spacing={3}>
            <AnamneseDisplay {...anamnese} />
          </Stack>
        ))
      )}
    </>
  );
}
