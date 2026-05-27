import { Loader2 } from 'lucide-react';

/** Inline spinner shown while the next infinite-scroll page is loading. */
export function ProductListLoadingMore() {
  return (
    <div className="mt-8 flex justify-center text-slate-400">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
    </div>
  );
}
