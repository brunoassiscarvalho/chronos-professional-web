import { ChevronRight } from '@mui/icons-material';
import { Box, ButtonBase } from '@mui/material';
import { useState } from 'react';
import { IPatient } from '../../../interfaces/Patient';
import PatientsList from '../../../pages/patient/PatientsList';
import PatientsListView from '../../../pages/patient/PatientsListView';
import DialogModal from '../../organisms/DialogModal';
import ListItem from '../lists/ListItem';
import PatientDisplay from '../PatientDisplay';

interface IPatientSelect {
  patient?: IPatient;
  onClick?: (patient: IPatient) => void;
}

export default function PatientSelect({ onClick, patient }: IPatientSelect) {
  const [selectedPatient, setSelectedPatient] = useState<IPatient | undefined>(
    patient,
  );
  const [open, setOpen] = useState<boolean>();

  const onSelectPatient = (selection: IPatient) => {
    setSelectedPatient(selection);
    setOpen(false);
    if (onClick) onClick(selection);
  };

  return (
    <>
      <ButtonBase onClick={() => setOpen(true)}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          padding={2}
          border={1}
          borderColor="divider"
          borderRadius={2}
        >
          {selectedPatient ? (
            <PatientDisplay {...selectedPatient} />
          ) : (
            <ListItem primaryText="selecione um paciente" />
          )}
          <ChevronRight />
        </Box>
      </ButtonBase>
      <DialogModal
        title="Seu Agendamento"
        open={open}
        onClose={() => setOpen(false)}
      >
        <PatientsListView onClick={onSelectPatient} />
      </DialogModal>
    </>
  );
}
