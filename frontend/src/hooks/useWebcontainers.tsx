import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";


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
  console.log('Cross-Origin Isolated:', window.crossOriginIsolated);
  console.log('SharedArrayBuffer available:', typeof SharedArrayBuffer !== 'undefined');
  // ... rest of the code
}, []);

  useEffect(() => {
    async function bootWebContainer() {
      try {
        setLoading(true);
        setError(null);

        // Check if the browser supports SharedArrayBuffer and is cross-origin isolated
        if (typeof window !== 'undefined' && !window.crossOriginIsolated) {
          console.warn('Cross-origin isolation is not enabled. WebContainer might not work correctly.');
        }

        const webcontainerInstance = await WebContainer.boot();
        setWebcontainer(webcontainerInstance);
        setLoading(false);
      } catch (err) {
        console.error('Failed to boot WebContainer:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
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