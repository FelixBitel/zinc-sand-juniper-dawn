import {
  differenceInCalendarDays,
  differenceInMonths,
  differenceInYears,
  format,
  isToday,
  isYesterday,
  startOfDay,
} from "date-fns";
import { ru } from "date-fns/locale";
import type { Cadence, Eaten, MealSlot, Mood } from "./types";

export function plural(n: number, one: string, few: string, many: string) {
  const abs = Math.abs(Math.trunc(n)) % 100;
  const n1 = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (n1 > 1 && n1 < 5) return few;
  if (n1 === 1) return one;
  return many;
}

export function ageLabel(birthday: string, now = new Date()) {
  const b = new Date(birthday);
  const years = differenceInYears(now, b);
  const months = differenceInMonths(now, b) % 12;
  const y = `${years} ${plural(years, "год", "года", "лет")}`;
  if (months === 0) return y;
  return `${y} ${months} ${plural(months, "месяц", "месяца", "месяцев")}`;
}

export function greeting(now = new Date()) {
  const h = now.getHours();
  if (h < 5) return "Доброй ночи";
  if (h < 12) return "Доброе утро";
  if (h < 18) return "Добрый день";
  return "Добрый вечер";
}

export function formatDay(ts: number) {
  const d = new Date(ts);
  if (isToday(d)) return "Сегодня";
  if (isYesterday(d)) return "Вчера";
  return format(d, "d MMMM", { locale: ru });
}

export function formatDayShort(ts: number) {
  return format(new Date(ts), "d MMM", { locale: ru });
}

export function formatTime(ts: number) {
  return format(new Date(ts), "HH:mm");
}

export function formatDateLong(ts: number) {
  return format(new Date(ts), "d MMMM yyyy", { locale: ru });
}

export function weekdayShort(ts: number) {
  return format(new Date(ts), "EEEEEE", { locale: ru });
}

export function relativeDue(ts: number, now = Date.now()) {
  const days = differenceInCalendarDays(new Date(ts), new Date(now));
  if (days < 0) {
    const n = Math.abs(days);
    return `просрочено ${n} ${plural(n, "день", "дня", "дней")}`;
  }
  if (days === 0) return "сегодня";
  if (days === 1) return "завтра";
  return `через ${days} ${plural(days, "день", "дня", "дней")}`;
}

export function minutesLabel(n: number) {
  return `${n} ${plural(n, "минута", "минуты", "минут")}`;
}

export function moodLabel(mood: Mood) {
  switch (mood) {
    case "great":
      return "Отлично";
    case "good":
      return "Хорошо";
    case "ok":
      return "Нормально";
    case "low":
      return "Вялый";
    case "poor":
      return "Плохо";
  }
}

export function slotLabel(slot: MealSlot) {
  switch (slot) {
    case "breakfast":
      return "Завтрак";
    case "dinner":
      return "Ужин";
    case "snack":
      return "Перекус";
  }
}

export function eatenLabel(eaten: Eaten) {
  switch (eaten) {
    case "all":
      return "всё";
    case "most":
      return "почти всё";
    case "half":
      return "половина";
    case "little":
      return "мало";
  }
}

export function cadenceLabel(cadence: Cadence) {
  switch (cadence) {
    case "daily":
      return "каждый день";
    case "monthly":
      return "раз в месяц";
    case "quarterly":
      return "раз в 3 месяца";
  }
}

export function startDay(ts = Date.now()) {
  return startOfDay(new Date(ts)).getTime();
}

export function kgLabel(kg: number) {
  return `${kg.toFixed(1).replace(".", ",")} кг`;
}

export function kmLabel(km: number) {
  return `${km.toFixed(1).replace(".", ",")} км`;
}
