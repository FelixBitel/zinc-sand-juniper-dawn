import { differenceInYears } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Chip, ChipRow } from "@/components/chips";
import { Paper, Section } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerHeader } from "@/components/ui/drawer";
import { slotLabel } from "@/lib/format";
import { latestWeight, todayKcal } from "@/lib/insights";
import {
  RECIPE_LIBRARY,
  calcFormulaCalories,
  dietWarnings,
  formatPortions,
  mealTitle,
  resolvePortions,
  scalePortions,
  setPortionGrams,
  splitMeals,
  swapPortion,
  totals,
  usualDay,
  variantDay,
  type BuiltMeal,
  type DogDietProfile,
  type IngrCategory,
  type Portion,
  safeIngredients,
} from "@/lib/nutrition";
import { usePetStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function dietFromStore(): DogDietProfile {
  const s = usePetStore.getState();
  const weight = latestWeight(s)?.kg ?? 21;
  return {
    weightKg: weight,
    ageYears: differenceInYears(new Date(), new Date(s.profile.birthday)),
    activity: s.profile.activity,
    goal: s.profile.goal,
    allergies: s.profile.allergies,
    medications: s.meds.map((m) => m.name),
    calorieTarget: s.profile.calorieTarget,
  };
}

function mealToLog(meal: BuiltMeal) {
  const t = totals(meal.portions);
  return {
    slot: meal.slot,
    food: mealTitle(meal.portions),
    grams: t.grams,
    eaten: "all" as const,
    ingredients: formatPortions(meal.portions),
    kcal: t.kcal,
  };
}

function MacroBar({ protein, fat, carbs }: { protein: number; fat: number; carbs: number }) {
  const p = protein * 4;
  const f = fat * 9;
  const c = carbs * 4;
  const sum = p + f + c || 1;
  return (
    <div className="flex h-1.5 overflow-hidden rounded-full bg-line">
      <span className="bg-sage" style={{ width: `${(p / sum) * 100}%` }} />
      <span className="bg-honey" style={{ width: `${(f / sum) * 100}%` }} />
      <span className="bg-ring" style={{ width: `${(c / sum) * 100}%` }} />
    </div>
  );
}

function MealCard({
  meal,
  onSwap,
  onGrams,
}: {
  meal: BuiltMeal;
  onSwap: (index: number) => void;
  onGrams: (index: number, grams: number) => void;
}) {
  const t = totals(meal.portions);
  const rows = resolvePortions(meal.portions);
  const delta = t.kcal - meal.targetKcal;
  return (
    <Paper>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-xl tracking-tight">{slotLabel(meal.slot)}</h3>
        <p className="tabular text-sm">
          <span className="font-medium">{t.kcal}</span>
          <span className="text-subtle"> / {meal.targetKcal} ккал</span>
        </p>
      </div>
      <p className="mt-1 text-xs text-muted">
        {meal.method}
        {delta > 25 ? ` · выше нормы на ${delta}` : delta < -25 ? ` · ниже на ${Math.abs(delta)}` : " · в норме"}
      </p>
      <div className="mt-3 flex flex-col gap-1">
        {rows.map((row, i) => (
          <div
            key={`${row.ingredient.id}-${i}`}
            className="flex items-center justify-between gap-2 rounded-lg px-1 py-2"
          >
            <button
              type="button"
              onClick={() => onSwap(i)}
              className="min-w-0 flex-1 text-left transition-transform duration-150 active:scale-[0.98]"
            >
              <span className="block truncate text-sm font-medium">{row.ingredient.name}</span>
              <span className="text-xs text-subtle">{row.kcal} ккал · заменить</span>
            </button>
            <span className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onGrams(i, row.grams - 10)}
                className="flex size-8 items-center justify-center rounded-md border border-line text-sm"
                aria-label="Меньше"
              >
                −
              </button>
              <span className="tabular w-10 text-center text-sm">{row.grams}г</span>
              <button
                type="button"
                onClick={() => onGrams(i, row.grams + 10)}
                className="flex size-8 items-center justify-center rounded-md border border-line text-sm"
                aria-label="Больше"
              >
                +
              </button>
            </span>
          </div>
        ))}
      </div>
    </Paper>
  );
}

