import { useCallback, useMemo, useRef } from 'react';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import { LoadingState } from '@/components/shared/LoadingState';
import { ProductCatalogContent } from '@/features/products/components/ProductCatalogContent';
import { ProductDetailDrawer } from '@/features/products/components/ProductDetailDrawer';
import { useInfiniteProducts } from '@/features/products/hooks/useProductsQueries';
import { useQueryParam } from '@/hooks/useQueryParam';
import styles from './ProductCatalog.module.css';

/** Catalog container: fetches products, coordinates grid, scroll, and drawer. */
export function ProductCatalog() {
  const {
    value: selectedProductId,
    setValue: setSelectedProductId,
    clearValue: clearSelectedProductId,
  } = useQueryParam('productId');
  const lastFocusedProductRef = useRef<HTMLButtonElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts();

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data],
  );

  const canLoadMorePages = Boolean(hasNextPage) && !isFetchingNextPage;

  const handleLoadMore = useCallback(() => {
    if (canLoadMorePages) {
      void fetchNextPage();
    }
  }, [canLoadMorePages, fetchNextPage]);

  const handleProductClick = useCallback(
    (productId: number, triggerElement: HTMLButtonElement) => {
      lastFocusedProductRef.current = triggerElement;
      setSelectedProductId(productId);
    },
    [setSelectedProductId],
  );

  const handleDrawerClose = useCallback(() => {
    clearSelectedProductId();
    requestAnimationFrame(() => {
      lastFocusedProductRef.current?.focus();
    });
  }, [clearSelectedProductId]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>
            Browse the catalog — scroll for more, click a card for details.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        {isLoading && <LoadingState message="Loading products…" />}

        {isError && (
          <ErrorBanner
            message={error?.message ?? 'Failed to load products.'}
          />
        )}

        {!isLoading && !isError && (
          <ProductCatalogContent
            products={products}
            onProductClick={handleProductClick}
            isFetchingNextPage={isFetchingNextPage}
            canLoadMorePages={canLoadMorePages}
            onLoadMore={handleLoadMore}
          />
        )}
      </main>

      <ProductDetailDrawer
        productId={selectedProductId}
        onClose={handleDrawerClose}
      />
    </div>
  );
}
