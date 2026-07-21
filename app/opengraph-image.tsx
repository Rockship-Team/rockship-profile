import { ImageResponse } from "next/og";

export const alt = "Rockship — Senior engineers who ship outcomes, not tickets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time. Replaces the /og-image.jpg and /twitter-image.jpg
 * that metadata referenced but which never existed on disk, leaving every
 * social preview broken.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#1D1D1F",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: "-0.03em", fontWeight: 600 }}>
          rockship.
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0 18px",
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 600,
            maxWidth: 940,
          }}
        >
          <span>Senior engineers who</span>
          <span style={{ color: "#FF4D00" }}>ship outcomes,</span>
          <span>not tickets.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6E6E73" }}>
          United States · Europe · Singapore · Japan · Vietnam
        </div>
      </div>
    ),
    size
  );
}
