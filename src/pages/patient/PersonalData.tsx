import { Grid } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import PatientDataDisplay from '../../components/organisms/PatientDataDisplay';
import { IPatient } from '../../interfaces/Patient';

export default function PersonalData() {
  const patient: IPatient = useOutletContext<IPatient>();
  return <PatientDataDisplay {...patient} />;
}
