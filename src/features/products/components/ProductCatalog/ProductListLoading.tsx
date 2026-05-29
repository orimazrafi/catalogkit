import { Loader2 } from 'lucide-react';

/** Full-page loading state for the initial products fetch. */
export function ProductListLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-400">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
      <p>Loading products…</p>
    </div>
  );
}
