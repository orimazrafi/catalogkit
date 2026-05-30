import type { MouseEvent } from 'react';
import type { Product } from '@/features/products/types/product';

interface ProductCardProps {
  product: Product;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

/** Clickable product summary card for the catalog grid. */
export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 text-left shadow-lg transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-indigo-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
    >
      <div className="aspect-square overflow-hidden bg-slate-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-300">
          {product.category}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-100 group-hover:text-white">
          {product.title}
        </h3>
        <p className="mt-auto text-lg font-bold text-emerald-400">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </button>
  );
}
