import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { ReactNode } from 'react';
import { ErrorBanner } from '@/components/shared/feedback/ErrorBanner';

interface ErrorBoundaryProps {
  children: ReactNode;
  message?: string;
}

/** Catches render errors in children and shows a fallback banner. */
export function ErrorBoundary({
  children,
  message = 'Something went wrong.',
}: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallbackRender={() => <ErrorBanner message={message} />}
    >
      {children}
    </ReactErrorBoundary>
  );
}
