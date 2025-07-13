import { Divider, Stack, TextField, Typography } from '@mui/material';
import { IAnamnese } from '../../interfaces/Anamnese';
import { literalPosition } from '../../utils/TypeEnums';

export default function AnamneseDisplay({
  createdAt,
  evolution,
  conduct,
  professional,
}: IAnamnese) {
  const formatedDate = new Date(createdAt).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return (
    <Stack spacing={3}>
      <Divider sx={{ paddingBottom: 1, paddingTop: 10 }}>
        <Typography>{`${formatedDate} - ${
          professional.name
        } - ${literalPosition(professional.position)}`}</Typography>
      </Divider>

      <TextField
        fullWidth
        label="Evolução"
        defaultValue={evolution}
        multiline
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        fullWidth
        label="Conduta"
        defaultValue={conduct}
        multiline
        InputProps={{
          readOnly: true,
        }}
      />
    </Stack>
  );
}
