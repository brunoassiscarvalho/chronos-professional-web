import Service from '../../services/Service';

import { IPatientRegister } from '../../interfaces/Patient';

export default class PatientService extends Service {
  private baseUrl = '/patient';

  async createPatient(params: IPatientRegister) {
    const res = await this.sendRequest('POST', this.baseUrl, params);
    return res;
  }

  async getPatients() {
    const res = await this.sendRequest('GET', this.baseUrl);
    return res;
  }

  async getPatient(patientId: string) {
    const res = await this.sendRequest('GET', `${this.baseUrl}/${patientId}`);
    return res;
  }
}
