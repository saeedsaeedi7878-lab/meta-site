const motifs = ["∑", "λ", "π", "Δ"] as const;

export function ArticleCover({
  category,
  title,
  index,
}: {
  category: string;
  title: string;
  index: number;
}) {
  const motif = motifs[index % motifs.length];
  return (
    <div className="article-cover-frame">
      <svg className="article-cover" viewBox="0 0 640 360" role="img" aria-label={`طرح جلد: ${title}`}>
        <rect width="640" height="360" fill="#0c0c16" />
        <circle cx="120" cy="70" r="120" fill="rgba(139,92,246,0.16)" />
        <circle cx="540" cy="300" r="90" fill="rgba(139,92,246,0.08)" />
        <text x="500" y="250" fill="rgba(248,247,255,0.14)" fontSize="140" fontFamily="Tahoma, sans-serif">
          {motif}
        </text>
      </svg>
      <span className="article-cover-label">{category}</span>
    </div>
  );
}
