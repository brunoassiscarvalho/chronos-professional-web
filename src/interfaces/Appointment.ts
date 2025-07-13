import { IPatient } from './Patient';
import { IProfessional } from './Professional';

export type IBasicProfessional = Pick<
  IProfessional,
  '_id' | 'name' | 'position' | 'image'
>;

export type IBasicPatient = Pick<IPatient, '_id' | 'name' | 'image'>;

export interface IAppointmentBasic {
  title?: string;
  start: Date;
  end: Date;
  professional: IBasicProfessional;
  patient?: IBasicPatient;
  status?: string;
}

export interface IAppointment extends IAppointmentBasic {
  _id?: string;
}

export type IActionAppointment = Pick<
  IAppointmentBasic,
  'title' | 'start' | 'end'
> & { action: 'include' | 'exclude' };
