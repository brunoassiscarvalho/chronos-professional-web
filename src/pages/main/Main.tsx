import { Box, Grid, Paper } from '@mui/material';

import { Outlet, useNavigate } from 'react-router-dom';
import Menu from '../../components/organisms/Menu';
import Navbar from '../../components/organisms/Navbar';
import { getUser } from '../../utils/Api';

export default function Main(): JSX.Element {
  const navigate = useNavigate();



  const user = getUser();
  if (!user) navigate('/login');

  return (
    <Grid container>
      <Grid item xs={12}>
        <Navbar user={user} />
      </Grid>
      <Grid item xs={3} md={3} sm={2} lg={2} xl={2}>
        <Menu />
      </Grid>
      <Grid item xs={9} md={9} sm={10} lg={10} xl={10}>
        <Box sx={{ paddingLeft: 10, padding: 8, paddingTop: 14 }}>
          <Paper sx={{ width: '100%', padding: 3, minHeight: '80vh' }}>
            <Outlet />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
