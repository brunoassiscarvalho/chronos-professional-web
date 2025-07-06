import axios from 'axios';

export default class ExternalService {
  async getStates() {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    const res = await axios.get(url);
    return res.data;
  }
  async getCities(state: string) {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`;
    const res = await axios.get(url);
    return res.data;
  }

  async getAddressByCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`;
    const res = await axios.get(url);
    return res.data;
  }
}
