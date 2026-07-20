const ITEMS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "Python",
  "PostgreSQL",
  "AWS",
  "LLM evaluation",
  "React Native",
  "Go",
  "Kubernetes",
  "Vector search",
];

/**
 * Texture between two heavy sections, and a fast answer to "do they do my
 * stack?" — the second thing a technical buyer scans for.
 *
 * TK: this list needs confirming with Engineering. See docs/rebrand/copy-v2.md.
 */
export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="rk-marquee rk-fade-x overflow-hidden py-10" aria-hidden>
      <div className="rk-marquee-track">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap px-7 text-[15px]"
            style={{ color: "var(--rk-ter)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
