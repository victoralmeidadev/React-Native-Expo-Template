import { useCallback, useEffect, useState, type DependencyList } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: () => Promise<void>;
  reset: () => void;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  deps?: DependencyList
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await apiCall();
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setState({ data: null, loading: false, error });
      }
    },
    // eslint-disable-next-line react-hooks/use-memo
    deps ?? [apiCall]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

interface UseFetchReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>;
}

export function useFetch<T>(
  apiCall: () => Promise<T>,
  deps?: DependencyList
): UseFetchReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const refetch = useCallback(
    async () => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const result = await apiCall();
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setState(prev => ({ ...prev, loading: false, error }));
      }
    },
    // eslint-disable-next-line react-hooks/use-memo
    deps ?? [apiCall]
  );

  // Auto-fetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    ...state,
    refetch,
  };
}
