"use client";

export default function AboutCard() {
  return (
    <div
      className="app-card-wrapper"
      data-cursor="magnetic"
      data-reveal="scale"
      data-start="top 80%" data-end="top 50%"
      style={{
        position: "absolute",
        right: "5%",
        top: "15%",
        width: 280,
        backgroundColor: "#ffffff",
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        borderRadius: 12,
        overflow: "visible",
        zIndex: 20,
        rotate: "6deg",
      }}
    >
      <a
        href="/about"
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <div
          className="w-full h-full flex flex-col p-5 md:p-6"
          style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
        >
          {/* Top row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">・</span>
            <span className="text-base md:text-lg tracking-[0.2em]">ABOUT</span>
          </div>

          {/* Center */}
          <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
            <p className="text-xl md:text-2xl tracking-wide">ANDREW</p>
            <p className="text-base md:text-lg mt-2 tracking-[0.15em] opacity-70">(LEARN MORE)</p>
          </div>

          {/* Bottom */}
          <div className="mt-auto pt-3 border-t border-[#2b2d42]/20 flex items-center justify-between">
            <span className="text-2xl md:text-3xl tracking-[0.1em]">NGUYEN</span>
            <div
              className="flex items-center gap-1"
              style={{ color: "#ff6b9d" }}
            >
              <span className="text-xs tracking-[0.1em]">CLICK</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8l4 4-4 4M8 12h8" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
