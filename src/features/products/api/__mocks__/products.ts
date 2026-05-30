import type { Product, ProductResponse } from '@/features/products';

/** Product card fixture for component tests. */
export const mockCatalogProduct: Product = {
  id: 1,
  title: 'iPhone 14',
  price: 999.99,
  category: 'smartphones',
  thumbnail: 'https://example.com/iphone.jpg',
  stock: 42,
};

/** Grid fixtures for component tests. */
export const mockCatalogProducts: Product[] = [
  {
    id: 1,
    title: 'Phone',
    price: 500,
    category: 'smartphones',
    thumbnail: 'https://example.com/phone.jpg',
    stock: 10,
  },
  {
    id: 2,
    title: 'Laptop',
    price: 1200,
    category: 'laptops',
    thumbnail: 'https://example.com/laptop.jpg',
    stock: 5,
  },
];

/** Single product fixture for API tests. */
export const mockProduct: Product = {
  id: 3,
  title: 'Test',
  price: 10,
  category: 'test',
  thumbnail: 'https://example.com/test.jpg',
  stock: 1,
};

/** Empty paginated products response fixture. */
export const mockProductListResponse: ProductResponse = {
  products: [],
  total: 0,
  skip: 0,
  limit: 12,
};
