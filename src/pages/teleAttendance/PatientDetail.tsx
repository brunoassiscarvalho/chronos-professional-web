import { Box, Grid, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IPatient } from '../../interfaces/Patient';

import PatientDisplay from '../../components/molecules/PatientDisplay';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import HttpException from '../../services/HttpException';
import PatientService from '../patient/PatientService';

interface PatientsList {
  patientIdProp?: IPatient['_id'];
  service?: PatientService;
}

export default function PatientDetail({
  patientIdProp,
  service = new PatientService(),
}: PatientsList) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { patientId = patientIdProp } = useParams<string>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [patient, setPatient] = useState<IPatient>();
  const [value, setValue] = useState('anamnese');

  useEffect(() => {
    if (patientId)
      service
        .getPatient(patientId)
        .then((res) => {
          setPatient(res);
        })
        .catch((err: HttpException) => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => {
          setIsloading(false);
        });
    else {
      setIsloading(false);
    }
  }, [patientId]);

  useEffect(() => {
    navigate(value, { replace: true });
  }, [value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Content
      title="Paciente"
      isLoading={isLoading}
      loadingListSize={9}
      maxWidth={1000}
    >
      {patient ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PatientDisplay {...patient} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs centered value={value} onChange={handleChange}>
                <Tab label="Dados" value="data" />
                <Tab label="Anamnese" value="anamnese" />
                <Tab label="Histórico" value="history" />
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Outlet context={patient} />
          </Grid>
        </Grid>
      ) : (
        <>Erro</>
      )}
    </Content>
  );
}
