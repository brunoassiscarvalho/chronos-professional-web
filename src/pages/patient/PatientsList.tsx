import { Search } from '@mui/icons-material';
import { Grid, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '../../components/molecules/lists/ListItem';
import Content from '../../components/organisms/Content';
import { IPatient } from '../../interfaces/Patient';
import PatientService from './PatientService';
import PatientsListView from './PatientsListView';

export default function PatientsList() {
  const navigate = useNavigate();

  const handlerClick = (patient: IPatient) => {
    navigate(`/main/patient/${patient._id}/anamnese`);
  };

  return (
    <Content
      title="Pacientes"
      withoutGoBack
      loadingListSize={9}
      maxWidth={1000}
    >
      <PatientsListView onClick={handlerClick} />
    </Content>
  );
}
