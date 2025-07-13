import { IAppointment } from '../../interfaces/Appointment';
import Service from '../../services/Service';

export type ICreateAppointment = Pick<
  IAppointment,
  'end' | 'start' | 'patient'
>;

export default class AppointmentService extends Service {
  private baseUrl = '/appointment';

  async createAppointment(appointment: ICreateAppointment) {
    return this.sendRequest('POST', this.baseUrl, appointment);
  }

  async getAppointment(appointmentId: string) {
    return this.sendRequest('GET', `${this.baseUrl}/${appointmentId}`);
  }

  async bookAppointment(params: IAppointment) {
    const res = await this.sendRequest('PATCH', '/appointment/patient', params);
    return res;
  }

  async cancelAppointment(params: IAppointment) {
    const res = await this.sendRequest(
      'DELETE',
      '/appointment/patient',
      params,
    );
    return res;
  }
}
