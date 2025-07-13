import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { logoUrl } from '../../utils/Constants';
import { Box } from '@mui/material';
import { memo } from 'react';
import { IProfessionalLogged } from '../../interfaces/Professional';
import AccountMenu from './AccountMenu';

interface INavBar {
  user: IProfessionalLogged;
}

function userEmailPropsAreEqual(prevUser: INavBar, nextUser: INavBar) {
  return prevUser.user.userId === nextUser.user.userId;
}

function NavBar({ user }: INavBar) {
  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      position="fixed"
      elevation={1}
      color="inherit"
    >
      <Toolbar>
        <Box component="img" src={logoUrl} height={40} margin={2} />
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Box>
            <AccountMenu user={user} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default memo(NavBar, userEmailPropsAreEqual);
