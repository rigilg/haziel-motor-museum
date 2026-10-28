import { ImageResponse } from "next/og";

export const alt = "Haziel Motor Museum — The history of the automobile, preserved.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", background: "#f4f1e9", color: "#171716" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Arial", fontSize: 19, fontWeight: 700, letterSpacing: 5 }}>
          <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "#171716", color: "#f4f1e9", fontSize: 29, letterSpacing: 0 }}>H</div>
          HAZIEL MOTOR MUSEUM
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ display: "flex", color: "#9b1c1c", fontFamily: "Arial", fontSize: 17, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase" }}>A digital museum · 1886—Present</div>
          <div style={{ display: "flex", marginTop: 24, fontFamily: "Georgia", fontSize: 78, lineHeight: 1.02, letterSpacing: -3 }}>The automobile,<br/>preserved as history.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #d8d3c8", paddingTop: 20, fontFamily: "Arial", fontSize: 16, color: "#6c6a64" }}>
          <span>Design · Engineering · Competition · Culture</span><span>HAZIELMOTORMUSEUM.RIGILGILBERT.COM</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
