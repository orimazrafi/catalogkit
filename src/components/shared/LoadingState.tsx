import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

/** Full-area loading placeholder with spinner and optional message. */
export function LoadingState({ message = 'Loading…' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-400">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
      <p>{message}</p>
    </div>
  );
}
