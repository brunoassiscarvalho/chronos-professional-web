import { Symptom, SymptomLevel } from '../../interfaces/Symptom';
import Service from '../../services/Service';

const baseUrl = '/symptom';

export default class SymptomService extends Service {
  async getSymptoms(): Promise<Symptom[]> {
    return this.sendRequest('GET', baseUrl);
  }

  async getSymptom(symptomId: string): Promise<Symptom> {
    return this.sendRequest('GET', `${baseUrl}/${symptomId}`);
  }

  async createSymptom(params: Symptom) {
    return this.sendRequest('POST', baseUrl, params);
  }

  async createSymptomLevel(symptomId: string, params: SymptomLevel) {
    return this.sendRequest('POST', `${baseUrl}/${symptomId}/level`, params);
  }

  async updateSymptomLevel(symptomId: string, params: SymptomLevel) {
    return this.sendRequest('PUT', `${baseUrl}/${symptomId}/level`, params);
  }
}
