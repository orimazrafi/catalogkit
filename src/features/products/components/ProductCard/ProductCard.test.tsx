import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Product } from '@/features/products/types/product';
import { ProductCard } from './ProductCard';

const mockProduct: Product = {
  id: 1,
  title: 'iPhone 14',
  price: 999.99,
  category: 'smartphones',
  thumbnail: 'https://example.com/iphone.jpg',
  stock: 42,
};

describe('ProductCard', () => {
  it('renders product details', () => {
    render(<ProductCard product={mockProduct} onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: /iphone 14/i })).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
    expect(screen.getByText('$999.99')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'iPhone 14' })).toHaveAttribute(
      'src',
      mockProduct.thumbnail,
    );
  });

  it('calls onClick when the card is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ProductCard product={mockProduct} onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: /iphone 14/i }));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
