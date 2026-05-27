import type { Product } from '../../types/product';
import { InfiniteScrollTrigger } from '../ui/InfiniteScrollTrigger';
import { ProductGrid } from './ProductGrid';
import { ProductListLoadingMore } from './ProductListLoadingMore';

interface ProductCatalogContentProps {
  products: Product[];
  onProductClick: (productId: number) => void;
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

      {isFetchingNextPage && <ProductListLoadingMore />}

      <InfiniteScrollTrigger
        onIntersect={onLoadMore}
        enabled={canLoadMorePages}
      />
    </>
  );
}
