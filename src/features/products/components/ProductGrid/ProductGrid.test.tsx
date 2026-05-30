import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Product } from '@/features/products/types/product';
import { ProductGrid } from './ProductGrid';

const mockProducts: Product[] = [
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

describe('ProductGrid', () => {
  it('renders a card for each product', () => {
    render(<ProductGrid products={mockProducts} onProductClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /laptop/i })).toBeInTheDocument();
  });

  it('passes the clicked product id to onProductClick', async () => {
    const user = userEvent.setup();
    const handleProductClick = vi.fn();

    render(
      <ProductGrid products={mockProducts} onProductClick={handleProductClick} />,
    );
    await user.click(screen.getByRole('button', { name: /laptop/i }));

    expect(handleProductClick).toHaveBeenCalledOnce();
    expect(handleProductClick.mock.calls[0]?.[0]).toBe(2);
    expect(handleProductClick.mock.calls[0]?.[1]).toBeInstanceOf(
      HTMLButtonElement,
    );
  });
});
