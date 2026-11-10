export function StoryVisual() {
  return (
    <figure className="cinema-frame">
      <svg className="cinema-visual" viewBox="0 0 640 760" role="img" aria-label="طرح محدوده مطالعه">
        <rect width="640" height="760" fill="#0b0b12" />
        <path d="M150 640 C250 520 320 400 400 230" fill="none" stroke="#8B5CF6" strokeWidth="2" />
        <circle cx="400" cy="230" r="8" fill="#8B5CF6" />
      </svg>
      <figcaption>
        <strong>پایه</strong>
        <span>درس، فصل، مبحث</span>
      </figcaption>
    </figure>
  );
}

export function MissionVisual() {
  return (
    <figure className="cinema-frame">
      <svg className="cinema-visual" viewBox="0 0 640 760" role="img" aria-label="طرح مسیر بازخورد">
        <rect width="640" height="760" fill="#0b0b12" />
        <rect x="80" y="340" width="480" height="8" fill="rgba(255,255,255,0.08)" />
        <rect x="280" y="340" width="280" height="8" fill="#8B5CF6" />
      </svg>
      <figcaption>
        <strong>قوت</strong>
        <span>و ضعف</span>
      </figcaption>
    </figure>
  );
}

export function ExperienceVisual() {
  return (
    <figure className="cinema-frame is-short">
      <svg className="cinema-visual" viewBox="0 0 640 480" role="img" aria-label="طرح تمرین و گفتگو">
        <rect width="640" height="480" fill="#0b0b12" />
        <circle cx="150" cy="150" r="80" fill="rgba(139,92,246,0.18)" />
      </svg>
      <figcaption>
        <strong>تمرین، نمودار، پرسش</strong>
      </figcaption>
    </figure>
  );
}
