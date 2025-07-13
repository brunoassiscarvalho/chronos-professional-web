import { useState } from 'react';
import { Box, Tab, Tabs, Theme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IProfessionalLogged } from '../../interfaces/Professional';
import { routerConfig } from '../../router/RouterConfig';
import { generateMenu } from '../../router/RolesService';

interface IMenuItem {
  key: string;
  title: string;
  Icon: any;
}

interface IMenuTab {
  user: IProfessionalLogged;
}

export default function MenuTab({ user }: IMenuTab) {
  const [value, setValue] = useState<any>();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(newValue);
  };
  const isSmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('lg'),
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'fixed',
        display: 'flex',
        height: '100vh',
        bgcolor: 'background.paper',
        zIndex: 110,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          paddingTop: 15,
          borderColor: 'divider',
          width: { lg: 150, md: 120 },
        }}
      >
        {generateMenu(user, routerConfig)?.map(
          ({ key, title, Icon }: IMenuItem) => (
            <Tab
              key={key}
              icon={
                <Icon width={isSmall ? 30 : 40} height={isSmall ? 30 : 40} />
              }
              label={title}
              value={key}
              sx={{ paddingBottom: 2, fontSize: { lg: 12, md: 10, sm: 10 } }}
            />
          ),
        )}
      </Tabs>
    </Box>
  );
}
