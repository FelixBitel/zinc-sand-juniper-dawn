import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Chip, ChipRow } from "@/components/chips";
import { EventIcon } from "@/components/event-icon";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerHeader } from "@/components/ui/drawer";
import { Field, Input, Textarea } from "@/components/ui/input";
import { cadenceLabel, eatenLabel, moodLabel, slotLabel } from "@/lib/format";
import { usePetStore } from "@/lib/store";
import type { Eaten, LogType, MealSlot, Mood } from "@/lib/types";
import { round2 } from "@/lib/utils";

const TYPES: { type: LogType; label: string }[] = [
  { type: "walk", label: "Прогулка" },
  { type: "meal", label: "Еда" },
  { type: "water", label: "Вода" },
  { type: "weight", label: "Вес" },
  { type: "mood", label: "Настроение" },
  { type: "play", label: "Игра" },
  { type: "med", label: "Лекарство" },
  { type: "note", label: "Заметка" },
  { type: "symptom", label: "Симптом" },
];

const TITLES: Record<LogType, string> = {
  walk: "Прогулка",
  meal: "Приём пищи",
  water: "Вода",
  weight: "Вес",
  mood: "Самочувствие",
  play: "Игра",
  med: "Лекарство",
  note: "Заметка",
  symptom: "Симптом",
};

