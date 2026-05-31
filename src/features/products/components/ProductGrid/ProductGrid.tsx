import { useCallback } from 'react';
import type { MouseEvent } from 'react';

import type { Product } from '@/features/products';
import { ProductCard } from '@/features/products/components/ProductCard';

import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: number, triggerElement: HTMLButtonElement) => void;
}

/** Resolves the card button from a bubbled grid click via `data-product-id`. */
function getProductCardFromEvent(
  event: MouseEvent<HTMLDivElement>,
): HTMLButtonElement | null {
  const target = event.target;
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLButtonElement>('[data-product-id]');
}

/** Responsive grid of product cards with a single delegated click handler. */
export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  const handleGridClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const card = getProductCardFromEvent(event);
      if (!card) {
        return;
      }

      const productId = Number(card.dataset.productId);
      if (!Number.isFinite(productId)) {
        return;
      }

      onProductClick(productId, card);
    },
    [onProductClick],
  );

  return (
    <div
      className={styles.grid}
      onClick={handleGridClick}
      role="presentation"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
