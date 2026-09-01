import { round1 } from "./utils";

export type IngrCategory = "protein" | "dairy" | "grain" | "veggie" | "fruit" | "oil";

export type Ingredient = {
  id: string;
  name: string;
  calsPer100g: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  category: IngrCategory;
  liverFriendly: boolean;
  maxPerWeek?: number;
  maxPerMeal?: number;
  seedsRemove?: boolean;
  note?: string;
};

export type Portion = { id: string; grams: number };
export type ResolvedPortion = { ingredient: Ingredient; grams: number; kcal: number };

export type BuiltMeal = {
  slot: "breakfast" | "dinner";
  targetKcal: number;
  portions: Portion[];
  method: string;
};

export type NutritionTotals = {
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  grams: number;
};

export type DogDietProfile = {
  weightKg: number;
  ageYears: number;
  activity: "low" | "medium" | "high";
  goal: "maintenance" | "loss" | "gain" | "recovery";
  allergies: string[];
  medications: string[];
  calorieTarget: number;
};

export const INGREDIENTS: Ingredient[] = [
  { id: "chicken_breast", name: "Курица (грудка)", calsPer100g: 165, protein: 31, fat: 3.6, carbs: 0, fiber: 0, category: "protein", liverFriendly: true },
  { id: "turkey_breast", name: "Индейка (грудка)", calsPer100g: 135, protein: 29, fat: 1.0, carbs: 0, fiber: 0, category: "protein", liverFriendly: true },
  { id: "beef_lean", name: "Говядина постная", calsPer100g: 158, protein: 26, fat: 6.0, carbs: 0, fiber: 0, category: "protein", liverFriendly: true, note: "Умеренный жир — в дневном ужине Арчи" },
  { id: "beef_heart", name: "Говяжье сердце", calsPer100g: 112, protein: 17, fat: 4.5, carbs: 0.1, fiber: 0, category: "protein", liverFriendly: true },
  { id: "chicken_heart", name: "Куриное сердце", calsPer100g: 153, protein: 16, fat: 9.0, carbs: 0.9, fiber: 0, category: "protein", liverFriendly: true },
  { id: "chicken_gizzard", name: "Куриные желудки", calsPer100g: 94, protein: 18, fat: 2.1, carbs: 0, fiber: 0, category: "protein", liverFriendly: true },
  { id: "chicken_liver", name: "Печень куриная", calsPer100g: 119, protein: 17, fat: 4.5, carbs: 2.9, fiber: 0, category: "protein", liverFriendly: false, maxPerWeek: 2, note: "Не с Урзахолом и Гепатосаном" },
  { id: "fish_white", name: "Рыба белая", calsPer100g: 90, protein: 20, fat: 1.0, carbs: 0, fiber: 0, category: "protein", liverFriendly: true },
  { id: "salmon", name: "Лосось", calsPer100g: 208, protein: 20, fat: 13, carbs: 0, fiber: 0, category: "protein", liverFriendly: true, note: "Жирноват — небольшая порция" },
  { id: "beef_tripe", name: "Говяжий рубец", calsPer100g: 96, protein: 14, fat: 4.0, carbs: 0, fiber: 0, category: "protein", liverFriendly: true },
  { id: "cottage_cheese", name: "Творог 5%", calsPer100g: 121, protein: 17, fat: 5.0, carbs: 3.3, fiber: 0, category: "dairy", liverFriendly: true },
  { id: "egg", name: "Яйцо", calsPer100g: 155, protein: 13, fat: 11, carbs: 1.1, fiber: 0, category: "dairy", liverFriendly: true },
  { id: "rice", name: "Рис", calsPer100g: 130, protein: 2.7, fat: 0.3, carbs: 28, fiber: 0.4, category: "grain", liverFriendly: true },
  { id: "buckwheat", name: "Гречка", calsPer100g: 110, protein: 3.4, fat: 0.6, carbs: 22, fiber: 1.5, category: "grain", liverFriendly: true },
  { id: "oatmeal", name: "Овсянка", calsPer100g: 68, protein: 2.5, fat: 1.4, carbs: 12, fiber: 2.0, category: "grain", liverFriendly: true },
  { id: "potato", name: "Картофель", calsPer100g: 76, protein: 2.0, fat: 0.1, carbs: 17, fiber: 1.4, category: "grain", liverFriendly: true },
  { id: "carrot", name: "Морковь", calsPer100g: 35, protein: 0.9, fat: 0.2, carbs: 7, fiber: 2.4, category: "veggie", liverFriendly: true },
  { id: "pumpkin", name: "Тыква", calsPer100g: 26, protein: 1.0, fat: 0.1, carbs: 5, fiber: 0.5, category: "veggie", liverFriendly: true },
  { id: "zucchini", name: "Кабачок", calsPer100g: 24, protein: 1.2, fat: 0.3, carbs: 3.5, fiber: 1.1, category: "veggie", liverFriendly: true },
  { id: "broccoli", name: "Брокколи", calsPer100g: 34, protein: 2.8, fat: 0.4, carbs: 5, fiber: 2.6, category: "veggie", liverFriendly: true, maxPerWeek: 3 },
  { id: "greenery", name: "Зелень", calsPer100g: 25, protein: 2.5, fat: 0.5, carbs: 2, fiber: 1.8, category: "veggie", liverFriendly: true },
  { id: "cucumber", name: "Огурец", calsPer100g: 15, protein: 0.7, fat: 0.1, carbs: 2.8, fiber: 0.5, category: "veggie", liverFriendly: true },
  { id: "apple", name: "Яблоко", calsPer100g: 52, protein: 0.3, fat: 0.2, carbs: 12, fiber: 2.4, category: "fruit", liverFriendly: true, seedsRemove: true },
  { id: "pear", name: "Груша", calsPer100g: 57, protein: 0.4, fat: 0.1, carbs: 13, fiber: 3.1, category: "fruit", liverFriendly: true, seedsRemove: true },
  { id: "blueberry", name: "Черника", calsPer100g: 57, protein: 0.7, fat: 0.3, carbs: 14, fiber: 2.4, category: "fruit", liverFriendly: true },
  { id: "olive_oil", name: "Оливковое масло", calsPer100g: 884, protein: 0, fat: 100, carbs: 0, fiber: 0, category: "oil", liverFriendly: true, maxPerMeal: 5 },
  { id: "salmon_oil", name: "Рыбий жир", calsPer100g: 900, protein: 0, fat: 100, carbs: 0, fiber: 0, category: "oil", liverFriendly: true, maxPerMeal: 3 },
];

