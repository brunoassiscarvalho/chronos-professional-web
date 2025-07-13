import { Avatar, Grid, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { IPatient } from '../../interfaces/Patient';
import { literalCancerType } from '../../utils/Common';
import { ageByBirthDate } from '../../utils/Dates';

function patientPropsAreEqual(prevProps: any, nextProps: any) {
  return prevProps.email === nextProps.email;
}

function PatientDisplay({ name, email, birthDate, cancerType }: IPatient) {
  const age = ageByBirthDate(birthDate);

  const cancerTypeText = cancerType && literalCancerType(cancerType);

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Avatar variant="rounded" sx={{ width: 100, height: 100 }} />
      </Grid>
      <Grid item>
        <Stack>
          <Typography textAlign="left">{name}</Typography>
          <Typography textAlign="left">{email}</Typography>
          {birthDate && (
            <Typography textAlign="left">{`${age} anos`}</Typography>
          )}
          {cancerType && (
            <Typography textAlign="left">{`Tipo de câncer: ${cancerTypeText}`}</Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default memo(PatientDisplay, patientPropsAreEqual);
