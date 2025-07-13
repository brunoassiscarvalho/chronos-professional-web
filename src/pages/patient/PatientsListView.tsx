import { Search } from '@mui/icons-material';
import { Grid, Skeleton, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import ListItem from '../../components/molecules/lists/ListItem';
import { IPatient } from '../../interfaces/Patient';
import PatientService from './PatientService';

interface IPatientsList {
  service?: PatientService;
  onClick?: (patient: IPatient) => void;
}

export default function PatientsListView({
  service = new PatientService(),
  onClick,
}: IPatientsList) {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsloading] = useState<boolean>(true);
  const [patients, setPatients] = useState<IPatient[]>();

  useEffect(() => {
    service
      .getPatients()
      .then((res) => {
        setPatients(res);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  const handlerClick = (patient: IPatient) => {
    if (onClick) onClick(patient);
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          name="search"
          placeholder="Nome ou CPF"
          InputProps={{
            startAdornment: <Search />,
          }}
        >
          {' '}
        </TextField>
      </Grid>
      {patients?.map((patient) => (
        <Grid key={patient._id} item xs={12}>
          <ListItem
            onClick={() => handlerClick(patient)}
            primaryText={patient.name}
            avatar={{ alt: patient.name, src: '/static/images/avatar/1.jpg' }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
