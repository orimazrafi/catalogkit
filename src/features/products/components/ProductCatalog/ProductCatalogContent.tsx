import { InfiniteScrollTrigger } from '../../../../components/shared/InfiniteScrollTrigger';
import type { Product } from '../../types/product';
import { ProductGrid } from './ProductGrid';
import { InlineLoadingSpinner } from '../../../../components/shared/InlineLoadingSpinner';

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
    <>
      <ProductGrid products={products} onProductClick={onProductClick} />

      {isFetchingNextPage && <InlineLoadingSpinner />}

      <InfiniteScrollTrigger
        onIntersect={onLoadMore}
        enabled={canLoadMorePages}
      />
    </>
  );
}
