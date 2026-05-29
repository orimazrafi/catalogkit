import { Loader2 } from 'lucide-react';

/** Compact centered spinner for secondary or in-progress loads. */
export function InlineSpinner() {
  return (
    <div className="mt-8 flex justify-center text-slate-400">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
    </div>
  );
}
