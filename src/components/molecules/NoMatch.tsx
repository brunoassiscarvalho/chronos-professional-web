import React from 'react';
import { Box, Typography } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';

export default function NoMatch() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" margin={5}>
      <HighlightOff color="secondary" fontSize="large" />
      <Typography variant="h5" color="secondary">
        Pagina não encontrada
      </Typography>
    </Box>
  );
}
