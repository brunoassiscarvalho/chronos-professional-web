import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function External() {
  return (
    <Box
      sx={{
        padding: 5,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '100%',
      }}
    >
      <Paper sx={{ width: 500, padding: 3, minHeight: '70vh' }}>
        <Outlet />
      </Paper>
    </Box>
  );
}
