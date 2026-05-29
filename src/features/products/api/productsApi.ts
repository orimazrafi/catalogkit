import { apiClient } from '../../../lib/apiClient';
import type { Product, ProductResponse } from '../types/product';

/** Centralized React Query cache keys for product-related queries. */
export const productKeys = {
  all: ['products'] as const,
  infiniteList: () => [...productKeys.all, 'infinite'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

/** Fetches a paginated slice of the product catalog. */
export async function getProducts(
  limit: number,
  skip: number,
): Promise<ProductResponse> {
  const { data } = await apiClient.get<ProductResponse>('/products', {
    params: { limit, skip },
  });
  return data;
}

/** Fetches a single product by id. */
export async function getProductDetail(id: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
}
