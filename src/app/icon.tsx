import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The custom cursor's ring, reused as the mark — same shape visitors
// already associate with this site. Colors are --charcoal/--accent from
// globals.css, converted from oklch() to hex since ImageResponse's
// renderer (Satori) doesn't understand that syntax.
const CHARCOAL = "#0f0a08";
const GOLD = "#9e6727";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: CHARCOAL,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: `3.5px solid ${GOLD}`,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
