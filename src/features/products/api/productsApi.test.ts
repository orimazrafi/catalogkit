import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from '@/lib/apiClient';
import {
  getProductDetail,
  getProducts,
  productKeys,
} from './productsApi';

vi.mock('@/lib/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('productsApi', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockReset();
  });

  it('builds stable react query keys', () => {
    expect(productKeys.infiniteList()).toEqual(['products', 'infinite']);
    expect(productKeys.detail(5)).toEqual(['products', 'detail', 5]);
  });

  it('fetches paginated products', async () => {
    const mockResponse = {
      products: [],
      total: 0,
      skip: 0,
      limit: 12,
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse });

    const result = await getProducts(12, 0);

    expect(apiClient.get).toHaveBeenCalledWith('/products', {
      params: { limit: 12, skip: 0 },
    });
    expect(result).toEqual(mockResponse);
  });

  it('fetches a single product by id', async () => {
    const mockProduct = {
      id: 3,
      title: 'Test',
      price: 10,
      category: 'test',
      thumbnail: 'https://example.com/test.jpg',
      stock: 1,
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockProduct });

    const result = await getProductDetail(3);

    expect(apiClient.get).toHaveBeenCalledWith('/products/3');
    expect(result).toEqual(mockProduct);
  });
});