const BY_ID = new Map(INGREDIENTS.map((i) => [i.id, i]));

export function getIngredient(id: string) {
  return BY_ID.get(id);
}

const LIVER_MEDS = ["урзахол", "гептрал", "эссенциале", "карсил", "гепатосан"];

export function hasLiverMeds(meds: string[]) {
  return meds.some((m) => LIVER_MEDS.some((k) => m.toLowerCase().includes(k)));
}

export function isSafeIngredient(ing: Ingredient, profile: DogDietProfile) {
  if (profile.allergies.some((a) => ing.name.toLowerCase().includes(a.toLowerCase()))) {
    return false;
  }
  if (hasLiverMeds(profile.medications) && !ing.liverFriendly) return false;
  if (profile.ageYears >= 10 && (ing.category === "protein" || ing.category === "dairy") && ing.fat > 15) {
    return false;
  }
  return true;
}

export function safeIngredients(profile: DogDietProfile, category?: IngrCategory) {
  return INGREDIENTS.filter((i) => {
    if (!isSafeIngredient(i, profile)) return false;
    if (!category) return true;
    if (i.category === category) return true;
    if (category === "protein" && i.category === "dairy") return true;
    return false;
  });
}

export function dietWarnings(profile: DogDietProfile): string[] {
  const out: string[] = [];
  if (hasLiverMeds(profile.medications)) {
    out.push("Урзахол и Гепатосан — держим жир низким, без печени и жирных субпродуктов.");
  }
  if (profile.ageYears >= 10) {
    out.push("Пожилой: варка, спокойная смена белка, омега-3 каплей рыбьего жира.");
  }
  return out;
}

