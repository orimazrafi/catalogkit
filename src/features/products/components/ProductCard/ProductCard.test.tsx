import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockCatalogProduct } from '@/features/products/api/__mocks__';

import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product details', () => {
    render(<ProductCard product={mockCatalogProduct} />);

    expect(screen.getByRole('button', { name: /iphone 14/i })).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
    expect(screen.getByText('$999.99')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'iPhone 14' })).toHaveAttribute(
      'src',
      mockCatalogProduct.thumbnail,
    );
  });

  it('exposes the product id for grid-level event delegation', () => {
    render(<ProductCard product={mockCatalogProduct} />);

    expect(screen.getByRole('button', { name: /iphone 14/i })).toHaveAttribute(
      'data-product-id',
      String(mockCatalogProduct.id),
    );
  });
});
