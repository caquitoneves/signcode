'use client';

import { useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

/** Hook simples de fetch para client components, com estados de carregando/erro. */
export function useFetch<T>(fn: () => Promise<T>, deps: unknown[]): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, error: null, loading: true });

  useEffect(() => {
    let active = true;
    setState({ data: null, error: null, loading: true });
    fn()
      .then((data) => {
        if (active) setState({ data, error: null, loading: false });
      })
      .catch((err: unknown) => {
        if (active) {
          setState({
            data: null,
            error: err instanceof Error ? err.message : 'Ocorreu um erro',
            loading: false,
          });
        }
      });
    return () => {
      active = false;
    };
    // deps controladas pelo chamador (ex.: [slug])
  }, deps);

  return state;
}
