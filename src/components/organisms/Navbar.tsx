import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { logoUrl } from '../../utils/Constants';
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { memo } from 'react';
import { formatDateUTC, formatHoursUTC } from '../../utils/Dates';
import { IProfessionalBasic } from '../../interfaces/Professional';

interface IUser {
  email: string;
  name: string;
  urlImage: string;
}

interface INavBar {
  user: IProfessionalBasic;
}

export default memo(function NavBar({ user }: INavBar) {
  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      position="fixed"
      elevation={3}
      color="inherit"
    >
      <Toolbar>
        <Box component="img" src={logoUrl} height={40} margin={2} />
        <Box sx={{ flexGrow: 1 }} />

        {user && (
          <Box>
            <ListItem alignItems="flex-start">
              <ListItemText primary={user.name} secondary={user.position} />
              <ListItemAvatar>
                <Avatar
                  sx={{ marginLeft: 2 }}
                  alt={user.name || user.email}
                  // src={user.urlImage}
                />
              </ListItemAvatar>
            </ListItem>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}, userEmailPropsAreEqual);

function userEmailPropsAreEqual(prevUser: any, nextUser: any) {
  return (
    prevUser.user.email === nextUser.user.email &&
    prevUser.user.name === nextUser.user.name
  );
}
