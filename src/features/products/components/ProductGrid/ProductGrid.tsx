import type { Product } from '@/features/products/types/product';
import { ProductCard } from '@/features/products/components/ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: number, triggerElement: HTMLButtonElement) => void;
}

/** Responsive grid of product cards. */
export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className={styles.grid}>
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
