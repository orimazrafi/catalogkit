interface ErrorBannerProps {
  message?: string;
}

/** Styled error banner for failed requests or operations. */
export function ErrorBanner({
  message = 'Something went wrong.',
}: ErrorBannerProps) {
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {message}
    </div>
  );
}
