import { FunctionComponent, ReactNode, SVGProps } from 'react';
import { Roles } from '../utils/TypeEnums';
import { routerConfig } from './RouterConfig';
import { IProfessionalLogged } from '../interfaces/Professional';
import { getUser } from '../utils/Api';

export interface IMenuItem {
  key: string;
  title: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  subMenus?: IMenuItem[];
}

export type ProfileRoutesObject = {
  [s: string]: RouteTypeObject;
};
type RouteTypeObject = Omit<RouteType, 'subRoutes'> & {
  subRoutes?: ProfileRoutesObject;
};

interface RouteType {
  profiles?: Array<Roles>;
  element: ReactNode;
  menu?: IMenuItem;
  subRoutes?: ProfileRoutes[];
}

export interface ProfileRoutes extends RouteType {
  path: string;
}

export const generateRoutes = (
  user: IProfessionalLogged,
  routesList: ProfileRoutesObject,
): ProfileRoutes[] => {
  return Object.entries<RouteTypeObject>(routesList).reduce<ProfileRoutes[]>(
    (listMenu: ProfileRoutes[], [path, value]: [string, RouteTypeObject]) => {
      if (!value.profiles || value.profiles.includes(user?.role as Roles)) {
        if (value.subRoutes) {
          listMenu.push({
            ...value,
            path,
            subRoutes: generateRoutes(user, value.subRoutes),
          });
        } else {
          listMenu.push({ ...value, path, subRoutes: undefined });
        }
      }
      return listMenu;
    },
    [],
  );
};

export const generateMenu = (
  user: IProfessionalLogged,
  routesList: ProfileRoutesObject,
): Array<IMenuItem> | undefined => {
  return generateRoutes(user, routesList).reduce<Array<IMenuItem> | undefined>(
    (listMenu: Array<IMenuItem> | undefined, item: ProfileRoutes) => {
      if (item.menu) {
        // if (item.subRoutes) {
        //   const subMenus = this.generateMenu(user, item.subRoutes);
        //   if (subMenus) listMenu?.push({ ...item.menu, subMenus });
        // }
        if (!listMenu) listMenu = new Array<IMenuItem>(item.menu);
        else listMenu.push(item.menu);
      }
      return listMenu;
    },
    undefined,
  );
};
