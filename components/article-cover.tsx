export function ArticleCover({
  category,
  title,
  cover,
  variant = "card",
}: {
  category: string;
  title: string;
  cover: string | null;
  variant?: "card" | "feature" | "rail";
}) {
  return (
    <figure className={`media-slot is-${variant}`}>
      {cover ? (
        <img src={cover} alt="" className="media-shot" />
      ) : (
        <div className="media-empty" role="img" aria-label={`جای تصویر جلد: ${title}`}>
          <span className="media-empty-mark" aria-hidden="true" />
          <span className="media-empty-copy">تصویر جلد</span>
        </div>
      )}
      <figcaption className="media-kicker">{category}</figcaption>
    </figure>
  );
}
