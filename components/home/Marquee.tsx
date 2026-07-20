import {
  siDocker,
  siExpo,
  siGo,
  siKubernetes,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSupabase,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

/**
 * Texture between two heavy sections, and a fast answer to "do they do my
 * stack?" — the second thing a technical buyer scans for.
 *
 * Marks are rendered in the page ink rather than each brand's colour, so the
 * strip reads as one row and the accent stays reserved.
 *
 * TK: confirm this list with Engineering. See docs/rebrand/copy-v2.md.
 */
const STACK: SimpleIcon[] = [
  siTypescript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siGo,
  siPostgresql,
  siRedis,
  siSupabase,
  siDocker,
  siKubernetes,
  siExpo,
];

export default function Marquee() {
  const doubled = [...STACK, ...STACK];

  return (
    <div className="rk-marquee rk-fade-x overflow-hidden py-12">
      <p className="rk-num mb-7 text-center">Working across</p>
      <div className="rk-marquee-track items-center">
        {doubled.map((icon, index) => (
          <span
            key={`${icon.slug}-${index}`}
            className="flex shrink-0 items-center gap-2.5 px-8"
            title={icon.title}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              aria-hidden
              style={{ fill: "var(--rk-ink)", opacity: 0.55 }}
            >
              <path d={icon.path} />
            </svg>
            <span
              className="whitespace-nowrap text-[15px]"
              style={{ color: "var(--rk-sec)" }}
            >
              {icon.title}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
