import Image from "next/image";

/**
 * Single place that renders case-study artwork.
 *
 * Exists because the source PNGs are inconsistent: several shipped as 1024x1024
 * with the real content letterboxed inside dark bars, which showed up as a
 * black slab around a small picture. The bars have been trimmed at source, but
 * hand-rolled <img> blocks across five page files meant any future bad asset
 * would look broken again in a different way each time.
 *
 * Rules enforced here:
 *  - the frame hugs the image's own aspect ratio, so no container is ever
 *    taller than its contents
 *  - the surface is white, never a dark tint, so residual edges blend in
 *  - width is capped and centred, so a small asset does not stretch
 */
export default function CaseStudyFigure({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-[#D2D2D7] bg-white ${className}`}>
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 900px"
          className="h-auto w-full object-contain"
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-[#D2D2D7] px-5 py-3 text-[13px] text-[#6E6E73]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
