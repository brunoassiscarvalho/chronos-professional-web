import { PaperStatus } from '../enums/EnumPaperStatus';
import { IBasicPatient, IBasicProfessional } from './Appointment';

export interface IPaper {
  patient?: IBasicPatient;
  professional?: IBasicProfessional;
  title?: string;
  text?: string;
  status?: PaperStatus;
  createdAt?: Date;
  endDate?: Date;
}
