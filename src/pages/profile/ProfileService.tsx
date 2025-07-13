import Service from '../../services/Service';

export default class ProfileService extends Service {
  private baseUrl = '/professional';

  async sendMailChangePass() {
    return this.sendRequest('POST', this.baseUrl + '/pass');
  }

  async getProfessional() {
    return this.sendRequest('GET', this.baseUrl);
  }
}
