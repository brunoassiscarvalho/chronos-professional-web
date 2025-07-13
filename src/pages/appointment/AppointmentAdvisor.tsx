import { Stack, Typography } from '@mui/material';

export default function AppointmentAdvisor() {
  return (
    <Stack spacing={3}>
      <Typography variant="h5" gutterBottom>
        Três passos para um melhor atendimento:
      </Typography>

      <Typography variant="h6">1 - Busque um lugar silencioso</Typography>
      <Typography variant="h6">2 - Com uma boa iluminação</Typography>
      <Typography variant="h6">
        3 - Entre na plataforma com pelo menos 5 minutos de antecedência
      </Typography>
    </Stack>
  );
}
