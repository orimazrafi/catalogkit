import type { Product } from '@/features/products';

import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

/** Clickable product summary card for the catalog grid. */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <button
      type="button"
      data-product-id={product.id}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </button>
  );
}
