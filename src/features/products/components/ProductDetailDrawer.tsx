import { Loader2, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useProductDetail } from '@/features/products/hooks/useProductsQueries';
import { useEscapeKey } from '@/hooks/useEscapeKey';

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
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-800 bg-slate-900 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <h2
            id="product-detail-title"
            className="text-lg font-semibold text-slate-100"
          >
            Product details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
            aria-label="Close product details"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
              <p className="text-sm">Loading product…</p>
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error?.message ?? 'Failed to load product details.'}
            </div>
          )}

          {product && !isLoading && (
            <div className="flex flex-col gap-6 opacity-100 transition-opacity duration-300">
              <div className="overflow-hidden rounded-xl bg-slate-800">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-300">
                  {product.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-50">
                  {product.title}
                </h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg bg-slate-800/80 p-4">
                    <dt className="text-slate-400">Price</dt>
                    <dd className="mt-1 text-xl font-bold text-emerald-400">
                      ${product.price.toFixed(2)}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-slate-800/80 p-4">
                    <dt className="text-slate-400">Stock</dt>
                    <dd className="mt-1 text-xl font-bold text-slate-100">
                      {product.stock}
                    </dd>
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
