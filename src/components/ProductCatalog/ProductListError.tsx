interface ProductListErrorProps {
  message?: string;
}

/** Error state when the products query fails. */
export function ProductListError({
  message = 'Failed to load products.',
}: ProductListErrorProps) {
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {message}
    </div>
  );
}
