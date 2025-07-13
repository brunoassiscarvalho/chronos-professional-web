import { Box, Paper, Theme, useMediaQuery } from '@mui/material';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../../components/organisms/Navbar';
import { getUser } from '../../utils/Api';
import Home from '../home/Home';

import DrawerHeader from '../../components/atoms/DrawerHeader';
import NoMatch from '../../components/molecules/NoMatch';
import MenuTab from '../../components/organisms/MenuTab';
import SimpleBottomNavigation from '../../components/organisms/SimpleBottomNavigation';
import { IProfessionalLogged } from '../../interfaces/Professional';
import { generateRoutes, ProfileRoutes } from '../../router/RolesService';
import { routerConfig } from '../../router/RouterConfig';

interface IUserRoutes {
  user: IProfessionalLogged;
}

const generateUserRoute = (routes: ProfileRoutes[]) => {
  return routes?.map((route: ProfileRoutes) => {
    if (route.subRoutes)
      return (
        <Route {...route} key={route.path}>
          {generateUserRoute(route.subRoutes)}
        </Route>
      );
    return <Route {...route} key={route.path} />;
  });
};

const UserRoutes = ({ user }: IUserRoutes) => {
  return (
    <Routes>
      <Route index element={<Home />} />
      {!!user && generateUserRoute(generateRoutes(user, routerConfig))}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default function Main() {
  const navigate = useNavigate();
  const user = getUser();
  if (!user) navigate('/login');

  const isVerySmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return user ? (
    <Box sx={{ display: 'flex' }}>
      <Navbar user={user} />
      {isVerySmall ? (
        <SimpleBottomNavigation user={user} />
      ) : (
        <MenuTab user={user} />
      )}
      <Box component="main" sx={{ flexGrow: 1, p: { sm: 3, xs: 1 } }}>
        <DrawerHeader />
        <Box
          sx={{
            padding: { md: 4 },
            paddingTop: { xs: 10 },
            paddingBottom: { xs: 10, sm: 1 },
            paddingLeft: { xs: 0, sm: 15, md: 17, lg: 20 },
          }}
        >
          <UserRoutes user={user} />
          <Outlet />
        </Box>
      </Box>
    </Box>
  ) : (
    <NoMatch />
  );
}
