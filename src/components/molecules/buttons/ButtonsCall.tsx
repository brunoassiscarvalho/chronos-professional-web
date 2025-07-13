import {
  CallEnd,
  Camera,
  CameraAlt,
  Mic,
  MicOff,
  PlayArrow,
} from '@mui/icons-material';
import { Box, Divider, Fab, IconButton, Stack } from '@mui/material';
import { useState } from 'react';

export default function ButtonsCall({ onLogout }: any) {
  const [mic, setMic] = useState<boolean>();
  const [cam, setCam] = useState<boolean>();

  return (
    <Box sx={{ display: 'flex', p: 1, bgcolor: '#00000036', borderRadius: 1 }}>
      <Box sx={{ flexShrink: 1 }}>
        {' '}
        <Stack direction="row" spacing={2}>
          <Fab
            color={cam ? 'primary' : 'default'}
            aria-label="edit"
            onClick={() => setCam(!cam)}
          >
            {cam ? <Camera /> : <CameraAlt />}
          </Fab>
          <Fab
            color={mic ? 'primary' : 'default'}
            aria-label="edit"
            onClick={() => setMic(!mic)}
          >
            {mic ? <Mic /> : <MicOff />}
          </Fab>
        </Stack>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffffde',
        }}
      >
        Consulta com doutor
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <Fab color="error" aria-label="edit" onClick={onLogout}>
          <CallEnd />
        </Fab>
      </Box>
    </Box>
  );
}
