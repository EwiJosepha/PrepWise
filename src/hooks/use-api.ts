'use client'

import { useCallback, useState } from "react";

export function useAsyncCall<T extends (...args: any[]) => Promise<any>>({
  asyncFunction,
}: {
  asyncFunction: T;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const execute = useCallback(
    async (
      ...params: Parameters<T>
    ): Promise<Awaited<ReturnType<T>> | null> => {
      setLoading(true);
      setError('');

      try {
        const result = await asyncFunction?.(...params);
        return result;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { loading, error, execute };
}
