import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { ReactComponent as Schedule } from '../../assets/schedule.svg';
import { ReactComponent as Chat } from '../../assets/chat.svg';
import { ReactComponent as Tele } from '../../assets/tele.svg';
import { ReactComponent as Home } from '../../assets/home.svg';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { Inbox, Mail } from '@mui/icons-material';

interface IMenuItem {
  key: string;
  title: string;
  Icon?: any;
}

const items: IMenuItem[] = [
  { key: '', title: 'Início', Icon: Home },
  { key: 'agenda', title: 'Agenda', Icon: Schedule },
  { key: 'consulta', title: 'Consulta', Icon: Tele },
  { key: 'chat', title: 'Chat', Icon: Chat },
];

export default memo(function Menu() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        overflow: 'auto',
        paddingTop: 15,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
      }}
    >
      <Divider />
      <List>
        {items.map(({ key, title, Icon }) => (
          <ListItem key={key} disablePadding>
            <ListItemButton onClick={() => navigate(key)}>
              <ListItemIcon>
                <Icon width={25} height={25}></Icon>
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
});
