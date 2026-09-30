import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.tsx, scaled up for the iOS home-screen canvas — see
// that file for why the colors are hardcoded hex instead of oklch().
const CHARCOAL = "#0f0a08";
const GOLD = "#9e6727";

export default function AppleIcon() {
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
            width: 96,
            height: 96,
            borderRadius: "50%",
            border: `14px solid ${GOLD}`,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
