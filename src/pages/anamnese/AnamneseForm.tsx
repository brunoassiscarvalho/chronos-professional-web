import { Box, Divider, Grid, Skeleton, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import InputText from '../../components/molecules/inputs/InputText';
import SmartForm from '../../components/organisms/form/SmartForm';
import { IAnamnese } from '../../interfaces/Anamnese';
import { IPatient } from '../../interfaces/Patient';
import HttpException from '../../services/HttpException';
import AnamneseService from './AnamneseService';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { IAppointment } from '../../interfaces/Appointment';

interface IAnamneseEvolution {
  service?: AnamneseService;
  context?: any;
}

export default function AnamneseForm({
  service = new AnamneseService(),
}: IAnamneseEvolution) {
  const { enqueueSnackbar } = useSnackbar();

  const { appointmentId } = useParams();

  const patient: IPatient = useOutletContext<IPatient>();
  const { patientId = patient._id, anamneseId } = useParams<string>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [anamnese, setAnamnese] = useState<IAnamnese | null>(null);

  useEffect(() => {
    if (patientId && appointmentId) getAnamnese(appointmentId);
    else {
      setIsloading(false);
    }
  }, [patientId, appointmentId]);

  const onSubmitForm = (data: any, error: any, action?: string) => {
    if (patient) {
      setIsloading(true);
      if (action === 'finish') {
        data.status = 'completed';
        data.endDate = new Date();
      }
      const newAnamnese = { ...data, patient, appointment: appointmentId };
      if (anamnese) {
        updateAnamnese({ ...anamnese, ...data });
      } else {
        createAnamnese(newAnamnese);
      }
    }
  };

  const getAnamnese = (appointmentId: IAppointment['_id']) => {
    service
      .getAnamneseByAppointment(appointmentId)
      .then((res: IAnamnese) => {
        setAnamnese(res);
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const createAnamnese = (data: IAnamnese) => {
    service
      .createAnamnese(data)
      .then((res) => {
        setAnamnese(res);
        enqueueSnackbar('Inclusão realizada!', { variant: 'success' });
      })
      .catch((err: HttpException) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const updateAnamnese = (data: IAnamnese) => {
    service
      .updateAnamnese(data)
      .then((res) => {
        setAnamnese(res);
        enqueueSnackbar('Inclusão realizada!', { variant: 'success' });
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
        <Grid container spacing={3}>
          <Grid item xs={12} key="form-anamnese">
            <SmartForm onSubmit={onSubmitForm}>
              <Stack spacing={3}>
                <InputText
                  readOnly={anamnese?.status === 'completed'}
                  shrink={true}
                  rows={5}
                  label="Evolução"
                  name="evolution"
                  fullWidth
                  defaultValue={anamnese?.evolution}
                />
                <InputText
                  readOnly={anamnese?.status === 'completed'}
                  shrink={true}
                  rows={5}
                  label="Conduta"
                  name="conduct"
                  fullWidth
                  defaultValue={anamnese?.conduct}
                />
                <Divider />
                {anamnese?.status !== 'completed' ? (
                  <Box display="flex" justifyContent="space-between">
                    <LoadingButton
                      type="submit"
                      sx={{ minWidth: 100 }}
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      Salvar
                    </LoadingButton>

                    <LoadingButton
                      name="finish"
                      color="secondary"
                      type="submit"
                      sx={{ minWidth: 100 }}
                      loadingPosition="start"
                      variant="contained"
                    >
                      Concluir
                    </LoadingButton>
                  </Box>
                ) : (
                  anamnese && (
                    <Box>
                      {` Encerrado em ${new Date(
                        anamnese.createdAt,
                      ).toLocaleString('pt-BR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}, por ${anamnese.professional.name}
                      `}
                    </Box>
                  )
                )}
                <Divider />
              </Stack>
            </SmartForm>
          </Grid>
        </Grid>
      )}
    </>
  );
}
