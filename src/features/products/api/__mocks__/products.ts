import type { Product, ProductResponse } from '@/features/products/types/product';

export const mockProduct: Product = {
  id: 3,
  title: 'Test',
  price: 10,
  category: 'test',
  thumbnail: 'https://example.com/test.jpg',
  stock: 1,
};

export const mockProductListResponse: ProductResponse = {
  products: [],
  total: 0,
  skip: 0,
  limit: 12,
};
