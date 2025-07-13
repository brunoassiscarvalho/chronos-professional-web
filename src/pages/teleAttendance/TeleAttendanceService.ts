import { IProfessional } from '../../interfaces/Professional';
import Service from '../../services/Service';

export default class TeleAttendanceService extends Service {
  async getAttendance(appointmentId: string): Promise<IProfessional[]> {
    const res = await this.sendRequest('GET', `/video/${appointmentId}`);
    return res;
  }
}
