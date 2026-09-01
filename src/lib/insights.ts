import { differenceInCalendarDays, subDays } from "date-fns";
import { formatDay, kgLabel, minutesLabel, moodLabel, relativeDue, slotLabel, startDay } from "./format";
import type {
  EventKind,
  JournalFilter,
  TimelineItem,
  TrackerData,
} from "./types";
import { clamp } from "./utils";

export function isSameDay(a: number, b: number) {
  return startDay(a) === startDay(b);
}

export function inLastDays(ts: number, days: number, now = Date.now()) {
  return ts >= startDay(now) - (days - 1) * 86400000 && ts <= now + 60000;
}

export function todayWalks(data: TrackerData, now = Date.now()) {
  return data.walks.filter((w) => isSameDay(w.at, now));
}

export function todayMeals(data: TrackerData, now = Date.now()) {
  return data.meals.filter((m) => isSameDay(m.at, now));
}

export function todayWaterMl(data: TrackerData, now = Date.now()) {
  return data.water.filter((w) => isSameDay(w.at, now)).reduce((s, w) => s + w.ml, 0);
}

export function todayKcal(data: TrackerData, now = Date.now()) {
  return todayMeals(data, now).reduce((s, m) => s + (m.kcal ?? 0), 0);
}

export function latestWeight(data: TrackerData) {
  return [...data.weights].sort((a, b) => b.at - a.at)[0];
}

export function latestMood(data: TrackerData) {
  return [...data.moods].sort((a, b) => b.at - a.at)[0];
}

export function walkMinutesBetween(data: TrackerData, from: number, to: number) {
  return data.walks
    .filter((w) => w.at >= from && w.at <= to)
    .reduce((s, w) => s + w.minutes, 0);
}

export function computeWellness(data: TrackerData, now = Date.now()) {
  const walks7 = data.walks.filter((w) => inLastDays(w.at, 7, now));
  const walkScore = clamp(walks7.length / (data.profile.walkTargetPerDay * 7), 0, 1) * 30;

  const waterScore =
    clamp(todayWaterMl(data, now) / data.profile.waterTargetMl, 0, 1) * 15;

  const meals = todayMeals(data, now);
  const mealScore =
    ((meals.some((m) => m.slot === "breakfast") ? 1 : 0) +
      (meals.some((m) => m.slot === "dinner") ? 1 : 0)) *
    7.5;

  const weight = latestWeight(data);
  const inRange =
    weight &&
    weight.kg >= data.profile.targetMinKg &&
    weight.kg <= data.profile.targetMaxKg;
  const weightScore = inRange ? 15 : weight ? 8 : 4;

  const recentMoods = data.moods.filter((m) => inLastDays(m.at, 5, now));
  const moodMap = { great: 1, good: 0.82, ok: 0.62, low: 0.38, poor: 0.15 };
  const moodAvg =
    recentMoods.length === 0
      ? 0.7
      : recentMoods.reduce((s, m) => s + moodMap[m.mood], 0) / recentMoods.length;
  const moodScore = moodAvg * 15;

  const overdue = data.meds.filter((m) => m.nextDue < now - 12 * 3600000);
  const medScore = overdue.length === 0 ? 10 : Math.max(3, 10 - overdue.length * 4);

  const score = Math.round(
    walkScore + waterScore + mealScore + weightScore + moodScore + medScore,
  );
  return clamp(score, 12, 99);
}

export function wellnessCaption(score: number) {
  if (score >= 85) return "Стабилен";
  if (score >= 70) return "Хорошо";
  if (score >= 55) return "Внимание";
  return "Нужен уход";
}

export type Insight = { id: string; tone: "good" | "ok" | "warn"; text: string };

