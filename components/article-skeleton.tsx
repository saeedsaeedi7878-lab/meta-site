export function ArticleSkeleton({
  count = 3,
  variant = "cards",
}: {
  count?: number;
  variant?: "cards" | "reader" | "feature";
}) {
  if (variant === "reader") {
    return (
      <div className="journal-skeleton" aria-hidden="true">
        <div className="journal-bone is-hero" />
        <div className="journal-bone is-line is-title" />
        <div className="journal-bone is-line" />
        <div className="journal-bone is-line is-short" />
      </div>
    );
  }
  if (variant === "feature") {
    return (
      <div className="journal-skeleton is-feature" aria-hidden="true">
        <div className="journal-bone is-copy">
          <div className="journal-bone is-line is-short" />
          <div className="journal-bone is-line is-title" />
          <div className="journal-bone is-line" />
        </div>
        <div className="journal-bone is-hero" />
      </div>
    );
  }
  return (
    <div className="journal-skeleton-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="journal-skeleton">
          <div className="journal-bone is-card" />
          <div className="journal-bone is-line is-title" />
          <div className="journal-bone is-line" />
          <div className="journal-bone is-line is-short" />
        </div>
      ))}
    </div>
  );
}
