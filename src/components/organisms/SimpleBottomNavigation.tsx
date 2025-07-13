import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { useNavigate } from 'react-router-dom';
import { AppBar } from '@mui/material';
import { generateMenu } from '../../router/RolesService';
import { IProfessionalLogged } from '../../interfaces/Professional';
import { routerConfig } from '../../router/RouterConfig';

interface IMenuItem {
  key: string;
  title: string;
  Icon: any;
}

interface ISimpleBottomNavigation {
  user: IProfessionalLogged;
}

export default function SimpleBottomNavigation({
  user,
}: ISimpleBottomNavigation) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState();

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(newValue);
          }}
        >
          {generateMenu(user, routerConfig)?.map(
            ({ key, title, Icon }: IMenuItem) => (
              <BottomNavigationAction
                value={key}
                key={key}
                label={title}
                icon={<Icon width={30} height={30} />}
              />
            ),
          )}
        </BottomNavigation>
      </Box>
    </AppBar>
  );
}