export function computeInsights(data: TrackerData, now = Date.now()): Insight[] {
  const out: Insight[] = [];
  const water = todayWaterMl(data, now);
  if (water < data.profile.waterTargetMl * 0.75) {
    out.push({
      id: "water",
      tone: "warn",
      text: `Воды сегодня ${water} мл из ${data.profile.waterTargetMl}. Имеет смысл долить миску перед сном.`,
    });
  } else {
    out.push({
      id: "water",
      tone: "good",
      text: `Питьевой режим в порядке: ${water} мл за сегодня.`,
    });
  }

  const walks = todayWalks(data, now);
  if (walks.length < data.profile.walkTargetPerDay) {
    out.push({
      id: "walk",
      tone: "ok",
      text: `Прогулок сегодня ${walks.length} из ${data.profile.walkTargetPerDay}. Вечерний круг ещё можно успеть.`,
    });
  }

  const weekAgoTo = startDay(now);
  const thisWeek = walkMinutesBetween(data, subDays(weekAgoTo, 6).getTime(), now);
  const lastWeek = walkMinutesBetween(
    data,
    subDays(weekAgoTo, 13).getTime(),
    subDays(weekAgoTo, 7).getTime() + 86400000 - 1,
  );
  if (lastWeek > 0) {
    const diff = thisWeek - lastWeek;
    if (diff <= -40) {
      out.push({
        id: "trend",
        tone: "warn",
        text: `За неделю прогулок на ${minutesLabel(Math.abs(diff))} меньше, чем на прошлой.`,
      });
    } else if (diff >= 30) {
      out.push({
        id: "trend",
        tone: "good",
        text: `Активность выше прошлой недели на ${minutesLabel(diff)}.`,
      });
    }
  }

  const weight = latestWeight(data);
  if (weight) {
    if (weight.kg >= data.profile.targetMinKg && weight.kg <= data.profile.targetMaxKg) {
      out.push({
        id: "weight",
        tone: "good",
        text: `Вес ${kgLabel(weight.kg)} — в целевом диапазоне для Арчи.`,
      });
    } else {
      out.push({
        id: "weight",
        tone: "warn",
        text: `Вес ${kgLabel(weight.kg)} вне целевого диапазона ${data.profile.targetMinKg}–${data.profile.targetMaxKg} кг.`,
      });
    }
  }

  const kcal = todayKcal(data, now);
  const target = data.profile.calorieTarget;
  if (kcal > 0 && kcal < target * 0.85) {
    out.push({
      id: "kcal",
      tone: "ok",
      text: `Домашние порции дают ${kcal} ккал из ${target}. В «Питании» можно подогнать к норме.`,
    });
  } else if (kcal > 0) {
    out.push({
      id: "kcal",
      tone: "good",
      text: `Рацион ${kcal} из ${target} ккал.`,
    });
  }

  const dueSoon = data.meds
    .filter((m) => differenceInCalendarDays(new Date(m.nextDue), new Date(now)) <= 7)
    .sort((a, b) => a.nextDue - b.nextDue)[0];
  if (dueSoon) {
    out.push({
      id: "med",
      tone: differenceInCalendarDays(new Date(dueSoon.nextDue), new Date(now)) <= 0 ? "warn" : "ok",
      text: `${dueSoon.name}: ${relativeDue(dueSoon.nextDue, now)}.`,
    });
  }

  return out.slice(0, 3);
}

export type ScheduleItem = {
  id: string;
  title: string;
  time: string;
  done: boolean;
  log?: "walk" | "meal" | "med";
  medId?: string;
  slot?: "breakfast" | "dinner";
};

export function todaySchedule(data: TrackerData, now = Date.now()): ScheduleItem[] {
  const walks = todayWalks(data, now);
  const meals = todayMeals(data, now);
  const morningWalk = walks.some((w) => new Date(w.at).getHours() < 12);
  const noonWalk = walks.some((w) => {
    const h = new Date(w.at).getHours();
    return h >= 12 && h < 18;
  });
  const eveningWalk = walks.some((w) => new Date(w.at).getHours() >= 18);

  const urzahol = data.meds.find((m) => m.id === "med-urzahol");
  const gepa = data.meds.find((m) => m.id === "med-gepatosan");
  const urzaholToday = data.doses.filter((d) => d.medId === urzahol?.id && isSameDay(d.at, now));
  const gepaToday = data.doses.filter((d) => d.medId === gepa?.id && isSameDay(d.at, now));
  const urzaholAm = urzaholToday.some((d) => new Date(d.at).getHours() < 15);
  const urzaholPm = urzaholToday.some((d) => new Date(d.at).getHours() >= 15);
  const gepaDone = gepaToday.length > 0;

  return [
    { id: "walk-am", title: "Утренняя прогулка", time: "08:00", done: morningWalk, log: "walk" },
    {
      id: "urzahol-am",
      title: "Урзахол",
      time: "09:00",
      done: urzaholAm,
      log: "med",
      medId: urzahol?.id,
    },
    {
      id: "breakfast",
      title: "Завтрак",
      time: "09:30",
      done: meals.some((m) => m.slot === "breakfast"),
      log: "meal",
      slot: "breakfast",
    },
    { id: "walk-md", title: "Дневная прогулка", time: "14:00", done: noonWalk, log: "walk" },
    {
      id: "gepa",
      title: "Гепатосан",
      time: "18:00",
      done: gepaDone,
      log: "med",
      medId: gepa?.id,
    },
    {
      id: "dinner",
      title: "Ужин",
      time: "19:00",
      done: meals.some((m) => m.slot === "dinner"),
      log: "meal",
      slot: "dinner",
    },
    { id: "walk-pm", title: "Вечерний круг", time: "21:00", done: eveningWalk, log: "walk" },
    {
      id: "urzahol-pm",
      title: "Урзахол",
      time: "21:00",
      done: urzaholPm,
      log: "med",
      medId: urzahol?.id,
    },
  ];
}

