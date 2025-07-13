import { ptBR, enUS } from 'date-fns/locale';
import addHours from 'date-fns/addHours';
import startOfHour from 'date-fns/startOfHour';
import { differenceInCalendarYears, format } from 'date-fns';

export function converteDateBars(date: Date) {
  return new Date(date).toLocaleString('pt-br', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

export function longDate(date: Date) {
  return new Date(date).toLocaleString('pt-br', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatOnlyHours(date: Date): string {
  return new Date(date).toLocaleString('pt-BR', {
    timeStyle: 'short',
  });
}

export const locales = {
  'en-US': enUS,
  'pt-BR': ptBR,
};
export const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);

export const ageByBirthDate = (birthDate: Date) => {
  return differenceInCalendarYears(new Date(), new Date(birthDate));
};

export function concatDateAndTime(date: Date, time: Date): Date {
  return new Date(
    `${format(new Date(date), 'MM/dd/yyyy')} ${format(new Date(time), 'H:mm')}`,
  );
}
