import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

interface UseWebContainerResult {
  webcontainer: WebContainer | undefined;
  error: Error | null;
  loading: boolean;
}

export function useWebContainer(): UseWebContainerResult {
  const [webcontainer, setWebcontainer] = useState<WebContainer>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootWebContainer() {
      try {
        setLoading(true);
        setError(null);

        if (typeof window !== "undefined" && !window.crossOriginIsolated) {
          console.warn(
            "Cross-origin isolation is not enabled. WebContainer might not work correctly."
          );
        }

        const webcontainerInstance = await WebContainer.boot();
        setWebcontainer(webcontainerInstance);
        setLoading(false);
      } catch (error) {
        console.error("Failed to boot WebContainer:", error);
        setError(error instanceof Error ? error : new Error(String(error)));
        setLoading(false);
      }
    }

    bootWebContainer();

    // Cleanup function
    return () => {
      // WebContainer doesn't have an explicit teardown method,
      // but we can reset our state
      setWebcontainer(undefined);
      setError(null);
    };
  }, []);

  return { webcontainer, error, loading };
}
