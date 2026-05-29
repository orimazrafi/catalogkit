import { Loader2 } from 'lucide-react';

/** Compact centered spinner for pagination or secondary loads. */
export function InlineLoadingSpinner() {
  return (
    <div className="mt-8 flex justify-center text-slate-400">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
    </div>
  );
}
