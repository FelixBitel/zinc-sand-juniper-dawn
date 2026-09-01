import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function WellnessRing({
  value,
  size = 112,
  stroke = 6,
  children,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  children?: ReactNode;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(100, Math.max(0, value)) / 100);
  const color =
    value >= 80 ? "var(--color-sage)" : value >= 60 ? "var(--color-honey)" : "var(--color-clay)";

  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div
        className="absolute overflow-hidden rounded-full bg-surface"
        style={{ inset: stroke + 4 }}
      >
        {children}
      </div>
    </div>
  );
}
