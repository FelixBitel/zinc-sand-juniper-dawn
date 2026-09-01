import {
  Bone,
  Droplets,
  Footprints,
  Pill,
  Scale,
  Smile,
  Stethoscope,
  StickyNote,
  Utensils,
} from "lucide-react";
import type { EventKind, LogType } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS = {
  walk: Footprints,
  meal: Utensils,
  water: Droplets,
  weight: Scale,
  mood: Smile,
  symptom: Stethoscope,
  play: Bone,
  note: StickyNote,
  dose: Pill,
  med: Pill,
};

export function EventIcon({
  kind,
  className,
}: {
  kind: EventKind | LogType;
  className?: string;
}) {
  const Icon = ICONS[kind] ?? StickyNote;
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-lg bg-sage-soft text-sage",
        className,
      )}
    >
      <Icon className="size-4" strokeWidth={2} />
    </span>
  );
}
