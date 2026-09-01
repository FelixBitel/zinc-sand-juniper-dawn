import { differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Paper, Section } from "@/components/layout";
import {
  cadenceLabel,
  formatDateLong,
  formatDayShort,
  relativeDue,
} from "@/lib/format";
import { usePetStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CareScreen() {
  const data = usePetStore();
  const logMed = usePetStore((s) => s.logMed);
  const groomingNext = data.profile.groomingLast + data.profile.groomingEveryDays * 86400000;
  const upcoming = data.visits.filter((v) => v.upcoming);
  const past = data.visits.filter((v) => !v.upcoming);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <header className="px-4 pt-2">
        <p className="text-sm text-muted">Напоминания и клиника</p>
        <h1 className="font-display text-3xl tracking-tight">Уход</h1>
      </header>

      {data.profile.allergies.length > 0 ? (
        <div className="px-4">
          <Paper className="border border-honey/30">
            <p className="text-xs font-medium text-honey">Аллергия</p>
            <p className="mt-1 text-sm">
              Не давать: {data.profile.allergies.join(", ")}. Снеки только из списка безопасных.
            </p>
          </Paper>
        </div>
      ) : null}

      <Section title="Лекарства">
        <div className="flex flex-col gap-2">
          {data.meds.map((med) => {
            const days = differenceInCalendarDays(new Date(med.nextDue), new Date());
            const overdue = days < 0;
            const soon = days <= 3;
            return (
              <Paper key={med.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{med.name}</p>
                    <Badge tone={overdue ? "warn" : soon ? "warn" : "muted"}>
                      {relativeDue(med.nextDue)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {med.dosage} · {cadenceLabel(med.cadence)}
                  </p>
                  {med.notes ? <p className="mt-1 text-xs text-subtle">{med.notes}</p> : null}
                </div>
                <Button
                  size="sm"
                  variant={overdue ? "primary" : "secondary"}
                  onClick={() => {
                    logMed(med.id);
                    toast(`${med.name}: отмечено`);
                  }}
                >
                  Принял
                </Button>
              </Paper>
            );
          })}
        </div>
      </Section>

      <Section title="Вакцинация">
        <Paper className="flex flex-col gap-3">
          {data.vaccines.map((v) => {
            const days = differenceInCalendarDays(new Date(v.nextAt), new Date());
            return (
              <div key={v.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{v.name}</p>
                  <p className="text-xs text-muted">последняя {formatDayShort(v.lastAt)}</p>
                </div>
                <span className={cn("text-xs font-medium", days <= 21 ? "text-honey" : "text-subtle")}>
                  {relativeDue(v.nextAt)}
                </span>
              </div>
            );
          })}
        </Paper>
      </Section>

      <Section title="Клиника">
        <div className="flex flex-col gap-2">
          {upcoming.map((v) => (
            <Paper key={v.id}>
              <Badge tone="warn">Предстоит</Badge>
              <p className="mt-2 font-display text-xl tracking-tight">{formatDateLong(v.at)}</p>
              <p className="mt-1 text-sm">{v.reason}</p>
              <p className="mt-2 text-xs text-muted">
                {data.profile.clinic} · {data.profile.doctor}
              </p>
              {v.notes ? <p className="mt-2 text-sm text-muted">{v.notes}</p> : null}
            </Paper>
          ))}
          {past.slice(0, 1).map((v) => (
            <Paper key={v.id}>
              <p className="text-xs font-medium text-muted">Последний визит</p>
              <p className="mt-1 text-sm font-medium">{formatDateLong(v.at)}</p>
              <p className="text-sm text-muted">{v.reason}</p>
              {v.notes ? <p className="mt-1 text-xs text-subtle">{v.notes}</p> : null}
            </Paper>
          ))}
        </div>
      </Section>

      <Section title="Груминг">
        <Paper>
          <p className="text-sm">
            Последний: {formatDayShort(data.profile.groomingLast)}
          </p>
          <p className="mt-1 text-sm text-muted">Следующий {relativeDue(groomingNext)}</p>
        </Paper>
      </Section>

      <Section title="Корм">
        <Paper>
          <p className="text-sm font-medium">{data.profile.food}</p>
          <p className="mt-1 text-xs text-muted">Два приёма по 120 г, лакомства отдельно.</p>
        </Paper>
      </Section>
    </div>
  );
}
