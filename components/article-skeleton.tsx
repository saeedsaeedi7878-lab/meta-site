export function ArticleSkeleton({
  count = 3,
  variant = "cards",
}: {
  count?: number;
  variant?: "cards" | "reader" | "feature";
}) {
  if (variant === "reader") {
    return (
      <div className="skeleton-reader" aria-hidden="true">
        <div className="skeleton-block skeleton-media is-cover" />
        <div className="skeleton-block skeleton-title" />
        <div className="skeleton-block" />
        <div className="skeleton-block" />
        <div className="skeleton-block short" />
      </div>
    );
  }

  if (variant === "feature") {
    return (
      <div className="skeleton-feature" aria-hidden="true">
        <div className="skeleton-block skeleton-media is-feature" />
        <div className="skeleton-feature-copy">
          <div className="skeleton-block short" />
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block" />
          <div className="skeleton-block" />
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-list" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-block skeleton-media" />
          <div className="skeleton-row-copy">
            <div className="skeleton-block short" />
            <div className="skeleton-block skeleton-title" />
            <div className="skeleton-block" />
          </div>
        </div>
      ))}
    </div>
  );
}
