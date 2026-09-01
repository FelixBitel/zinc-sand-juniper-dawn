import * as React from "react";
import { Drawer as Vaul } from "vaul";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Vaul.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Vaul.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] w-full max-w-md flex-col rounded-t-3xl bg-bg outline-none",
          )}
        >
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-ring" />
          <Vaul.Description className="sr-only">Панель приложения Archie</Vaul.Description>
          {children}
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
}

export function DrawerHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <div className="px-5 pb-3 pt-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mb-2 text-sm font-medium text-sage"
        >
          Назад
        </button>
      ) : null}
      <Vaul.Title className="font-display text-2xl tracking-tight text-ink">
        {title}
      </Vaul.Title>
      {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
    </div>
  );
}
