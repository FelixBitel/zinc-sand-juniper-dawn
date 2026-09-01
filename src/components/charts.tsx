import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDayShort, startDay } from "@/lib/format";
import { weekDays, walkMinutesBetween } from "@/lib/insights";
import type { TrackerData } from "@/lib/types";

function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-paper px-2.5 py-1.5 text-xs text-ink">
      <p className="text-muted">{label}</p>
      <p className="tabular font-medium">{payload[0]?.value}</p>
    </div>
  );
}

export function WeightChart({ data }: { data: TrackerData }) {
  const points = [...data.weights]
    .sort((a, b) => a.at - b.at)
    .slice(-12)
    .map((w) => ({
      label: formatDayShort(w.at),
      kg: w.kg,
    }));

  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={["dataMin - 0.3", "dataMax + 0.3"]}
            width={36}
            tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<ChartTip />} />
          <Area
            type="monotone"
            dataKey="kg"
            stroke="var(--color-sage)"
            fill="var(--color-sage-soft)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WalkWeekChart({ data }: { data: TrackerData }) {
  const days = weekDays();
  const points = days.map((d) => ({
    label: formatDayShort(d).replace(".", ""),
    min: walkMinutesBetween(data, d, d + 86400000 - 1),
    today: startDay() === d,
  }));

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={<ChartTip />} />
          <Bar dataKey="min" fill="var(--color-sage)" radius={[6, 6, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
