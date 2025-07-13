import { Avatar, Grid, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { literalPosition } from '../../utils/TypeEnums';

function professionalPropsAreEqual(prevProps: any, nextProps: any) {
  return prevProps.email === nextProps.email;
}

function ProfessionalDisplay({ name, email, phone, position }: any) {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Avatar variant="rounded" sx={{ width: 100, height: 100 }} />
      </Grid>
      <Grid item>
        <Stack>
          <Typography>{name}</Typography>
          <Typography>{literalPosition(position)}</Typography>
          {email && <Typography>{email}</Typography>}
          {phone && <Typography>{phone}</Typography>}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default memo(ProfessionalDisplay, professionalPropsAreEqual);
