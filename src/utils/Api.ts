import { IProfessionalLogged } from '../interfaces/Professional';
import { localUserStorage } from './Constants';

const getSession: any = () => {
  const session = sessionStorage.getItem(localUserStorage);
  if (session) {
    const { token, ...user } = JSON.parse(session);

    return { user, token };
  }
};

export const setSession: any = (user: IProfessionalLogged) => {
  console.log({ setSession: localUserStorage });

  sessionStorage.setItem(localUserStorage, JSON.stringify(user));
};

export const getToken: any = () => {
  return getSession()?.token;
};

export const getUser: any = () => {
  return getSession()?.user;
};
