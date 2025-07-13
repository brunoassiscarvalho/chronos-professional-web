import { Box, Button, Grid, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Content from '../../components/organisms/Content';
import { IPatient, IPatientLogged } from '../../interfaces/Patient';
import PatientService from './PatientService';
import PatientDisplay from '../../components/molecules/PatientDisplay';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import HttpException from '../../services/HttpException';
import { getUser } from '../../utils/Api';
import { IProfessionalLogged } from '../../interfaces/Professional';

interface PatientsList {
  patientIdProp?: IPatient['_id'];
  service?: PatientService;
}

export default function Patient({
  patientIdProp,
  service = new PatientService(),
}: PatientsList) {
  const navigate = useNavigate();

  const user: IProfessionalLogged = getUser();

  const { enqueueSnackbar } = useSnackbar();
  const { patientId = patientIdProp } = useParams<string>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [patient, setPatient] = useState<IPatient>();
  const [value, setValue] = useState('data');

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
          <Grid item xs={8}>
            <PatientDisplay {...patient} />
          </Grid>
          <Grid item xs={4}>
            {/* {user.role === 'concierge' && (
              <Button
                onClick={() =>
                  navigate(
                    '/main/patient/6313740f5dd8fa31923d1075/profissional',
                  )
                }
              >
                Marcar consulta
              </Button>
            )} */}
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs centered value={value} onChange={handleChange}>
                <Tab label="Dados" value="data" />
                {user.role !== 'concierge' && (
                  <Tab label="Histórico" value="history" />
                )}
                {user.role !== 'concierge' && (
                  <Tab label="DashBoard" value="dashboard" />
                )}
                {user.role !== 'concierge' && (
                  <Tab label="Documentos" value="document" />
                )}
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
