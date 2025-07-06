import Service from '../../services/Service';

import { IProfessionalRegister } from '../../interfaces/Professional';

export default class ProfessionalService extends Service {
  private baseUrl = '/patient';

  async createProfessional(params: IProfessionalRegister) {
    console.log({ params });
    const res = await this.sendRequest('POST', this.baseUrl, params);
    return res;
  }

  async sendVerificationMail(params: IProfessionalRegister) {
    console.log({ params });
    const res = await this.sendRequest(
      'POST',
      this.baseUrl + '/verification-mail',
      params,
    );
    return res;
  }
}
