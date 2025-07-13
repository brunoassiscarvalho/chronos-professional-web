import {
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

import { IProfessionalLogged } from '../../interfaces/Professional';
import DrawerHeader from '../atoms/DrawerHeader';
import { generateMenu, IMenuItem } from '../../router/RolesService';
import { routerConfig } from '../../router/RouterConfig';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface IMenu {
  user: IProfessionalLogged;
}

export default memo(function Menu({ user }: IMenu) {
  const navigate = useNavigate();
  const theme = useTheme();
  const open = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader />
      <Divider />
      <List sx={{ paddingTop: 5 }}>
        {generateMenu(user, routerConfig)?.map(
          ({ key, title, Icon }: IMenuItem) => (
            <ListItem key={key} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => navigate(key)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon width={25} height={25}></Icon>
                  </ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
      <Divider />
    </Drawer>
  );
});
