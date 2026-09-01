import { House, NotebookPen, Plus, Utensils } from "lucide-react";
import { useState } from "react";
import { LogSheet } from "@/components/log-sheet";
import { JournalScreen } from "@/components/screens/journal-screen";
import { NutritionScreen } from "@/components/screens/nutrition-screen";
import { ProfileScreen } from "@/components/screens/profile-screen";
import { TodayScreen } from "@/components/screens/today-screen";
import type { LogType, MealSlot, Tab } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS: { id: Tab; label: string; icon?: typeof House }[] = [
  { id: "today", label: "Сегодня", icon: House },
  { id: "journal", label: "Журнал", icon: NotebookPen },
  { id: "nutrition", label: "Питание", icon: Utensils },
  { id: "archie", label: "Арчи" },
];

export function ArchieApp() {
  const [tab, setTab] = useState<Tab>("today");
  const [logOpen, setLogOpen] = useState(false);
  const [logType, setLogType] = useState<LogType | null>(null);
  const [mealSlot, setMealSlot] = useState<MealSlot | undefined>();

  function openLog(type?: LogType, extra?: { slot?: MealSlot }) {
    setLogType(type ?? null);
    setMealSlot(extra?.slot);
    setLogOpen(true);
  }

  return (
    <div className="flex min-h-dvh w-full justify-center bg-canvas">
      <div className="relative flex h-dvh w-full max-w-md flex-col bg-bg">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-20 pt-[max(0.75rem,env(safe-area-inset-top))]">
          {tab === "today" ? (
            <TodayScreen
              onLog={openLog}
              onOpenCare={() => setTab("nutrition")}
              onOpenJournal={() => setTab("journal")}
            />
          ) : null}
          {tab === "journal" ? <JournalScreen onLog={() => openLog()} /> : null}
          {tab === "nutrition" ? <NutritionScreen /> : null}
          {tab === "archie" ? <ProfileScreen /> : null}
        </div>

        <button
          type="button"
          onClick={() => openLog()}
          aria-label="Новая запись"
          className="absolute right-4 z-30 flex size-14 items-center justify-center rounded-full bg-sage text-sage-fg shadow-lg transition-transform duration-150 active:scale-[0.96] bottom-24"
        >
          <Plus className="size-6" strokeWidth={2} />
        </button>

        <nav
          className="z-20 shrink-0 border-t border-line bg-bg pb-[env(safe-area-inset-bottom)]"
          aria-label="Разделы"
        >
          <div className="grid grid-cols-4 px-2 pt-1">
            {TABS.map((t) => {
              const active = tab === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-150",
                    active ? "text-sage" : "text-subtle",
                  )}
                >
                  {Icon ? (
                    <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                  ) : (
                    <img
                      src="/archie/portrait.jpg"
                      alt=""
                      className={cn(
                        "size-6 rounded-full object-cover object-center",
                        active && "ring-2 ring-sage ring-offset-1 ring-offset-bg",
                      )}
                    />
                  )}
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>

        <LogSheet
          open={logOpen}
          onOpenChange={setLogOpen}
          initialType={logType}
          mealSlot={mealSlot}
        />
      </div>
    </div>
  );
}