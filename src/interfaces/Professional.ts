import { Positions, Roles } from '../utils/TypeEnums';

export interface IProfessional {
  _id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  cep?: string;
  status?: number;
  role: Roles;
  position: Positions;
}

export type IProfessionalBasic = Pick<
  IProfessional,
  '_id' | 'name' | 'email' | 'position' | 'role'
>;

export interface IProfessionalSession extends IProfessionalBasic {
  token: string;
}

export interface IProfessionalLogged extends IProfessionalBasic {
  userId: string;
}

export interface IProfessionalSecurity {
  email: string;
  password: string;
}

export interface IProfessionalRegister
  extends IProfessionalBasic,
    IProfessionalSecurity {
  cep: number;
  phone: number;
}

export interface IProfessionalBasicData {
  position: any;
  _id: any;
  name: string;
}
