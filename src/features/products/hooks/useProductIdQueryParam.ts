import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { withUpdatedSearchParam } from '../../../lib/searchParams';

function parseProductId(params: URLSearchParams): number | null {
  const productIdParam = params.get('productId');
  if (productIdParam === null) {
    return null;
  }

  const parsedId = Number(productIdParam);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

/**
 * Reads and updates the selected product id from URL query params.
 */
export function useProductIdQueryParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedProductId = useMemo(
    () => parseProductId(searchParams),
    [searchParams],
  );

  const setSelectedProductId = useCallback(
    (productId: number) => {
      const nextSearchParams = withUpdatedSearchParam(
        searchParams,
        'productId',
        String(productId),
      );
      setSearchParams(nextSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const clearSelectedProductId = useCallback(() => {
    const nextSearchParams = withUpdatedSearchParam(
      searchParams,
      'productId',
      null,
    );
    setSearchParams(nextSearchParams);
  }, [searchParams, setSearchParams]);

  return {
    selectedProductId,
    setSelectedProductId,
    clearSelectedProductId,
  };
}
