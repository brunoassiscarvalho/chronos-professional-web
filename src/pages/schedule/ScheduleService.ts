import { IAppointment } from '../../interfaces/Appointment';
import { IProfessional } from '../../interfaces/Professional';
import { IUser } from '../../interfaces/User';
import Service from '../../services/Service';

export default class ScheduleService extends Service {
  async getProfessionals(): Promise<IUser[]> {
    return this.sendRequest('GET', '/professional');
  }

  async getProfessional(professionalID: string): Promise<IProfessional> {
    return this.sendRequest('GET', `/professional/${professionalID}`);
  }

  async saveSchedule(params: IAppointment) {
    return this.sendRequest('PATCH', '/appointment/patient', params);
  }

  async includeScheduleBatch(params: IAppointment) {
    return this.sendRequest('POST', '/appointment/batch', params);
  }

  async deleteScheduleBatch(params: IAppointment) {
    return this.sendRequest('DELETE', '/appointment/batch', params);
  }

  async getNextSchedule(params?: any) {
    return this.sendRequest('GET', '/appointment', params);
  }
}
