import { IAppointment } from '../../interfaces/Appointment';
import { IProfessional } from '../../interfaces/User';
import Service from '../../services/Service';

export default class ScheduleService extends Service {
  async getProfessionals(): Promise<IProfessional[]> {
    const res = await this.sendRequest('GET', '/professional');
    return res;
  }

  async saveSchedule(params: IAppointment) {
    const res = await this.sendRequest('PATCH', '/appointment/patient', params);
    return res;
  }
  async getNextSchedule() {
    const res = await this.sendRequest('GET', '/appointment?last=10');    
    return res;
  }
}
