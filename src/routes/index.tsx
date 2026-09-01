import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArchieApp } from "@/components/app-shell";
import { usePetStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useEffect(() => {
    try {
      void usePetStore.persist.rehydrate();
    } catch {
      /* ignore */
    }
    usePetStore.setState({ hydrated: true });
  }, []);

  return <ArchieApp />;
}
