import { useState } from "react";
import { WalkWeekChart, WeightChart } from "@/components/charts";
import { Paper, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { ageLabel, formatDateLong, kgLabel } from "@/lib/format";
import { latestWeight } from "@/lib/insights";
import { usePetStore } from "@/lib/store";

export function ProfileScreen() {
  const data = usePetStore();
  const setOwnerNote = usePetStore((s) => s.setOwnerNote);
  const resetDemo = usePetStore((s) => s.resetDemo);
  const [note, setNote] = useState(data.profile.ownerNote);
  const [confirm, setConfirm] = useState(false);
  const weight = latestWeight(data);
  const birthday = new Date(data.profile.birthday).getTime();

  const facts = [
    ["Порода", data.profile.breed],
    ["Статус", data.profile.status],
    ["Пол", data.profile.sex === "male" ? "Кобель" : "Сука"],
    ["Возраст", ageLabel(data.profile.birthday)],
    ["День рождения", formatDateLong(birthday)],
    ["Окрас", data.profile.color],
    ["Вес", weight ? kgLabel(weight.kg) : "—"],
    ["Норма ккал", String(data.profile.calorieTarget)],
    ["Корм", data.profile.food],
    ["Кастрация", data.profile.neutered ? "Да" : "Нет"],
    data.profile.clinic ? ["Клиника", data.profile.clinic] : null,
    data.profile.doctor ? ["Врач", data.profile.doctor] : null,
    data.profile.chip ? ["Чип", data.profile.chip] : null,
  ].filter((row): row is [string, string] => Boolean(row));

  return (
    <div className="flex flex-col gap-6 pb-8">
      <header className="px-4 pt-2">
        <p className="text-sm text-muted">Профиль</p>
        <h1 className="font-display text-3xl tracking-tight">{data.profile.name}</h1>
      </header>

      <div className="px-4">
        <img
          src="/archie/portrait.jpg"
          alt="Арчи"
          className="aspect-[4/5] w-full rounded-2xl object-cover object-center"
        />
        <p className="mt-3 font-display text-2xl tracking-tight">{data.profile.breed}</p>
        <p className="text-sm text-muted">
          {ageLabel(data.profile.birthday)} · цель {data.profile.targetMinKg}–{data.profile.targetMaxKg} кг
        </p>
      </div>

      <Section title="Вес">
        <Paper>
          <WeightChart data={data} />
        </Paper>
      </Section>

      <Section title="Активность">
        <Paper>
          <WalkWeekChart data={data} />
        </Paper>
      </Section>

      <Section title="Карточка">
        <Paper className="p-2">
          <dl>
            {facts.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-3 border-b border-line px-2 py-2.5 last:border-0"
              >
                <dt className="text-xs text-muted">{k}</dt>
                <dd className="text-right text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </Paper>
      </Section>

      <Section title="Заметка хозяина">
        <Paper>
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
          <Button
            className="mt-3 w-full"
            variant="secondary"
            onClick={() => setOwnerNote(note)}
          >
            Сохранить заметку
          </Button>
        </Paper>
      </Section>

      <div className="px-4">
        {confirm ? (
          <Paper>
            <p className="text-sm">Вернуть демо-данные Арчи и удалить ваши записи на этом устройстве?</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="secondary" onClick={() => setConfirm(false)}>
                Отмена
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  resetDemo();
                  setNote(usePetStore.getState().profile.ownerNote);
                  setConfirm(false);
                }}
              >
                Сбросить
              </Button>
            </div>
          </Paper>
        ) : (
          <Button variant="ghost" className="w-full text-muted" onClick={() => setConfirm(true)}>
            Сбросить демо-данные
          </Button>
        )}
      </div>
    </div>
  );
}
