import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';
import { getToken } from '../utils/Api';
import { urlApi } from '../utils/Constants';
import HttpException from './HttpException';

axios.defaults.baseURL = urlApi;
axios.defaults.timeout = Number(process.env.TIMEOUT) || 10000;

export default class Service {
  public async requestBasic(method: Method, url: string, data?: any) {
    const headers: any = {};
    return this.executeRequest(url, this.objectRequest(method, data, headers));
  }

  public async sendRequest(
    method: Method,
    url: string,
    params?: any,
  ): Promise<any> {
    if (params?.password && params?.email) {
      const { email, password, ...rest } = params;
      return this.requestAuthentication(method, url, email, password, rest);
    } else if (getToken()) {
      return this.requestSecure(method, url, params);
    } else {
      return this.requestBasic(method, url, params);
    }
  }
  private objectRequest(
    method: Method,
    data: any,
    headers: AxiosRequestHeaders,
  ): AxiosRequestConfig {
    const values: AxiosRequestConfig = {
      method: method,
      headers,
    };
    if (method.toUpperCase() === 'GET')
      return { ...values, ...(!!data && { params: data }) };
    return { ...values, ...(!!data && { data: data }) };
  }
  private async requestSecure(method: Method, url: string, data?: any) {
    return this.requestServer(method, url, data, 'Bearer');
  }

  private async requestAuthentication(
    method: Method,
    url: string,
    email: string,
    password: string,
    data: any,
  ) {
    const XFactor = window.btoa(`${email}:${password}`);
    const token = !!getToken() && `Bearer ${getToken()}`;
    const headers: any = {
      'x-factor': `Basic ${XFactor}`,
      ...(token && { Authorization: token }),
    };
    return this.executeRequest(url, this.objectRequest(method, data, headers));
  }
  private async requestServer(
    method: Method,
    url: string,
    data?: any,
    tokenType = 'Bearer',
  ) {
    const headers: any = {
      Authorization: `${tokenType} ${getToken()}`,
    };
    return this.executeRequest(url, this.objectRequest(method, data, headers));
  }

  private async executeRequest(
    url: string,
    data: AxiosRequestConfig,
  ): Promise<any> {
    try {
      const resp = await axios(url, data);
      return resp.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.clear();
        if (
          window.location.pathname !== '/' &&
          window.location.pathname !== '/login'
        )
          window.location.assign(window.location.origin);

        throw new HttpException('Não autorizado!', 'UNAUTHORIZED', error);
      } else if (error.response?.status === 404) {
        throw new HttpException('Serviço não localizado', 'NOT_FOUND', error);
      } else if (error?.response?.data?.message) {
        const { message, internalCode, info } = error.response.data;
        throw new HttpException(message, internalCode, info);
      } else if (error?.message) {
        throw new HttpException(
          error.code === 'ERR_NETWORK'
            ? 'Sem conexão'
            : 'Erro ao executar a operação',
          error.code,
          error,
        );
      }

      throw new HttpException('Erro ao executar', 'GENERIC_EXCEPTION', error);
    }
  }
}
