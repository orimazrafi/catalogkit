import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mockCatalogProducts } from '@/features/products/api/__mocks__';

import { ProductGrid } from './ProductGrid';

describe('ProductGrid', () => {
  it('renders a card for each product', () => {
    render(<ProductGrid products={mockCatalogProducts} onProductClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /laptop/i })).toBeInTheDocument();
  });

  it('passes the clicked product id to onProductClick', async () => {
    const user = userEvent.setup();
    const handleProductClick = vi.fn();

    render(
      <ProductGrid
        products={mockCatalogProducts}
        onProductClick={handleProductClick}
      />,
    );
    await user.click(screen.getByRole('button', { name: /laptop/i }));

    expect(handleProductClick).toHaveBeenCalledOnce();
    expect(handleProductClick.mock.calls[0]?.[0]).toBe(2);
    expect(handleProductClick.mock.calls[0]?.[1]).toBeInstanceOf(
      HTMLButtonElement,
    );
  });
});
