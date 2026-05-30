import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from '@/lib/apiClient';
import {
  mockProduct,
  mockProductListResponse,
} from './__mocks__';
import {
  getProductDetail,
  getProducts,
  productKeys,
} from './productsApi';

vi.mock('@/lib/apiClient', () => import('./__mocks__/apiClient'));

describe('productsApi', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockReset();
  });

  it('builds stable react query keys', () => {
    expect(productKeys.infiniteList()).toEqual(['products', 'infinite']);
    expect(productKeys.detail(5)).toEqual(['products', 'detail', 5]);
  });

  it('fetches paginated products', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: mockProductListResponse,
    });

    const result = await getProducts(12, 0);

    expect(apiClient.get).toHaveBeenCalledWith('/products', {
      params: { limit: 12, skip: 0 },
    });
    expect(result).toEqual(mockProductListResponse);
  });

  it('fetches a single product by id', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockProduct });

    const result = await getProductDetail(3);

    expect(apiClient.get).toHaveBeenCalledWith('/products/3');
    expect(result).toEqual(mockProduct);
  });
});
