import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getProductDetail, getProducts } from '../api/productsApi';
import { productKeys } from '../lib/productKeys';
import type { Product, ProductResponse } from '../types/product';

const PRODUCTS_PAGE_SIZE = 12;
const PRODUCT_DETAIL_STALE_TIME_MS = 5 * 60 * 1000;

/** Next API `skip` offset, or undefined when every product has been loaded. */
function getNextProductsSkip(page: ProductResponse): number | undefined {
  const productsLoadedSoFar = page.skip + page.limit;
  const hasMoreProducts = productsLoadedSoFar < page.total;
  return hasMoreProducts ? productsLoadedSoFar : undefined;
}

/**
 * Manages infinite products pagination and caches fetched pages.
 */
export function useInfiniteProducts() {
  return useInfiniteQuery<ProductResponse, Error>({
    queryKey: productKeys.infiniteList(),
    initialPageParam: 0,
    queryFn: ({ pageParam: skipOffset }) =>
      getProducts(PRODUCTS_PAGE_SIZE, skipOffset as number),
    getNextPageParam: getNextProductsSkip,
  });
}

/**
 * Fetches and caches details for a selected product id.
 */
export function useProductDetail(id: number | null) {
  return useQuery<Product, Error>({
    queryKey: id !== null ? productKeys.detail(id) : productKeys.details(),
    queryFn: async () => {
      if (id === null) {
        throw new Error('Product id is required');
      }
      return getProductDetail(id);
    },
    enabled: id !== null,
    staleTime: PRODUCT_DETAIL_STALE_TIME_MS,
  });
}