const ACTIVITY = { low: 1.2, medium: 1.4, high: 1.6 };
const GOAL = { maintenance: 1, loss: 0.8, gain: 1.2, recovery: 1.1 };

function ageMult(years: number) {
  if (years < 1) return 3;
  if (years < 7) return 1;
  if (years < 10) return 0.9;
  return 0.8;
}

export function calcRER(weightKg: number) {
  return Math.round(70 * Math.pow(weightKg, 0.75));
}

export function calcFormulaCalories(profile: DogDietProfile) {
  return Math.round(
    calcRER(profile.weightKg) * ACTIVITY[profile.activity] * GOAL[profile.goal] * ageMult(profile.ageYears),
  );
}

export function splitMeals(total: number) {
  return { breakfast: Math.round(total * 0.45), dinner: Math.round(total * 0.55) };
}

export function portionKcal(id: string, grams: number) {
  const ing = getIngredient(id);
  if (!ing) return 0;
  return (ing.calsPer100g * grams) / 100;
}

export function resolvePortions(portions: Portion[]): ResolvedPortion[] {
  return portions
    .map((p) => {
      const ingredient = getIngredient(p.id);
      if (!ingredient) return null;
      const grams = p.grams;
      return { ingredient, grams, kcal: round1(portionKcal(p.id, grams)) };
    })
    .filter((x): x is ResolvedPortion => Boolean(x));
}

export function totals(portions: Portion[]): NutritionTotals {
  const resolved = resolvePortions(portions);
  const acc = resolved.reduce(
    (s, p) => {
      const k = p.grams / 100;
      return {
        kcal: s.kcal + p.ingredient.calsPer100g * k,
        protein: s.protein + p.ingredient.protein * k,
        fat: s.fat + p.ingredient.fat * k,
        carbs: s.carbs + p.ingredient.carbs * k,
        grams: s.grams + p.grams,
      };
    },
    { kcal: 0, protein: 0, fat: 0, carbs: 0, grams: 0 },
  );
  return {
    kcal: Math.round(acc.kcal),
    protein: round1(acc.protein),
    fat: round1(acc.fat),
    carbs: round1(acc.carbs),
    grams: Math.round(acc.grams),
  };
}

export function formatPortions(portions: Portion[]) {
  return resolvePortions(portions).map((p) => `${p.ingredient.name} ${p.grams} г`);
}

export function mealTitle(portions: Portion[]) {
  return resolvePortions(portions)
    .filter((p) => p.ingredient.category !== "oil")
    .map((p) => p.ingredient.name.replace(/\s*\(.*\)/, ""))
    .slice(0, 3)
    .join(", ");
}

function clampOil(p: Portion) {
  const ing = getIngredient(p.id);
  if (!ing?.maxPerMeal) return p;
  return { ...p, grams: Math.min(p.grams, ing.maxPerMeal) };
}

export function scalePortions(portions: Portion[], targetKcal: number): Portion[] {
  const food = portions.filter((p) => getIngredient(p.id)?.category !== "oil").map(clampOil);
  const oils = portions.filter((p) => getIngredient(p.id)?.category === "oil").map(clampOil);
  const oilKcal = totals(oils).kcal;
  const need = Math.max(40, targetKcal - oilKcal);
  const current = totals(food).kcal || 1;
  const factor = need / current;
  const scaled = food.map((p) => ({
    id: p.id,
    grams: Math.max(10, Math.round(p.grams * factor)),
  }));
  return [...scaled, ...oils];
}

function pick<T>(arr: T[], n: number) {
  if (arr.length === 0) return undefined;
  return arr[((n % arr.length) + arr.length) % arr.length];
}

export const USUAL_BREAKFAST: Portion[] = [
  { id: "chicken_breast", grams: 150 },
  { id: "rice", grams: 100 },
  { id: "carrot", grams: 50 },
];

export const USUAL_DINNER: Portion[] = [
  { id: "beef_lean", grams: 150 },
  { id: "buckwheat", grams: 100 },
  { id: "pumpkin", grams: 50 },
];

export function cookingMethod(profile: DogDietProfile) {
  return profile.ageYears >= 10 ? "варка" : "варка или пар";
}