export function LogSheet({
  open,
  onOpenChange,
  initialType,
  mealSlot,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialType: LogType | null;
  mealSlot?: MealSlot;
}) {
  const [type, setType] = useState<LogType | null>(initialType);
  const [minutes, setMinutes] = useState(30);
  const [km, setKm] = useState(1.6);
  const [note, setNote] = useState("");
  const [slot, setSlot] = useState<MealSlot>(mealSlot ?? "dinner");
  const [food, setFood] = useState("Курица, рис, морковь");
  const [grams, setGrams] = useState(300);
  const [eaten, setEaten] = useState<Eaten>("all");
  const [kcal, setKcal] = useState(395);
  const [kgValue, setKgValue] = useState("21.0");
  const [mood, setMood] = useState<Mood>("good");
  const [playMin, setPlayMin] = useState(15);
  const [kind, setKind] = useState("Мяч");
  const [text, setText] = useState("");
  const [symptom, setSymptom] = useState("Мягкий стул");
  const [severity, setSeverity] = useState<1 | 2 | 3>(1);

  const addWalk = usePetStore((s) => s.addWalk);
  const addMeal = usePetStore((s) => s.addMeal);
  const addWater = usePetStore((s) => s.addWater);
  const addWeight = usePetStore((s) => s.addWeight);
  const addMood = usePetStore((s) => s.addMood);
  const addPlay = usePetStore((s) => s.addPlay);
  const addNote = usePetStore((s) => s.addNote);
  const addSymptom = usePetStore((s) => s.addSymptom);
  const logMed = usePetStore((s) => s.logMed);
  const meds = usePetStore((s) => s.meds);
  const lastWeight = usePetStore((s) =>
    [...s.weights].sort((a, b) => b.at - a.at)[0]?.kg,
  );

  useEffect(() => {
    if (!open) return;
    setType(initialType);
    setMinutes(30);
    setKm(round2(30 * 0.04));
    setNote("");
    setSlot(mealSlot ?? "dinner");
    setFood(mealSlot === "dinner" ? "Говядина, гречка, тыква" : "Курица, рис, морковь");
    setGrams(300);
    setEaten("all");
    setKcal(mealSlot === "dinner" ? 360 : 395);
    setKgValue(String(lastWeight ?? 21));
    setMood("good");
    setPlayMin(15);
    setKind("Мяч");
    setText("");
    setSymptom("Мягкий стул");
    setSeverity(1);
  }, [open, initialType, mealSlot, lastWeight]);

  function close() {
    onOpenChange(false);
  }

  function saveWalk() {
    addWalk({ minutes, km, note: note || undefined });
    toast("Прогулка записана");
    close();
  }

  function saveMeal() {
    addMeal({
      slot,
      food,
      grams,
      eaten,
      kcal,
      ingredients: food.split(",").map((s) => s.trim()),
    });
    toast("Приём пищи записан");
    close();
  }

  function saveWater(ml: number) {
    addWater(ml);
    toast(`+${ml} мл воды`);
    close();
  }

  function saveWeight() {
    const n = Number(kgValue.replace(",", "."));
    if (!n || n < 1 || n > 40) {
      toast("Проверьте вес");
      return;
    }
    addWeight(Math.round(n * 10) / 10, note || undefined);
    toast("Вес обновлён");
    close();
  }

  function saveMood() {
    addMood({ mood, note: note || undefined });
    toast("Самочувствие записано");
    close();
  }

  function savePlay() {
    addPlay({ minutes: playMin, kind });
    toast("Игра записана");
    close();
  }

  function saveNote() {
    if (!text.trim()) {
      toast("Напишите пару слов");
      return;
    }
    addNote({ text: text.trim() });
    toast("Заметка сохранена");
    close();
  }

  function saveSymptom() {
    addSymptom({ name: symptom, severity, note: note || undefined });
    toast("Симптом отмечен");
    close();
  }

  function saveMed(id: string) {
    logMed(id);
    toast("Приём отмечен");
    close();
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerHeader
        title={type ? TITLES[type] : "Новая запись"}
        subtitle={type ? undefined : "Что случилось с Арчи?"}
        onBack={type && !initialType ? () => setType(null) : undefined}
      />
      <div className="sheet-scroll px-5 pb-8">
        {!type ? (
          <div className="grid grid-cols-3 gap-2 pb-4">
            {TYPES.map((t) => (
              <button
                key={t.type}
                type="button"
                onClick={() => setType(t.type)}
                className="flex flex-col items-center gap-2 rounded-xl bg-paper px-2 py-4 transition-transform duration-150 active:scale-[0.96]"
              >
                <EventIcon kind={t.type} />
                <span className="text-xs font-medium text-ink">{t.label}</span>
              </button>
            ))}
          </div>
        ) : null}

        {type === "walk" ? (
          <div className="flex flex-col gap-4 pb-4">
            <Field label="Длительность">
              <ChipRow>
                {[20, 30, 45].map((m) => (
                  <Chip
                    key={m}
                    active={minutes === m}
                    onClick={() => {
                      setMinutes(m);
                      setKm(round2(m * 0.053));
                    }}
                  >
                    {m} мин
                  </Chip>
                ))}
              </ChipRow>
            </Field>
            <Field label="Дистанция, км">
              <Input
                inputMode="decimal"
                value={String(km).replace(".", ",")}
                onChange={(e) => setKm(Number(e.target.value.replace(",", ".")) || 0)}
              />
            </Field>
            <Field label="Заметка">
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Парк, лужи, собаки…" />
            </Field>
            <Button size="lg" onClick={saveWalk} className="w-full">
              Сохранить
            </Button>
          </div>
        ) : null}

        {type === "meal" ? (
          <div className="flex flex-col gap-4 pb-4">
            <Field label="Приём">
              <ChipRow>
                {(["breakfast", "dinner", "snack"] as MealSlot[]).map((s) => (
                  <Chip
                    key={s}
                    active={slot === s}
                    onClick={() => {
                      setSlot(s);
                      if (s === "breakfast") {
                        setFood("Курица, рис, морковь");
                        setKcal(395);
                      } else if (s === "dinner") {
                        setFood("Говядина, гречка, тыква");
                        setKcal(360);
                      }
                    }}
                  >
                    {slotLabel(s)}
                  </Chip>
                ))}
              </ChipRow>
            </Field>
            <Field label="Состав">
              <Input value={food} onChange={(e) => setFood(e.target.value)} />
            </Field>
            <Field label="Граммы">
              <ChipRow>
                {[250, 300, 350].map((g) => (
                  <Chip key={g} active={grams === g} onClick={() => setGrams(g)}>
                    {g} г
                  </Chip>
                ))}
              </ChipRow>
            </Field>
            <Field label="Съел">
              <ChipRow>
                {(["all", "most", "half", "little"] as Eaten[]).map((e) => (
                  <Chip key={e} active={eaten === e} onClick={() => setEaten(e)}>
                    {eatenLabel(e)}
                  </Chip>
                ))}
              </ChipRow>
            </Field>
            <Button size="lg" onClick={saveMeal} className="w-full">
              Сохранить
            </Button>
          </div>
        ) : null}

        {type === "water" ? (
          <div className="flex flex-col gap-3 pb-4">
            <p className="text-sm text-muted">Сколько налили в миску?</p>
            <div className="grid grid-cols-2 gap-2">
              {[100, 150, 200, 250].map((ml) => (
                <Button key={ml} variant="secondary" size="lg" onClick={() => saveWater(ml)}>
                  +{ml} мл
                </Button>
              ))}
            </div>
          </div>
        ) : null}

        {type === "weight" ? (
          <div className="flex flex-col gap-4 pb-4">
            <Field label="Килограммы">
              <Input
                inputMode="decimal"
                value={kgValue}
                onChange={(e) => setKgValue(e.target.value)}
              />
            </Field>
            <Field label="Заметка">
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Натощак, после прогулки…" />
            </Field>
            <Button size="lg" onClick={saveWeight} className="w-full">
              Сохранить
            </Button>
          </div>
        ) : null}

        {type === "mood" ? (
          <div className="flex flex-col gap-4 pb-4">
            <div className="grid grid-cols-5 gap-1.5">
              {(["great", "good", "ok", "low", "poor"] as Mood[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`rounded-lg px-1 py-3 text-center text-xs font-medium transition-colors duration-150 ${
                    mood === m ? "bg-sage text-sage-fg" : "bg-paper text-ink border border-line"
                  }`}
                >
                  {moodLabel(m)}
                </button>
              ))}
            </div>
            <Field label="Заметка">
              <Input value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
            <Button size="lg" onClick={saveMood} className="w-full">
              Сохранить
            </Button>
          </div>
        ) : null}

        {type === "play" ? (
          <div className="flex flex-col gap-4 pb-4">
            <Field label="Чем играли">
              <ChipRow>
                {["Мяч", "Перетяжки", "Жевание", "Поиск корма"].map((k) => (
                  <Chip key={k} active={kind === k} onClick={() => setKind(k)}>
                    {k}
                  </Chip>
                ))}
              </ChipRow>
            </Field>
            <Field label="Минуты">
              <ChipRow>
                {[10, 15, 20, 30].map((m) => (
                  <Chip key={m} active={playMin === m} onClick={() => setPlayMin(m)}>
                    {m}
                  </Chip>
                ))}
              </ChipRow>
            </Field>
            <Button size="lg" onClick={savePlay} className="w-full">
              Сохранить
            </Button>
          </div>
        ) : null}

        {type === "med" ? (
          <div className="flex flex-col gap-2 pb-4">
            {meds.map((med) => (
              <button
                key={med.id}
                type="button"
                onClick={() => saveMed(med.id)}
                className="flex items-center justify-between rounded-xl bg-paper px-4 py-3 text-left transition-transform duration-150 active:scale-[0.96]"
              >
                <span>
                  <span className="block text-sm font-medium">{med.name}</span>
                  <span className="text-xs text-muted">
                    {med.dosage}
                    {med.times ? ` · ${med.times.join(", ")}` : ` · ${cadenceLabel(med.cadence)}`}
                  </span>
                </span>
                <span className="text-sm font-medium text-sage">Отметить</span>
              </button>
            ))}
          </div>
        ) : null}

        {type === "note" ? (
          <div className="flex flex-col gap-4 pb-4">
            <Field label="Что заметили">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Сон, аппетит, настроение, странности…"
              />
            </Field>
            <Button size="lg" onClick={saveNote} className="w-full">
              Сохранить
            </Button>
          </div>
        ) : null}

        {type === "symptom" ? (
          <div className="flex flex-col gap-4 pb-4">
            <Field label="Симптом">
              <ChipRow>
                {["Мягкий стул", "Чешет ухо", "Вялость", "Хромота", "Кашель"].map((s) => (
                  <Chip key={s} active={symptom === s} onClick={() => setSymptom(s)}>
                    {s}
                  </Chip>
                ))}
              </ChipRow>
            </Field>
            <Field label="Сила">
              <ChipRow>
                {([1, 2, 3] as const).map((s) => (
                  <Chip key={s} active={severity === s} onClick={() => setSeverity(s)}>
                    {s}/3
                  </Chip>
                ))}
              </ChipRow>
            </Field>
            <Field label="Заметка">
              <Input value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
            <Button size="lg" onClick={saveSymptom} className="w-full">
              Сохранить
            </Button>
          </div>
        ) : null}
      </div>
    </Drawer>
  );
}
