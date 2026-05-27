import axios from 'axios';
import type { Product, ProductResponse } from '../types/product';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
});

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
