import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="px-4">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 className="font-display text-xl tracking-tight text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Paper({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const cls = cn("rounded-2xl bg-paper p-4", className);
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          cls,
          "w-full text-left transition-transform duration-150 active:scale-[0.96]",
        )}
      >
        {children}
      </button>
    );
  }
  return <div className={cls}>{children}</div>;
}
