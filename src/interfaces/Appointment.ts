import { IProfessionalBasicData } from './Professional';

// export interface IAppointmentData {}
// export interface IAppointment<T> {
//   title: string;
//   start: Date;
//   end: Date;
//   resource: T;
// }

export interface IAppointmentBasic {
  title: string;
  start: Date;
  end: Date;
  professional: IProfessionalBasicData;
  patient?: IProfessionalBasicData;
  status?: string;
}

export interface IAppointment extends IAppointmentBasic {
  _id: string;
}
