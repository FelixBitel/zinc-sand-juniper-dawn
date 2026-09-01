export type Mood = "great" | "good" | "ok" | "low" | "poor";
export type MealSlot = "breakfast" | "dinner" | "snack";
export type Eaten = "all" | "most" | "half" | "little";
export type Cadence = "daily" | "monthly" | "quarterly";
export type Tab = "today" | "journal" | "nutrition" | "archie";
export type LogType =
  | "walk"
  | "meal"
  | "water"
  | "weight"
  | "mood"
  | "med"
  | "play"
  | "note"
  | "symptom";
export type JournalFilter = "all" | "activity" | "food" | "health" | "care";
export type ActivityLevel = "low" | "medium" | "high";
export type DietGoal = "maintenance" | "loss" | "gain" | "recovery";

export type Walk = {
  id: string;
  at: number;
  minutes: number;
  km: number;
  note?: string;
  photo?: string;
};

export type Meal = {
  id: string;
  at: number;
  slot: MealSlot;
  food: string;
  grams: number;
  eaten: Eaten;
  ingredients?: string[];
  kcal?: number;
};

export type Water = { id: string; at: number; ml: number };
export type Weight = { id: string; at: number; kg: number; note?: string };
export type MoodLog = { id: string; at: number; mood: Mood; note?: string };
export type Symptom = {
  id: string;
  at: number;
  name: string;
  severity: 1 | 2 | 3;
  note?: string;
};
export type Play = { id: string; at: number; minutes: number; kind: string };
export type Note = { id: string; at: number; text: string; photo?: string };
export type Dose = { id: string; medId: string; at: number };

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  cadence: Cadence;
  nextDue: number;
  withFood?: boolean;
  notes?: string;
  times?: string[];
  kind?: string;
};

export type Vaccine = {
  id: string;
  name: string;
  lastAt: number;
  nextAt: number;
};

export type Visit = {
  id: string;
  at: number;
  reason: string;
  notes?: string;
  upcoming: boolean;
};

export type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  calories: number;
  portions: number;
  description?: string;
};

export type Profile = {
  name: string;
  breed: string;
  sex: "male" | "female";
  birthday: string;
  color: string;
  chip: string;
  clinic: string;
  doctor: string;
  phone: string;
  food: string;
  allergies: string[];
  neutered: boolean;
  targetMinKg: number;
  targetMaxKg: number;
  walkTargetPerDay: number;
  waterTargetMl: number;
  groomingLast: number;
  groomingEveryDays: number;
  ownerNote: string;
  calorieTarget: number;
  activity: ActivityLevel;
  goal: DietGoal;
  status: string;
};

export type TrackerData = {
  profile: Profile;
  walks: Walk[];
  meals: Meal[];
  water: Water[];
  weights: Weight[];
  moods: MoodLog[];
  symptoms: Symptom[];
  play: Play[];
  notes: Note[];
  meds: Medication[];
  doses: Dose[];
  vaccines: Vaccine[];
  visits: Visit[];
  recipes: Recipe[];
};

export type EventKind =
  | "walk"
  | "meal"
  | "water"
  | "weight"
  | "mood"
  | "symptom"
  | "play"
  | "note"
  | "dose";

export type TimelineItem =
  | { kind: "walk"; data: Walk }
  | { kind: "meal"; data: Meal }
  | { kind: "water"; data: Water }
  | { kind: "weight"; data: Weight }
  | { kind: "mood"; data: MoodLog }
  | { kind: "symptom"; data: Symptom }
  | { kind: "play"; data: Play }
  | { kind: "note"; data: Note }
  | { kind: "dose"; data: Dose };
