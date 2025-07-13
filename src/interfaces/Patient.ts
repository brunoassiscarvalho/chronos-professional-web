export interface IPatientBase {
  _id: any;
  name: string;
  email: string;
  birthDate: Date;
  gender: string;
  image?: string;
  phone?: string;
  zipCode?: string;
  role: string;
  status?: number;
  createdAt: Date;
}

export interface IPatientComplement {
  cancerType?: string;
  cancerStage?: string;
  religion?: string;
  maritalStatus?: string;
  occupation?: string;
  treatmentSite?: string;
  allergy?: string;
  ocologistName?: string;
}

export interface IPatient extends IPatientBase, IPatientComplement {}

export interface IPatientBasic {
  urlImage?: string;
  name: string;
  email: string;
}

export interface IPatientLogged extends IPatientBasic {
  token: string;
}

export interface IPatientSecurity {
  email: string;
  password: string;
}

export interface IPatientRegister extends IPatientBasic, IPatientSecurity {
  cep: number;
  phone: number;
}

export type IPatientBasicData = Pick<IPatientBase, '_id' | 'name'>;
