const LoadingSkeleton = ({ count = 8 }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-2xl border border-secondary-200/40 bg-white/90 p-4 dark:border-secondary-700/60 dark:bg-secondary-900/70"
      >
        <div className="mb-4 h-40 animate-pulse rounded-xl bg-secondary-200 dark:bg-secondary-700" />
        <div className="mb-2 h-4 animate-pulse rounded bg-secondary-200 dark:bg-secondary-700" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-secondary-200 dark:bg-secondary-700" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;

