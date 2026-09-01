import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildSeed } from "./seed";
import { startDay } from "./format";
import type {
  Eaten,
  MealSlot,
  Mood,
  Recipe,
  TrackerData,
} from "./types";
import { nid } from "./utils";

type AddWalk = { minutes: number; km: number; note?: string; photo?: string };
type AddMeal = {
  slot: MealSlot;
  food: string;
  grams: number;
  eaten: Eaten;
  ingredients?: string[];
  kcal?: number;
};
type AddMood = { mood: Mood; note?: string };
type AddSymptom = { name: string; severity: 1 | 2 | 3; note?: string };
type AddPlay = { minutes: number; kind: string };
type AddNote = { text: string; photo?: string };

export type PetState = TrackerData & {
  hydrated: boolean;
  addWalk: (input: AddWalk) => void;
  addMeal: (input: AddMeal) => void;
  replaceTodayMeal: (input: AddMeal) => void;
  addWater: (ml: number) => void;
  addWeight: (kg: number, note?: string) => void;
  addMood: (input: AddMood) => void;
  addSymptom: (input: AddSymptom) => void;
  addPlay: (input: AddPlay) => void;
  addNote: (input: AddNote) => void;
  logMed: (medId: string) => void;
  addRecipe: (recipe: Omit<Recipe, "id">) => void;
  removeEvent: (kind: string, id: string) => void;
  setOwnerNote: (note: string) => void;
  setCalorieTarget: (n: number) => void;
  resetDemo: () => void;
};

const seed = buildSeed();

function bumpDue(cadence: TrackerData["meds"][number]["cadence"], from: number) {
  const d = new Date(from);
  if (cadence === "daily") d.setDate(d.getDate() + 1);
  if (cadence === "monthly") d.setMonth(d.getMonth() + 1);
  if (cadence === "quarterly") d.setMonth(d.getMonth() + 3);
  return d.getTime();
}

export const usePetStore = create<PetState>()(
  persist(
    (set, get) => ({
      ...seed,
      hydrated: false,
      addWalk: (input) =>
        set({
          walks: [{ id: nid(), at: Date.now(), ...input }, ...get().walks],
        }),
      addMeal: (input) =>
        set({
          meals: [{ id: nid(), at: Date.now(), ...input }, ...get().meals],
        }),
      replaceTodayMeal: (input) => {
        const now = Date.now();
        const rest = get().meals.filter(
          (m) => !(m.slot === input.slot && startDay(m.at) === startDay(now)),
        );
        set({
          meals: [{ id: nid(), at: now, ...input }, ...rest],
        });
      },
      addWater: (ml) =>
        set({
          water: [{ id: nid(), at: Date.now(), ml }, ...get().water],
        }),
      addWeight: (kg, note) =>
        set({
          weights: [{ id: nid(), at: Date.now(), kg, note }, ...get().weights],
        }),
      addMood: (input) =>
        set({
          moods: [{ id: nid(), at: Date.now(), ...input }, ...get().moods],
        }),
      addSymptom: (input) =>
        set({
          symptoms: [{ id: nid(), at: Date.now(), ...input }, ...get().symptoms],
        }),
      addPlay: (input) =>
        set({
          play: [{ id: nid(), at: Date.now(), ...input }, ...get().play],
        }),
      addNote: (input) =>
        set({
          notes: [{ id: nid(), at: Date.now(), ...input }, ...get().notes],
        }),
      logMed: (medId) => {
        const med = get().meds.find((m) => m.id === medId);
        if (!med) return;
        const at = Date.now();
        set({
          doses: [{ id: nid(), medId, at }, ...get().doses],
          meds: get().meds.map((m) =>
            m.id === medId ? { ...m, nextDue: bumpDue(m.cadence, at) } : m,
          ),
        });
      },
      addRecipe: (recipe) =>
        set({
          recipes: [{ id: nid(), ...recipe }, ...get().recipes].slice(0, 12),
        }),
      removeEvent: (kind, id) => {
        const s = get();
        if (kind === "walk") set({ walks: s.walks.filter((x) => x.id !== id) });
        if (kind === "meal") set({ meals: s.meals.filter((x) => x.id !== id) });
        if (kind === "water") set({ water: s.water.filter((x) => x.id !== id) });
        if (kind === "weight") set({ weights: s.weights.filter((x) => x.id !== id) });
        if (kind === "mood") set({ moods: s.moods.filter((x) => x.id !== id) });
        if (kind === "symptom") set({ symptoms: s.symptoms.filter((x) => x.id !== id) });
        if (kind === "play") set({ play: s.play.filter((x) => x.id !== id) });
        if (kind === "note") set({ notes: s.notes.filter((x) => x.id !== id) });
        if (kind === "dose") set({ doses: s.doses.filter((x) => x.id !== id) });
      },
      setOwnerNote: (ownerNote) =>
        set({ profile: { ...get().profile, ownerNote } }),
      setCalorieTarget: (calorieTarget) =>
        set({ profile: { ...get().profile, calorieTarget } }),
      resetDemo: () => set({ ...buildSeed(), hydrated: true }),
    }),
    {
      name: "archie-tracker-v2",
      skipHydration: true,
      partialize: (s) => ({
        profile: s.profile,
        walks: s.walks,
        meals: s.meals,
        water: s.water,
        weights: s.weights,
        moods: s.moods,
        symptoms: s.symptoms,
        play: s.play,
        notes: s.notes,
        meds: s.meds,
        doses: s.doses,
        vaccines: s.vaccines,
        visits: s.visits,
        recipes: s.recipes,
      }),
      onRehydrateStorage: () => () => {
        usePetStore.setState({ hydrated: true });
      },
    },
  ),
);
