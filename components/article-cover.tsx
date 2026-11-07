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
    <svg className="article-cover" viewBox="0 0 640 360" role="img" aria-label={`طرح جلد: ${title}`}>
      <rect width="640" height="360" rx="28" fill="#0c0c16" />
      <circle cx="520" cy="70" r="120" fill="rgba(139,92,246,0.16)" />
      <circle cx="90" cy="300" r="90" fill="rgba(139,92,246,0.08)" />
      <text x="592" y="78" fill="#a78bfa" fontSize="18" textAnchor="end" fontFamily="Alibaba, Tahoma, sans-serif">
        {category}
      </text>
      <text x="500" y="230" fill="rgba(248,247,255,0.14)" fontSize="140" fontFamily="Tahoma, sans-serif">
        {motif}
      </text>
    </svg>
  );
}