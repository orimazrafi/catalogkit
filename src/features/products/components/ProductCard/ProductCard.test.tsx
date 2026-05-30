import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mockCatalogProduct } from '@/features/products/api/__mocks__';

import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product details', () => {
    render(<ProductCard product={mockCatalogProduct} onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: /iphone 14/i })).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
    expect(screen.getByText('$999.99')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'iPhone 14' })).toHaveAttribute(
      'src',
      mockCatalogProduct.thumbnail,
    );
  });

  it('calls onClick when the card is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ProductCard product={mockCatalogProduct} onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: /iphone 14/i }));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
