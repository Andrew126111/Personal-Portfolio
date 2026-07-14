"use client";

const letters = "ANDREW NGUYEN".split("");

export default function HeaderLogo() {
  return (
    <div
      className="fixed top-8 left-8 z-40 select-none"
      data-depth={0.05}
      style={{
        fontFamily: "Six Caps, sans-serif",
        fontSize: 34,
        color: "#2b2d42",
        letterSpacing: "0.12em",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ height: 36, width: letter === " " ? 18 : "auto" }}
        >
          <span className="inline-block">{letter === " " ? "\u00A0" : letter}</span>
        </span>
      ))}
    </div>
  );
}
