import Service from '../../services/Service';

import { IPaper } from '../../interfaces/Paper';
import { IAppointment } from '../../interfaces/Appointment';

export default class DocumentService extends Service {
  private baseUrl = '/paper';

  async createDocument(params: IPaper) {
    const res = await this.sendRequest('POST', this.baseUrl, params);
    return res;
  }

  async updateDocument(params: IPaper) {
    const res = await this.sendRequest('PUT', this.baseUrl, params);
    return res;
  }

  async getDocuments(query?: any) {
    return this.sendRequest('GET', this.baseUrl, query);
  }

  async getDocumentByAppointment(appointmentId: IAppointment['_id']) {
    return this.sendRequest(
      'GET',
      this.baseUrl + '/appointment/' + appointmentId,
    );
  }
}
