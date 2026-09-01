import { useMemo, useState } from "react";
import { Chip, ChipRow } from "@/components/chips";
import { WalkWeekChart } from "@/components/charts";
import { EventRow } from "@/components/event-row";
import { Paper, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerHeader } from "@/components/ui/drawer";
import { eventSubtitle, eventTitle, collectEvents, groupByDay } from "@/lib/insights";
import { formatDateLong, formatTime } from "@/lib/format";
import { usePetStore } from "@/lib/store";
import type { JournalFilter, TimelineItem } from "@/lib/types";

const FILTERS: { id: JournalFilter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "activity", label: "Активность" },
  { id: "food", label: "Еда" },
  { id: "health", label: "Здоровье" },
  { id: "care", label: "Лекарства" },
];

export function JournalScreen({ onLog }: { onLog: () => void }) {
  const data = usePetStore();
  const [filter, setFilter] = useState<JournalFilter>("all");
  const [selected, setSelected] = useState<TimelineItem | null>(null);
  const events = useMemo(() => collectEvents(data, filter), [data, filter]);
  const groups = useMemo(() => groupByDay(events), [events]);
  const removeEvent = usePetStore((s) => s.removeEvent);

  const photo =
    selected?.kind === "walk"
      ? selected.data.photo
      : selected?.kind === "note"
        ? selected.data.photo
        : undefined;

  return (
    <div className="flex flex-col gap-5 pb-8">
      <header className="px-4 pt-2">
        <p className="text-sm text-muted">История</p>
        <h1 className="font-display text-3xl tracking-tight">Журнал</h1>
      </header>

      <div className="px-4">
        <ChipRow>
          {FILTERS.map((f) => (
            <Chip key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </Chip>
          ))}
        </ChipRow>
      </div>

      {filter === "all" || filter === "activity" ? (
        <Section title="Прогулки за неделю">
          <Paper>
            <WalkWeekChart data={data} />
          </Paper>
        </Section>
      ) : null}

      {groups.length === 0 ? (
        <div className="px-4">
          <Paper className="py-10 text-center">
            <p className="font-display text-xl">Пока пусто</p>
            <p className="mt-1 text-sm text-muted">Добавьте первую запись об Арчи.</p>
            <Button className="mt-4" onClick={onLog}>
              Новая запись
            </Button>
          </Paper>
        </div>
      ) : (
        groups.map((group) => (
          <Section key={group.at} title={group.day}>
            <Paper className="flex flex-col gap-1 p-2">
              {group.items.map((item) => (
                <EventRow
                  key={`${item.kind}-${item.data.id}`}
                  item={item}
                  data={data}
                  onClick={() => setSelected(item)}
                />
              ))}
            </Paper>
          </Section>
        ))
      )}

      <Drawer open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        {selected ? (
          <>
            <DrawerHeader
              title={eventTitle(selected, data)}
              subtitle={`${formatDateLong(selected.data.at)} · ${formatTime(selected.data.at)}`}
            />
            <div className="sheet-scroll px-5 pb-8">
              <p className="text-sm leading-relaxed text-ink">{eventSubtitle(selected)}</p>
              {photo ? (
                <img
                  src={photo}
                  alt=""
                  className="mt-4 w-full rounded-xl object-cover"
                />
              ) : null}
              <Button
                variant="danger"
                className="mt-6 w-full"
                onClick={() => {
                  removeEvent(selected.kind, selected.data.id);
                  setSelected(null);
                }}
              >
                Удалить запись
              </Button>
            </div>
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
