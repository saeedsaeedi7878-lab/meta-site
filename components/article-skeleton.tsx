export function ArticleSkeleton({ count = 3, variant = "cards" }: { count?: number; variant?: "cards" | "reader" }) {
  if (variant === "reader") {
    return (
      <div className="skeleton-reader" aria-hidden="true">
        <div className="skeleton-block skeleton-title" />
        <div className="skeleton-block" />
        <div className="skeleton-block" />
        <div className="skeleton-block short" />
      </div>
    );
  }
  return (
    <div className="skeleton-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-block skeleton-media" />
          <div className="skeleton-block short" />
          <div className="skeleton-block" />
        </div>
      ))}
    </div>
  );
}
