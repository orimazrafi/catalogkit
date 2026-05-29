import type { Product, ProductResponse } from '../types/product';
import { apiClient } from './client';

export async function getProducts(
  limit: number,
  skip: number,
): Promise<ProductResponse> {
  const { data } = await apiClient.get<ProductResponse>('/products', {
    params: { limit, skip },
  });
  return data;
}

export async function getProductDetail(id: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
}