export function NutritionScreen() {
  const profile = usePetStore((s) => s.profile);
  const recipes = usePetStore((s) => s.recipes);
  const replaceTodayMeal = usePetStore((s) => s.replaceTodayMeal);
  const addRecipe = usePetStore((s) => s.addRecipe);
  const setCalorieTarget = usePetStore((s) => s.setCalorieTarget);
  const logged = todayKcal(usePetStore());

  const diet = dietFromStore();
  const formula = calcFormulaCalories(diet);
  const target = profile.calorieTarget;
  const split = splitMeals(target);

  const [nonce, setNonce] = useState(0);
  const [mode, setMode] = useState<"usual" | "variant">("usual");
  const initial = useMemo(() => usualDay(target, diet), [target, diet.ageYears]);
  const [breakfast, setBreakfast] = useState<BuiltMeal>(initial.breakfast);
  const [dinner, setDinner] = useState<BuiltMeal>(initial.dinner);

  useEffect(() => {
    const s = splitMeals(target);
    setBreakfast((m) => ({ ...m, targetKcal: s.breakfast }));
    setDinner((m) => ({ ...m, targetKcal: s.dinner }));
  }, [target]);

  const [swap, setSwap] = useState<{ slot: "breakfast" | "dinner"; index: number } | null>(null);

  const dayPortions = [...breakfast.portions, ...dinner.portions];
  const day = totals(dayPortions);
  const warnings = dietWarnings(diet);
  const fatPct = day.kcal ? Math.round(((day.fat * 9) / day.kcal) * 100) : 0;

  function applyDay(next: { breakfast: BuiltMeal; dinner: BuiltMeal }) {
    setBreakfast({ ...next.breakfast, targetKcal: split.breakfast });
    setDinner({ ...next.dinner, targetKcal: split.dinner });
  }

  function loadUsual() {
    setMode("usual");
    applyDay(usualDay(target, diet));
  }

  function loadVariant() {
    const n = nonce + 1;
    setNonce(n);
    setMode("variant");
    applyDay(variantDay(diet, target, n));
  }

  function fitTarget() {
    setBreakfast((m) => ({ ...m, portions: scalePortions(m.portions, split.breakfast), targetKcal: split.breakfast }));
    setDinner((m) => ({ ...m, portions: scalePortions(m.portions, split.dinner), targetKcal: split.dinner }));
    toast("Порции подогнаны к норме");
  }

  function patch(slot: "breakfast" | "dinner", fn: (p: Portion[]) => Portion[]) {
    const set = slot === "breakfast" ? setBreakfast : setDinner;
    set((m) => ({ ...m, portions: fn(m.portions) }));
  }

  const swapping = swap
    ? (swap.slot === "breakfast" ? breakfast : dinner).portions[swap.index]
    : undefined;
  const swapIng = swapping ? resolvePortions([swapping])[0]?.ingredient : undefined;
  const altCategory: IngrCategory | undefined = swapIng
    ? swapIng.category === "dairy"
      ? "protein"
      : swapIng.category === "fruit"
        ? "veggie"
        : swapIng.category
    : undefined;
  const alts = altCategory ? safeIngredients(diet, altCategory) : [];

  function saveJournal() {
    replaceTodayMeal(mealToLog(breakfast));
    replaceTodayMeal(mealToLog(dinner));
    toast("Завтрак и ужин записаны в журнал");
  }

  function saveAsRecipe() {
    addRecipe({
      name: `Меню ${new Date().toLocaleDateString("ru")}`,
      ingredients: [...formatPortions(breakfast.portions), ...formatPortions(dinner.portions)],
      calories: day.kcal,
      portions: 2,
      description: mode === "usual" ? "Привычное" : `Вариант ${nonce}`,
    });
    toast("Сохранено в рецепты");
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <header className="px-4 pt-2">
        <p className="text-sm text-muted">Домашний рацион · печень</p>
        <h1 className="font-display text-3xl tracking-tight">Питание</h1>
      </header>

      <div className="px-4">
        <Paper>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-muted">Норма дня</p>
              <p className="font-display text-3xl tabular tracking-tight">{target} ккал</p>
            </div>
            <p className="text-right text-xs text-subtle">
              в журнале {logged}
              <br />
              меню {day.kcal}
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-sage"
              style={{ width: `${Math.min(100, (day.kcal / Math.max(1, target)) * 100)}%` }}
            />
          </div>
          <MacroBar protein={day.protein} fat={day.fat} carbs={day.carbs} />
          <p className="mt-2 text-xs text-muted">
            Белок {day.protein} г · жир {day.fat} г ({fatPct}%) · углеводы {day.carbs} г
          </p>
          {fatPct > 15 ? (
            <p className="mt-2 text-xs text-honey">Жир выше 15% калорий — многовато при Урзахоле.</p>
          ) : (
            <p className="mt-2 text-xs text-sage">Жир в безопасной зоне для печени.</p>
          )}
          <div className="mt-3">
            <ChipRow>
              <Chip active={target === 870} onClick={() => setCalorieTarget(870)}>
                Дневник 870
              </Chip>
              <Chip active={target === formula} onClick={() => setCalorieTarget(formula)}>
                Формула {formula}
              </Chip>
            </ChipRow>
          </div>
        </Paper>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant={mode === "usual" ? "primary" : "secondary"} onClick={loadUsual}>
            Привычное
          </Button>
          <Button variant={mode === "variant" ? "primary" : "secondary"} onClick={loadVariant}>
            <RefreshCw className="size-4" />
            Другой
          </Button>
        </div>
      </div>

      <Section title="Собрать день">
        <div className="flex flex-col gap-2">
          <MealCard
            meal={breakfast}
            onSwap={(i) => setSwap({ slot: "breakfast", index: i })}
            onGrams={(i, g) => patch("breakfast", (p) => setPortionGrams(p, i, g))}
          />
          <MealCard
            meal={dinner}
            onSwap={(i) => setSwap({ slot: "dinner", index: i })}
            onGrams={(i, g) => patch("dinner", (p) => setPortionGrams(p, i, g))}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={fitTarget}>
            Подогнать
          </Button>
          <Button onClick={saveJournal}>В журнал</Button>
        </div>
        <Button variant="ghost" className="mt-1 w-full text-muted" onClick={saveAsRecipe}>
          Сохранить как рецепт
        </Button>
      </Section>

      {warnings.length ? (
        <Section title="Ограничения">
          <div className="flex flex-col gap-2">
            {warnings.map((w) => (
              <Paper key={w}>
                <p className="text-sm leading-relaxed">{w}</p>
              </Paper>
            ))}
          </div>
        </Section>
      ) : null}

      <Section title="Рецепты">
        <div className="flex flex-col gap-2">
          {RECIPE_LIBRARY.map((r) => {
            const t = totals(r.portions);
            return (
              <Paper key={r.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="mt-1 text-xs text-muted">{r.description}</p>
                    <p className="mt-2 text-xs text-subtle">{formatPortions(r.portions).join(" · ")}</p>
                  </div>
                  <Badge>{t.kcal} ккал</Badge>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-3"
                  onClick={() => {
                    const slot = r.id.includes("beef") ? "dinner" : "breakfast";
                    const built: BuiltMeal = {
                      slot,
                      targetKcal: slot === "breakfast" ? split.breakfast : split.dinner,
                      portions: r.portions.map((p) => ({ ...p })),
                      method: "варка",
                    };
                    if (slot === "breakfast") setBreakfast(built);
                    else setDinner(built);
                    toast(`${r.name} поставлено в ${slot === "breakfast" ? "завтрак" : "ужин"}`);
                  }}
                >
                  Подставить
                </Button>
              </Paper>
            );
          })}
          {recipes
            .filter((r) => !RECIPE_LIBRARY.some((x) => x.name === r.name))
            .map((r) => (
              <Paper key={r.id}>
                <p className="font-medium">{r.name}</p>
                <p className="mt-1 text-xs text-muted">{r.ingredients.join(" · ")}</p>
                <p className="mt-2 text-xs text-subtle">{r.calories} ккал</p>
              </Paper>
            ))}
        </div>
      </Section>

      <Drawer open={Boolean(swap)} onOpenChange={(o) => !o && setSwap(null)}>
        <DrawerHeader
          title={swapIng?.name ?? "Замена"}
          subtitle="Только продукты, безопасные при печени и возрасте"
        />
        <div className="sheet-scroll flex flex-col gap-1 px-5 pb-8">
          {alts.map((ing) => (
            <button
              key={ing.id}
              type="button"
              onClick={() => {
                if (!swap) return;
                patch(swap.slot, (p) => swapPortion(p, swap.index, ing.id));
                setSwap(null);
              }}
              className={cn(
                "flex items-center justify-between rounded-xl bg-paper px-4 py-3 text-left transition-transform duration-150 active:scale-[0.96]",
                ing.id === swapIng?.id && "ring-1 ring-sage",
              )}
            >
              <span>
                <span className="block text-sm font-medium">{ing.name}</span>
                <span className="text-xs text-muted">
                  {ing.calsPer100g} ккал / 100 г · жир {ing.fat} г
                  {ing.seedsRemove ? " · без семечек" : ""}
                </span>
              </span>
              {ing.id === swapIng?.id ? <span className="text-xs text-sage">сейчас</span> : null}
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  );
}