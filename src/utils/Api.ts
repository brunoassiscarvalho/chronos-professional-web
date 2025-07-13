import {
  IProfessionalLogged,
  IProfessionalSession,
} from '../interfaces/Professional';
import { localUserStorage } from './Constants';

const getSession: any = () => {
  try {
    const session = sessionStorage.getItem(localUserStorage);
    if (session) {
      const { token, ...user } = JSON.parse(session);

      return { user, token };
    }
  } catch (error) {
    return null;
  }
};

export const setSession: (user: IProfessionalSession) => void = (
  user: IProfessionalSession,
) => {
  sessionStorage.setItem(localUserStorage, JSON.stringify(user));
};

export const getToken: () => string | null = () => {
  return getSession()?.token;
};

export const getUser: () => IProfessionalLogged = () => {
  return getSession()?.user;
};
