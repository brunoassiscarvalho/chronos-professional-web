import { AnamneseStatus } from '../enums/EnumAnamneseStatus';
import { IAppointment, IBasicPatient, IBasicProfessional } from './Appointment';

export interface IAnamnese {
  _id: string;
  appointment: IAppointment['_id'];
  patient: IBasicPatient;
  professional: IBasicProfessional;
  evolution: string;
  conduct: string;
  status: AnamneseStatus;
  createdAt: Date;
}
