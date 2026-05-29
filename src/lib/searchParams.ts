/**
 * Returns a cloned URLSearchParams with one key updated or removed.
 */
export function withUpdatedSearchParam(
  params: URLSearchParams,
  key: string,
  value: string | null,
): URLSearchParams {
  const nextParams = new URLSearchParams(params);
  if (value === null) {
    nextParams.delete(key);
    return nextParams;
  }

  nextParams.set(key, value);
  return nextParams;
}
