import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Nota Finance – Digitales Inkasso für Selbstständige und KMU";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #021C8B 0%, #0524b0 50%, #1B52D7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.03) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Logo Text */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              marginBottom: 24,
              display: "flex",
            }}
          >
            Nota Finance
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.85)",
              letterSpacing: "0.02em",
              display: "flex",
            }}
          >
            Digitales Inkasso für Selbstständige und KMU
          </div>

          {/* Accent line */}
          <div
            style={{
              width: 120,
              height: 4,
              background: "rgba(255, 255, 255, 0.5)",
              borderRadius: 2,
              marginTop: 40,
              display: "flex",
            }}
          />
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.6)",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          www.notafinance.de
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

