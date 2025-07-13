import Service from '../../services/Service';

import { IAnamnese } from '../../interfaces/Anamnese';
import { IAppointment } from '../../interfaces/Appointment';

export default class AnamneseService extends Service {
  private baseUrl = '/anamnese';

  async createAnamnese(params: IAnamnese) {
    const res = await this.sendRequest('POST', this.baseUrl, params);
    return res;
  }

  async updateAnamnese(params: IAnamnese) {
    const res = await this.sendRequest('PUT', this.baseUrl, params);
    return res;
  }

  async getAnamneses(query?: any) {
    return this.sendRequest('GET', this.baseUrl, query);
  }

  async getAnamneseByAppointment(appointmentId: IAppointment['_id']) {
    return this.sendRequest(
      'GET',
      this.baseUrl + '/appointment/' + appointmentId,
    );
  }
}
