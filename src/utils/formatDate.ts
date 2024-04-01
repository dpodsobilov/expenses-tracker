import { format, parseISO } from "date-fns";

const russianMonthNames = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  const monthName = russianMonthNames[date.getMonth()];
  return format(date, `${date.getDate()} ${monthName} ${date.getFullYear()}`);
}