export function usualDay(targetKcal: number, profile: DogDietProfile): { breakfast: BuiltMeal; dinner: BuiltMeal } {
  const split = splitMeals(targetKcal);
  return {
    breakfast: {
      slot: "breakfast",
      targetKcal: split.breakfast,
      portions: USUAL_BREAKFAST.map((p) => ({ ...p })),
      method: cookingMethod(profile),
    },
    dinner: {
      slot: "dinner",
      targetKcal: split.dinner,
      portions: USUAL_DINNER.map((p) => ({ ...p })),
      method: cookingMethod(profile),
    },
  };
}

export function variantDay(
  profile: DogDietProfile,
  targetKcal: number,
  nonce: number,
): { breakfast: BuiltMeal; dinner: BuiltMeal } {
  const proteins = safeIngredients(profile, "protein").filter((p) => p.fat <= 10);
  const grains = safeIngredients(profile, "grain");
  const veggies = safeIngredients(profile, "veggie");
  const split = splitMeals(targetKcal);

  function build(slot: "breakfast" | "dinner", n: number, oilId: string, oilG: number): BuiltMeal {
    const protein = pick(proteins, n)?.id ?? "chicken_breast";
    const grain = pick(grains, n + 3)?.id ?? "rice";
    let veg = pick(veggies, n + 7)?.id ?? "carrot";
    if (veg === protein) veg = pick(veggies, n + 11)?.id ?? veg;
    const draft: Portion[] = [
      { id: protein, grams: 150 },
      { id: grain, grams: 100 },
      { id: veg, grams: 50 },
      { id: oilId, grams: oilG },
    ];
    return {
      slot,
      targetKcal: slot === "breakfast" ? split.breakfast : split.dinner,
      portions: scalePortions(draft, slot === "breakfast" ? split.breakfast : split.dinner),
      method: cookingMethod(profile),
    };
  }

  return {
    breakfast: build("breakfast", nonce, "olive_oil", 3),
    dinner: build("dinner", nonce + 17, "salmon_oil", 2),
  };
}

export function swapPortion(portions: Portion[], index: number, nextId: string): Portion[] {
  const current = portions[index];
  if (!current) return portions;
  const oldKcal = portionKcal(current.id, current.grams) || 1;
  const next = getIngredient(nextId);
  if (!next) return portions;
  let grams = Math.round((oldKcal / next.calsPer100g) * 100);
  if (next.maxPerMeal) grams = Math.min(grams, next.maxPerMeal);
  grams = Math.max(next.category === "oil" ? 1 : 10, grams);
  return portions.map((p, i) => (i === index ? { id: nextId, grams } : p));
}

export function setPortionGrams(portions: Portion[], index: number, grams: number): Portion[] {
  const current = portions[index];
  if (!current) return portions;
  const ing = getIngredient(current.id);
  let g = Math.max(1, Math.round(grams));
  if (ing?.maxPerMeal) g = Math.min(g, ing.maxPerMeal);
  return portions.map((p, i) => (i === index ? { ...p, grams: g } : p));
}

export const RECIPE_LIBRARY = [
  {
    id: "r-chicken",
    name: "Куриное рагу",
    portions: [
      { id: "chicken_breast", grams: 150 },
      { id: "rice", grams: 100 },
      { id: "carrot", grams: 50 },
      { id: "zucchini", grams: 50 },
    ] satisfies Portion[],
    description: "Привычный завтрак, кабачок вместо части моркови.",
  },
  {
    id: "r-beef",
    name: "Говяжий микс",
    portions: [
      { id: "beef_lean", grams: 150 },
      { id: "buckwheat", grams: 100 },
      { id: "pumpkin", grams: 50 },
      { id: "apple", grams: 30 },
    ] satisfies Portion[],
    description: "Вечерняя порция. Яблоко — без семечек.",
  },
  {
    id: "r-fish",
    name: "Рыбное",
    portions: [
      { id: "fish_white", grams: 160 },
      { id: "potato", grams: 80 },
      { id: "zucchini", grams: 60 },
      { id: "salmon_oil", grams: 2 },
    ] satisfies Portion[],
    description: "Лёгкий белок, если нужен перерыв от мяса.",
  },
];
