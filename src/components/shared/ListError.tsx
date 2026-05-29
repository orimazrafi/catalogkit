interface ListErrorProps {
  message?: string;
}

/** Error banner for failed list or query requests. */
export function ListError({ message = 'Something went wrong.' }: ListErrorProps) {
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {message}
    </div>
  );
}
