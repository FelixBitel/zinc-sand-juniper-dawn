import { eventSubtitle, eventTitle } from "@/lib/insights";
import { formatTime } from "@/lib/format";
import type { TimelineItem, TrackerData } from "@/lib/types";
import { EventIcon } from "./event-icon";

function eventPhoto(item: TimelineItem) {
  if (item.kind === "walk") return item.data.photo;
  if (item.kind === "note") return item.data.photo;
  return undefined;
}

export function EventRow({
  item,
  data,
  onClick,
}: {
  item: TimelineItem;
  data: TrackerData;
  onClick?: () => void;
}) {
  const photo = eventPhoto(item);
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-xl p-1 text-left transition-transform duration-150 active:scale-[0.96]"
    >
      <EventIcon kind={item.kind} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-medium text-ink">{eventTitle(item, data)}</p>
          <span className="tabular shrink-0 text-xs text-subtle">{formatTime(item.data.at)}</span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-sm text-muted">{eventSubtitle(item)}</p>
      </div>
      {photo ? (
        <img
          src={photo}
          alt=""
          className="size-12 shrink-0 rounded-md object-cover"
        />
      ) : null}
    </button>
  );
}
