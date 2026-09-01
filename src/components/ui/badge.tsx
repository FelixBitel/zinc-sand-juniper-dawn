import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "default",
  children,
}: {
  className?: string;
  tone?: "default" | "good" | "warn" | "muted";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "default" && "bg-sage-soft text-sage",
        tone === "good" && "bg-sage-soft text-sage",
        tone === "warn" && "bg-honey/15 text-honey",
        tone === "muted" && "bg-surface text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