const FILTER_KINDS: Record<JournalFilter, EventKind[] | null> = {
  all: null,
  activity: ["walk", "play"],
  food: ["meal", "water"],
  health: ["weight", "mood", "symptom", "note"],
  care: ["dose"],
};

export function collectEvents(data: TrackerData, filter: JournalFilter = "all"): TimelineItem[] {
  const items: TimelineItem[] = [
    ...data.walks.map((data) => ({ kind: "walk" as const, data })),
    ...data.meals.map((data) => ({ kind: "meal" as const, data })),
    ...data.water.map((data) => ({ kind: "water" as const, data })),
    ...data.weights.map((data) => ({ kind: "weight" as const, data })),
    ...data.moods.map((data) => ({ kind: "mood" as const, data })),
    ...data.symptoms.map((data) => ({ kind: "symptom" as const, data })),
    ...data.play.map((data) => ({ kind: "play" as const, data })),
    ...data.notes.map((data) => ({ kind: "note" as const, data })),
    ...data.doses.map((data) => ({ kind: "dose" as const, data })),
  ];
  const kinds = FILTER_KINDS[filter];
  const filtered = kinds ? items.filter((i) => kinds.includes(i.kind)) : items;
  return filtered.sort((a, b) => b.data.at - a.data.at);
}

export function eventTitle(item: TimelineItem, data: TrackerData) {
  switch (item.kind) {
    case "walk":
      return "Прогулка";
    case "meal":
      return slotLabel(item.data.slot);
    case "water":
      return "Вода";
    case "weight":
      return "Вес";
    case "mood":
      return moodLabel(item.data.mood);
    case "symptom":
      return item.data.name;
    case "play":
      return item.data.kind;
    case "note":
      return "Заметка";
    case "dose": {
      const med = data.meds.find((m) => m.id === item.data.medId);
      return med ? med.name : "Лекарство";
    }
  }
}

export function eventSubtitle(item: TimelineItem) {
  switch (item.kind) {
    case "walk":
      return `${minutesLabel(item.data.minutes)} · ${item.data.km.toFixed(1).replace(".", ",")} км`;
    case "meal": {
      const kcal = item.data.kcal ? ` · ${item.data.kcal} ккал` : "";
      return `${item.data.food} · ${item.data.grams} г${kcal}`;
    }
    case "water":
      return `${item.data.ml} мл`;
    case "weight":
      return kgLabel(item.data.kg);
    case "mood":
      return item.data.note ?? "Самочувствие";
    case "symptom":
      return item.data.note ?? `Сила ${item.data.severity}/3`;
    case "play":
      return minutesLabel(item.data.minutes);
    case "note":
      return item.data.text;
    case "dose":
      return "Принято";
  }
}

export function eventAt(item: TimelineItem) {
  return item.data.at;
}

export function groupByDay(items: TimelineItem[]) {
  const groups: { day: string; at: number; items: TimelineItem[] }[] = [];
  for (const item of items) {
    const key = startDay(item.data.at);
    const last = groups[groups.length - 1];
    if (last && startDay(last.at) === key) last.items.push(item);
    else groups.push({ day: formatDay(item.data.at), at: item.data.at, items: [item] });
  }
  return groups;
}

export function weekDays(now = Date.now()) {
  const start = startDay(now);
  const d = new Date(start);
  const mondayOffset = (d.getDay() + 6) % 7;
  const monday = start - mondayOffset * 86400000;
  return Array.from({ length: 7 }, (_, i) => monday + i * 86400000);
}
