import { differenceInDays, format } from 'date-fns';

export function timestampToDate(timestamp: Date): string {
  return format(timestamp, 'dd/MM/yyyy');
}

export function isOlderThan(timestamp: Date, days: number): boolean {
  const now = new Date();

  const daysDifference = differenceInDays(now, timestamp);

  return daysDifference > 12;
}
