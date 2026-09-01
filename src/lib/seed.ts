import type {
  Dose,
  Meal,
  Medication,
  Mood,
  MoodLog,
  Note,
  Play,
  Profile,
  Symptom,
  Recipe,
  TrackerData,
  Vaccine,
  Visit,
  Walk,
  Water,
  Weight,
} from "./types";
import { round1, round2 } from "./utils";

function at(daysAgo: number, hour: number, minute = 0, now = Date.now()) {
  const d = new Date(now);
  const utc = Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    hour,
    minute,
    0,
    0,
  );
  return utc - daysAgo * 86400000;
}

function jitter(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const PROFILE: Profile = {
  name: "Арчи",
  breed: "Мишлинг",
  sex: "male",
  birthday: "2014-05-20",
  color: "Рыжий с белой грудкой, седина на морде",
  chip: "",
  clinic: "",
  doctor: "",
  phone: "",
  food: "Домашний рацион: курица / говядина с крупой и овощами",
  allergies: [],
  neutered: true,
  targetMinKg: 20,
  targetMaxKg: 21.5,
  walkTargetPerDay: 3,
  waterTargetMl: 1000,
  groomingLast: 0,
  groomingEveryDays: 42,
  ownerNote:
    "После операции в октябре 2024. Хромота на левую заднюю лапу стала меньше. Урзахол 09:00 и 21:00, Гепатосан 09:00 и 18:00. Домашняя еда, низкий жир — печень.",
  calorieTarget: 870,
  activity: "low",
  goal: "maintenance",
  status: "Поддержка печени · восстановление после операции",
};

export function buildSeed(now = Date.now()): TrackerData {
  const walks: Walk[] = [];
  const meals: Meal[] = [];
  const water: Water[] = [];
  const moods: MoodLog[] = [];
  const play: Play[] = [];
  const weights: Weight[] = [];
  const doses: Dose[] = [];

  const moodCycle: Mood[] = [
    "good",
    "great",
    "good",
    "ok",
    "good",
    "great",
    "good",
    "low",
    "ok",
    "good",
    "great",
    "good",
    "good",
    "good",
  ];

  for (let d = 13; d >= 0; d--) {
    const j = jitter(d + 3);
    const morningMin = 28 + Math.round(j * 8);
    const noonMin = 40 + Math.round(jitter(d + 7) * 10);
    const eveningMin = 18 + Math.round(jitter(d + 11) * 8);

    walks.push({
      id: `walk-${d}-am`,
      at: at(d, 8, 0, now),
      minutes: morningMin,
      km: round2(morningMin * 0.04),
    });

    const skipNoon = d === 3 || d === 9;
    if (!skipNoon) {
      walks.push({
        id: `walk-${d}-md`,
        at: at(d, 14, 0, now),
        minutes: noonMin,
        km: round2(noonMin * 0.04),
      });
    }

    walks.push({
      id: `walk-${d}-pm`,
      at: at(d, 21, 0, now),
      minutes: eveningMin,
      km: round2(eveningMin * 0.038),
      note: d === 2 ? "Короткий вечерний круг, лапу не бережёт" : undefined,
      photo: d === 2 ? "/archie/portrait.jpg" : undefined,
    });

    meals.push({
      id: `meal-${d}-b`,
      at: at(d, 9, 30, now),
      slot: "breakfast",
      food: "Курица, рис, морковь",
      grams: 300,
      eaten: d === 8 ? "most" : "all",
      ingredients: ["Курица 150 г", "Рис 100 г", "Морковь 50 г"],
      kcal: 395,
    });
    meals.push({
      id: `meal-${d}-d`,
      at: at(d, 19, 0, now),
      slot: "dinner",
      food: "Говядина, гречка, тыква",
      grams: 300,
      eaten: "all",
      ingredients: ["Говядина 150 г", "Гречка 100 г", "Тыква 50 г"],
      kcal: 360,
    });

    const cups = d === 0 ? [180, 200, 240] : [200, 180 + Math.round(j * 80), 220, 160];
    cups.forEach((ml, i) => {
      water.push({
        id: `water-${d}-${i}`,
        at: at(d, 8 + i * 4, 15, now),
        ml,
      });
    });

    moods.push({
      id: `mood-${d}`,
      at: at(d, 21, 10, now),
      mood: moodCycle[13 - d] ?? "good",
      note: d === 8 ? "Немного притих после гостей" : undefined,
    });

    doses.push(
      { id: `dose-u-am-${d}`, medId: "med-urzahol", at: at(d, 9, 0, now) },
      { id: `dose-g-${d}`, medId: "med-gepatosan", at: at(d, 18, 0, now) },
    );
    if (d !== 0) {
      doses.push({ id: `dose-u-pm-${d}`, medId: "med-urzahol", at: at(d, 21, 0, now) });
    }

    if (d === 1 || d === 5 || d === 9 || d === 12) {
      play.push({
        id: `play-${d}`,
        at: at(d, 18, 20, now),
        minutes: 15 + Math.round(j * 10),
        kind: d === 5 ? "Мяч" : "Жевание / перетяжки",
      });
    }
  }

  for (let w = 15; w >= 0; w--) {
    const base = 21.05 - w * 0.01;
    const wave = (w % 4 === 0 ? 0.08 : -0.03) + jitter(w + 40) * 0.06;
    weights.push({
      id: `wt-${w}`,
      at: at(w * 7, 10, 0, now),
      kg: round1(Math.min(22.1, Math.max(20.6, base + wave))),
    });
  }

  const meds: Medication[] = [
    {
      id: "med-urzahol",
      name: "Урзахол",
      dosage: "1 капсула",
      cadence: "daily",
      nextDue: at(0, 21, 0, now),
      withFood: true,
      times: ["09:00", "21:00"],
      kind: "Противовоспалительное",
      notes: "Утром и вечером. С едой, печень.",
    },
    {
      id: "med-gepatosan",
      name: "Гепатосан",
      dosage: "1 таблетка",
      cadence: "daily",
      nextDue: at(0, 18, 0, now),
      withFood: true,
      times: ["09:00", "18:00"],
      kind: "Гепатопротектор",
      notes: "Утром и в 18:00.",
    },
  ];

  const vaccines: Vaccine[] = [
    {
      id: "vac-rabies",
      name: "Бешенство",
      lastAt: at(182, 11, 0, now),
      nextAt: at(-183, 11, 0, now),
    },
    {
      id: "vac-dhppi",
      name: "DHPPi",
      lastAt: at(182, 11, 30, now),
      nextAt: at(-183, 11, 30, now),
    },
    {
      id: "vac-lepto",
      name: "Лептоспироз",
      lastAt: at(350, 11, 0, now),
      nextAt: at(-15, 11, 0, now),
    },
  ];

  const visits: Visit[] = [
    {
      id: "visit-next",
      at: at(-14, 11, 0, now),
      reason: "Контроль печени и хромоты",
      notes: "Биохимия, смотрим левую заднюю лапу.",
      upcoming: true,
    },
    {
      id: "visit-past",
      at: at(300, 11, 0, now),
      reason: "Выписка после операции",
      notes: "Октябрь 2024. Назначены Урзахол и Гепатосан.",
      upcoming: false,
    },
  ];

  const symptoms: Symptom[] = [
    {
      id: "sym-1",
      at: at(3, 16, 0, now),
      name: "Хромота",
      severity: 1,
      note: "Левая задняя. После дневной прогулки чуть бережёт, к вечеру отпускает.",
    },
    {
      id: "sym-2",
      at: at(11, 19, 0, now),
      name: "Хромота",
      severity: 2,
      note: "Короче гуляли, без резвых игр.",
    },
  ];

  const notes: Note[] = [
    {
      id: "note-1",
      at: at(5, 21, 40, now),
      text: "Съел ужин целиком. После Гепатосана спокоен, вечером спал на диване.",
      photo: "/archie/portrait.jpg",
    },
    {
      id: "note-2",
      at: at(2, 10, 15, now),
      text: "Утро без хромоты. Урзахол с завтраком, кашу съел.",
      photo: "/archie/portrait.jpg",
    },
  ];

  const recipes: Recipe[] = [
    {
      id: "r-chicken",
      name: "Куриное рагу",
      ingredients: ["Курица 150 г", "Рис 100 г", "Морковь 50 г", "Кабачок 50 г"],
      calories: 407,
      portions: 1,
      description: "Утренняя порция, всё отварное.",
    },
    {
      id: "r-beef",
      name: "Говяжий микс",
      ingredients: ["Говядина 150 г", "Гречка 100 г", "Тыква 50 г", "Яблоко 30 г"],
      calories: 376,
      portions: 1,
      description: "Вечер. Яблоко без семечек.",
    },
    {
      id: "r-fish",
      name: "Рыбное",
      ingredients: ["Белая рыба 160 г", "Картофель 80 г", "Кабачок 60 г"],
      calories: 219,
      portions: 1,
      description: "Лёгкий день без красного мяса.",
    },
  ];

  return {
    profile: { ...PROFILE, groomingLast: at(13, 12, 0, now) },
    walks,
    meals,
    water,
    weights,
    moods,
    symptoms,
    play,
    notes,
    meds,
    doses,
    vaccines,
    visits,
    recipes,
  };
}
