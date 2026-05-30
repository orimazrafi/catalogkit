import { Loader2, X } from 'lucide-react';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useProductDetail } from '@/features/products/hooks/useProductsQueries';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import styles from './ProductDetailDrawer.module.css';

interface ProductDetailDrawerProps {
  productId: number | null;
  onClose: () => void;
}

/** Slide-over panel showing extended details for the selected product. */
export function ProductDetailDrawer({
  productId,
  onClose,
}: ProductDetailDrawerProps) {
  const { data: product, isLoading, isError, error } =
    useProductDetail(productId);

  const isOpen = productId !== null;

  useEscapeKey(isOpen, onClose);

  return (
    <ErrorBoundary message="Unable to display product details.">
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : styles.backdropClosed}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : styles.drawerClosed}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        aria-hidden={!isOpen}
      >
        <header className={styles.header}>
          <h2 id="product-detail-title" className={styles.headerTitle}>
            Product details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close product details"
          >
            <X className={styles.closeIcon} />
          </button>
        </header>

        <div className={styles.content}>
          {isLoading && (
            <div className={styles.loading}>
              <Loader2 className={`${styles.loadingIcon} spin`} />
              <p className={styles.message}>Loading product…</p>
            </div>
          )}

          {isError && (
            <ErrorBanner
              size="small"
              message={error?.message ?? 'Failed to load product details.'}
            />
          )}

          {product && !isLoading && (
            <div className={styles.details}>
              <div className={styles.imageWrapper}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <dl className={styles.stats}>
                  <div className={styles.statCard}>
                    <dt className={styles.statLabel}>Price</dt>
                    <dd className={styles.statValuePrice}>
                      ${product.price.toFixed(2)}
                    </dd>
                  </div>
                  <div className={styles.statCard}>
                    <dt className={styles.statLabel}>Stock</dt>
                    <dd className={styles.statValueStock}>{product.stock}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </aside>
    </ErrorBoundary>
  );
}
