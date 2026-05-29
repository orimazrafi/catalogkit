import { useCallback, useMemo, useRef } from 'react';
import { useInfiniteProducts } from '../../hooks/useProductsQueries';
import { useProductIdQueryParam } from '../../hooks/useProductIdQueryParam';
import { ProductDetailDrawer } from '../ProductDetailDrawer';
import { ProductCatalogContent } from './ProductCatalogContent';
import { ProductListError } from './ProductListError';
import { ProductListLoading } from './ProductListLoading';

/** Catalog container: fetches products, coordinates grid, scroll, and drawer. */
export function ProductCatalog() {
  const {
    selectedProductId,
    setSelectedProductId,
    clearSelectedProductId,
  } = useProductIdQueryParam();
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
      // Fetch the next page; React Query appends it to the cache (data.pages).
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-8 backdrop-blur">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="mt-2 text-slate-400">
            Browse the catalog — scroll for more, click a card for details.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {isLoading && <ProductListLoading />}

        {isError && <ProductListError message={error?.message} />}

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
