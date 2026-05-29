import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { withUpdatedSearchParam } from '../lib/searchParams';

/** Parses a URL search param as a positive integer, or null if missing/invalid. */
function parsePositiveIntParam(
  params: URLSearchParams,
  paramKey: string,
): number | null {
  const rawValue = params.get(paramKey);
  if (rawValue === null) {
    return null;
  }

  const parsed = Number(rawValue);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

/**
 * Reads and updates a positive integer from URL query params.
 */
export function useQueryParam(paramKey: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(
    () => parsePositiveIntParam(searchParams, paramKey),
    [searchParams, paramKey],
  );

  const setValue = useCallback(
    (nextValue: number) => {
      const nextSearchParams = withUpdatedSearchParam(
        searchParams,
        paramKey,
        String(nextValue),
      );
      setSearchParams(nextSearchParams);
    },
    [paramKey, searchParams, setSearchParams],
  );

  const clearValue = useCallback(() => {
    const nextSearchParams = withUpdatedSearchParam(
      searchParams,
      paramKey,
      null,
    );
    setSearchParams(nextSearchParams);
  }, [paramKey, searchParams, setSearchParams]);

  return { value, setValue, clearValue };
}
