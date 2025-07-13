import Service from '../../services/Service';

import { IProfessionalRegister } from '../../interfaces/Professional';

export default class ProfessionalService extends Service {
  private baseUrl = '/professional';

  async createProfessional(params: IProfessionalRegister) {
    return this.sendRequest('POST', this.baseUrl, params);
  }

  async getProfessionals() {
    return this.sendRequest('GET', this.baseUrl);
  }

  async getProfessional(pofessionalId: string) {
    return this.sendRequest('GET', `${this.baseUrl}/${pofessionalId}`);
  }

  async updateProfessional(params: IProfessionalRegister) {
    return this.sendRequest('PUT', this.baseUrl, params);
  }

  async sendVerificationMail(params: IProfessionalRegister) {
    return this.sendRequest(
      'POST',
      this.baseUrl + '/verification-mail',
      params,
    );
  }

  async sendResetPassEmail(email: string) {
    return this.sendRequest('POST', this.baseUrl + '/admin/pass', { email });
  }

  async resendMailValidation(email: string) {
    return this.sendRequest('POST', this.baseUrl + '/admin/mail', {
      email,
    });
  }
}
