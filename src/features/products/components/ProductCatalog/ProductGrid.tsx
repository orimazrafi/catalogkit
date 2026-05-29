import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: number, triggerElement: HTMLButtonElement) => void;
}

/** Responsive grid of product cards. */
export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={(event) => onProductClick(product.id, event.currentTarget)}
        />
      ))}
    </div>
  );
}
