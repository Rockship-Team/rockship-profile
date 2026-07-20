/**
 * Rockship wordmark.
 *
 * public/rockship.svg has all nine paths hardcoded to fill="white", so it is
 * invisible on a light background and cannot inherit colour. Masking the asset
 * and painting it with `currentColor` fixes both without inlining 12KB of path
 * data or maintaining a second copy of the file.
 */
export default function Logo({
  className = "",
  height = 20,
  label = "Rockship",
}: {
  className?: string;
  height?: number;
  label?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={className}
      style={{
        display: "block",
        height,
        width: (196 / 42) * height,
        backgroundColor: "currentColor",
        maskImage: "url(/rockship.svg)",
        WebkitMaskImage: "url(/rockship.svg)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
