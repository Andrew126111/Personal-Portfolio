"use client";

const palette = {
  pink: "#ff6b9d", sky: "#6bcbff", lemon: "#ffd93d",
  blush: "#ffb3a6", mint: "#a8e6cf", red: "#e84a5f", dark: "#2b2d42",
};

const floatingTexts = [
  { text: "FULL-STACK DEVELOPER", top: "12%", xSpeed: 0.006 },
  { text: "UX • UI • INTERACTION", top: "30%", xSpeed: 0.008 },
  { text: "CREATIVE ENGINEERING", top: "50%", xSpeed: 0.005 },
  { text: "QUEEN'S UNIVERSITY CS", top: "65%", xSpeed: 0.007 },
  { text: "DIGITAL EXPERIENCES", top: "78%", xSpeed: 0.009 },
  { text: "BUILD SINCE 2022", top: "88%", xSpeed: 0.004 },
];

const circles = [
  { size: 550, top: "8%", left: "60%", color: palette.pink, orbit: 60, speed: 0.012 },
  { size: 380, top: "55%", left: "15%", color: palette.sky, orbit: 45, speed: 0.015 },
  { size: 280, top: "30%", left: "75%", color: palette.lemon, orbit: 35, speed: 0.018 },
  { size: 450, top: "70%", left: "80%", color: palette.blush, orbit: 55, speed: 0.01 },
  { size: 220, top: "15%", left: "30%", color: palette.mint, orbit: 30, speed: 0.02 },
  { size: 320, top: "82%", left: "40%", color: palette.red, orbit: 40, speed: 0.014 },
];

function FloatingText({ item, index }: { item: typeof floatingTexts[0]; index: number }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      data-depth={0.06 + index * 0.012}
      data-idle
      style={{
        top: item.top,
        left: `${index % 2 === 0 ? -10 : 90}%`,
        fontFamily: "Six Caps, sans-serif",
        fontSize: `${35 + index * 4}px`,
        color: palette.dark,
        opacity: 0.015,
        letterSpacing: "0.15em",
        whiteSpace: "nowrap",
        willChange: "transform",
      }}
    >
      {item.text}
    </div>
  );
}

function FloatingCircle({ circle, index }: { circle: typeof circles[0]; index: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      data-depth={0.18 + index * 0.008}
      data-orb
      data-index={index}
      style={{
        width: circle.size,
        height: circle.size,
        top: circle.top,
        left: circle.left,
        backgroundColor: circle.color,
        opacity: 0.03,
        boxShadow: `0 0 ${circle.size * 0.3}px ${circle.color}20`,
        willChange: "transform",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export default function DepthBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#fef9ff]">
      {/* Layer 1-2: Gradient blobs */}
      <div className="absolute inset-0" data-depth={0.02} style={{ willChange: "transform" }}>
        <div
          className="absolute rounded-full"
          style={{
            width: 900, height: 900, top: "-20%", right: "-10%",
            background: `radial-gradient(circle, ${palette.pink}08 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 650, height: 650, bottom: "-10%", left: "-5%",
            background: `radial-gradient(circle, ${palette.sky}06 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 750, height: 750, top: "40%", left: "50%",
            background: `radial-gradient(circle, ${palette.blush}05 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Layer 3: Floating editorial typography */}
      {floatingTexts.map((item, i) => (
        <FloatingText key={i} item={item} index={i} />
      ))}

      {/* Layer 4: Oversized AN typography */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        data-depth={0.1}
        data-anchor
        style={{ willChange: "transform" }}
      >
        <span
          className="leading-none"
          style={{
            fontFamily: "Six Caps, sans-serif",
            fontSize: "clamp(20rem, 45vw, 45rem)",
            color: palette.dark,
            opacity: 0.025,
            letterSpacing: "0.02em",
            lineHeight: 0.85,
          }}
        >
          AN
        </span>
      </div>

      {/* Layer 5: Light sweep */}
      <div
        className="absolute top-0 h-full pointer-events-none"
        data-depth={0.15}
        data-sweep
        style={{
          width: "60%",
          background: `linear-gradient(90deg, transparent 0%, ${palette.lemon}03 50%, transparent 100%)`,
          willChange: "transform",
        }}
      />

      {/* Layer 6: Floating circles */}
      {circles.map((circle, i) => (
        <FloatingCircle key={i} circle={circle} index={i} />
      ))}

      {/* Layer 7: Particles */}
      <div data-depth={0.3} className="absolute inset-0" style={{ willChange: "transform" }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 1.5 + Math.random() * 3,
              height: 1.5 + Math.random() * 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: palette.dark,
              opacity: 0.03,
            }}
          />
        ))}
      </div>

      {/* Layer 8: Noise grain */}
      <div
        data-depth={0.35}
        className="absolute inset-0"
        style={{
          opacity: 0.012,
          willChange: "transform",
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}
