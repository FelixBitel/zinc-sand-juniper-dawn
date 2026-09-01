import { Check, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EventRow } from "@/components/event-row";
import { Paper, Section } from "@/components/layout";
import { WellnessRing } from "@/components/wellness-ring";
import { EventIcon } from "@/components/event-icon";
import {
  ageLabel,
  formatDayShort,
  kgLabel,
  relativeDue,
  startDay,
} from "@/lib/format";
import {
  collectEvents,
  computeInsights,
  computeWellness,
  latestWeight,
  todayKcal,
  todayMeals,
  todayWalks,
  todayWaterMl,
  todaySchedule,
  weekDays,
  wellnessCaption,
} from "@/lib/insights";
import { usePetStore } from "@/lib/store";
import type { LogType, MealSlot } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TodayScreen({
  onLog,
  onOpenCare,
  onOpenJournal,
}: {
  onLog: (type?: LogType, extra?: { slot?: MealSlot }) => void;
  onOpenCare: () => void;
  onOpenJournal: () => void;
}) {
  const data = usePetStore();
  const score = computeWellness(data);
  const weight = latestWeight(data);
  const walks = todayWalks(data);
  const water = todayWaterMl(data);
  const meals = todayMeals(data);
  const kcal = todayKcal(data);
  const schedule = todaySchedule(data);
  const insights = computeInsights(data);
  const recent = collectEvents(data).slice(0, 4);
  const days = weekDays();
  const today = startDay();
  const weekLabels = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const upcomingVisit = data.visits.find((v) => v.upcoming);
  const nextMed = [...data.meds].sort((a, b) => a.nextDue - b.nextDue)[0];

  return (
    <div className="stagger flex flex-col gap-6 pb-8">
      <header className="flex items-end justify-between px-4 pt-2">
        <div>
          <p className="font-display text-sm italic text-sage">Archie</p>
          <h1 className="font-display text-3xl tracking-tight text-ink">Сегодня</h1>
        </div>
        <p className="text-sm text-muted">{formatDayShort(Date.now())}</p>
      </header>

      <div className="px-4">
        <Paper className="flex items-center gap-4">
          <WellnessRing value={score} size={108}>
            <img
              src="/archie/portrait.jpg"
              alt="Арчи"
              className="size-full object-cover object-center"
            />
          </WellnessRing>
          <div className="min-w-0">
            <h2 className="font-display text-2xl tracking-tight">{data.profile.name}</h2>
            <p className="mt-0.5 truncate text-sm text-muted">
              {data.profile.breed} · {ageLabel(data.profile.birthday)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Badge>{wellnessCaption(score)}</Badge>
              <span className="tabular text-xs text-subtle">{score}/100</span>
            </div>
          </div>
        </Paper>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            const active = d === today;
            const has = data.walks.some((w) => startDay(w.at) === d);
            return (
              <div
                key={d}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg py-2",
                  active && "bg-paper",
                )}
              >
                <span className="text-xs font-medium text-subtle">
                  {weekLabels[i]}
                </span>
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    has ? "bg-sage" : "bg-line",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-4">
        <Paper>
          <p className="text-xs font-medium text-muted">Вес</p>
          <p className="mt-1 font-display text-2xl tabular tracking-tight">
            {weight ? kgLabel(weight.kg) : "—"}
          </p>
        </Paper>
        <Paper>
          <p className="text-xs font-medium text-muted">Прогулки</p>
          <p className="mt-1 font-display text-2xl tabular tracking-tight">
            {walks.length}/{data.profile.walkTargetPerDay}
          </p>
        </Paper>
        <Paper>
          <p className="text-xs font-medium text-muted">Калории</p>
          <p className="mt-1 font-display text-2xl tabular tracking-tight">
            {kcal}/{data.profile.calorieTarget}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-sage"
              style={{
                width: `${Math.min(100, (kcal / Math.max(1, data.profile.calorieTarget)) * 100)}%`,
              }}
            />
          </div>
        </Paper>
        <Paper>
          <p className="text-xs font-medium text-muted">Вода</p>
          <p className="mt-1 font-display text-2xl tabular tracking-tight">{water} мл</p>
          <p className="mt-0.5 text-xs text-subtle">{meals.length} приёма еды</p>
        </Paper>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-4 gap-2">
          {(
            [
              ["walk", "Прогулка"],
              ["meal", "Еда"],
              ["water", "Вода"],
              ["weight", "Вес"],
            ] as const
          ).map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => onLog(type)}
              className="flex flex-col items-center gap-2 rounded-2xl bg-paper py-3 transition-transform duration-150 active:scale-[0.96]"
            >
              <EventIcon kind={type} className="size-9" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <Section title="Сегодня">
        <Paper className="flex flex-col gap-1 p-2 pr-16">
          {schedule.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.log === "med" && item.medId) {
                  data.logMed(item.medId);
                  return;
                }
                if (item.log === "meal") onLog("meal", { slot: item.slot });
                else if (item.log) onLog(item.log);
              }}
              className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-transform duration-150 active:scale-[0.96]"
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full",
                  item.done ? "bg-sage text-sage-fg" : "border border-line bg-surface text-subtle",
                )}
              >
                {item.done ? <Check className="size-3.5" strokeWidth={2.5} /> : <Plus className="size-3.5" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block text-sm font-medium", item.done && "text-muted")}>
                  {item.title}
                </span>
              </span>
              <span className="tabular text-xs text-subtle">{item.time}</span>
            </button>
          ))}
        </Paper>
      </Section>

      {insights[0] ? (
        <Section title="Сводка">
          <div className="flex flex-col gap-2">
            {insights.map((ins) => (
              <Paper key={ins.id}>
                <p className="text-sm leading-relaxed text-ink">{ins.text}</p>
              </Paper>
            ))}
          </div>
        </Section>
      ) : null}

      <Section
        title="Ближайшее"
        action={
          <button type="button" onClick={onOpenCare} className="text-sm font-medium text-sage">
            Питание
          </button>
        }
      >
        <div className="flex flex-col gap-2">
          {nextMed ? (
            <Paper onClick={onOpenCare}>
              <p className="text-xs font-medium text-muted">Лекарство</p>
              <p className="mt-1 text-sm font-medium">{nextMed.name}</p>
              <p className="text-xs text-subtle">{relativeDue(nextMed.nextDue)}</p>
            </Paper>
          ) : null}
          {upcomingVisit ? (
            <Paper onClick={onOpenCare}>
              <p className="text-xs font-medium text-muted">Визит</p>
              <p className="mt-1 text-sm font-medium">{upcomingVisit.reason}</p>
              <p className="text-xs text-subtle">
                {formatDayShort(upcomingVisit.at)} · {data.profile.clinic}
              </p>
            </Paper>
          ) : null}
        </div>
      </Section>

      <Section
        title="Недавнее"
        action={
          <button type="button" onClick={onOpenJournal} className="text-sm font-medium text-sage">
            Журнал
          </button>
        }
      >
        <Paper className="flex flex-col gap-1 p-2">
          {recent.map((item) => (
            <EventRow
              key={`${item.kind}-${item.data.id}`}
              item={item}
              data={data}
              onClick={onOpenJournal}
            />
          ))}
        </Paper>
      </Section>
    </div>
  );
}
