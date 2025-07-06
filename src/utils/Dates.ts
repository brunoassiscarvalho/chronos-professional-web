import moment from 'moment';
import { ptBR , enUS} from 'date-fns/locale';
import addHours from 'date-fns/addHours';
import startOfHour from 'date-fns/startOfHour';

export function converteDateUtcToFormat(format: string, date: Date) {
  moment.locale('pt-br');
  return moment.utc(date).format(format);
}

export function formatDateUTC(date: Date): string {
  return converteDateUtcToFormat('DD/MM/YYYY', date);
}

export function formatHoursUTC(date: Date): string {
  return converteDateUtcToFormat('HH:mm', date);
}

export const locales = {
  'en-US': enUS,
  'pt-BR': ptBR,
};
export const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);




