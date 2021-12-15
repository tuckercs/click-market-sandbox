import moment from "moment";

export const maybePluralize = (count: number, noun: string, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

export const getTimeAgo = (time: string) => {
  const from = moment(time);
  const now = moment(new Date());
  const days = now.diff(from, 'days', true);
  if (days > 1) return `${maybePluralize(Math.trunc(days), 'day')} ago`;
  const hours = now.diff(from, 'hours', true);
  if (hours > 1) return `${maybePluralize(Math.trunc(hours), 'hour')} ago`;
  const minutes = now.diff(from, 'minutes', true);
  if (minutes > 1) return `${maybePluralize(Math.trunc(minutes), 'minute')} ago`;
  const seconds = now.diff(from, 'seconds', true);
  if (seconds > 1) return `${maybePluralize(Math.trunc(seconds), 'second')} ago`;
}
