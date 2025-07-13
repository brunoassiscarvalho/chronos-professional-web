import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';
import { ReactComponent as Alert } from '../../assets/alert.svg';

interface INoMatch {
  message?: string;
}

export default function NoMatch({ message }: INoMatch) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={5}
      height="100%"
    >
      {/* <HighlightOff color="secondary" fontSize="large" /> */}
      <Stack justifyContent="center" alignItems="center" spacing={5}>
        <Alert width={200} color="secondary" />
        <Typography variant="h5" color="secondary">
          {message || 'Pagina não encontrada'}
        </Typography>
      </Stack>
    </Box>
  );
}
