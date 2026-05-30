import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { InfiniteScrollTrigger } from '@/components/shared/InfiniteScrollTrigger';
import { InlineSpinner } from '@/components/shared/InlineSpinner';
import type { Product } from '@/features/products/types/product';
import { ProductGrid } from './ProductGrid';

interface ProductCatalogContentProps {
  products: Product[];
  onProductClick: (productId: number, triggerElement: HTMLButtonElement) => void;
  isFetchingNextPage: boolean;
  canLoadMorePages: boolean;
  onLoadMore: () => void;
}

/** Loaded catalog: product grid, pagination spinner, and infinite-scroll sentinel. */
export function ProductCatalogContent({
  products,
  onProductClick,
  isFetchingNextPage,
  canLoadMorePages,
  onLoadMore,
}: ProductCatalogContentProps) {
  return (
    <ErrorBoundary message="Unable to display products.">
      <ProductGrid products={products} onProductClick={onProductClick} />

      {isFetchingNextPage && <InlineSpinner />}

      <InfiniteScrollTrigger
        onIntersect={onLoadMore}
        enabled={canLoadMorePages}
      />
    </ErrorBoundary>
  );
}
