"use client";

import useHeroMotion from "@/hooks/useHeroMotion";

const nameLetters = "ANDREW NGUYEN".split("");

export default function HeroSection({ sectionId, onAboutClick }: { sectionId?: string; onAboutClick?: () => void }) {
  useHeroMotion();

  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24"
    >
      {/* ============ AMBIENT BACKGROUND LAYERS ============ */}

      {/* Layer 1 — very distant background (2% mouse depth) */}
      <div
        data-hero-bg
        data-float-amp="6"
        data-drift-amp="8"
        data-mouse-depth="0.02"
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 900, height: 900, top: "-20%", right: "-10%",
            background: "radial-gradient(circle, #ff6b9d08 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 650, height: 650, bottom: "-10%", left: "-5%",
            background: "radial-gradient(circle, #6bcbff06 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 750, height: 750, top: "30%", left: "40%",
            background: "radial-gradient(circle, #ffb3a605 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Layer 2 — floating editorial text (5% mouse depth) */}
      <div
        data-hero-bg
        data-float-amp="4"
        data-drift-amp="12"
        data-mouse-depth="0.05"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <span
          className="absolute"
          style={{
            top: "18%", left: "5%",
            fontFamily: "Six Caps, sans-serif", fontSize: 40,
            color: "#2b2d42", opacity: 0.015, letterSpacing: "0.15em",
            whiteSpace: "nowrap",
          }}
        >
          FULL-STACK DEVELOPER
        </span>
        <span
          className="absolute"
          style={{
            bottom: "20%", right: "8%",
            fontFamily: "Six Caps, sans-serif", fontSize: 32,
            color: "#2b2d42", opacity: 0.012, letterSpacing: "0.15em",
            whiteSpace: "nowrap",
          }}
        >
          CREATIVE ENGINEERING
        </span>
        <span
          className="absolute"
          style={{
            top: "45%", right: "3%",
            fontFamily: "Six Caps, sans-serif", fontSize: 28,
            color: "#2b2d42", opacity: 0.01, letterSpacing: "0.15em",
            whiteSpace: "nowrap",
          }}
        >
          QUEEN'S UNIVERSITY CS
        </span>
      </div>

      {/* Layer 3 — decorative circles (8% mouse depth) */}
      <div
        data-hero-bg
        data-float-amp="5"
        data-drift-amp="6"
        data-mouse-depth="0.08"
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400, top: "60%", left: "80%",
            backgroundColor: "#a8e6cf", opacity: 0.03,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 200, height: 200, top: "15%", left: "20%",
            backgroundColor: "#ffb3a6", opacity: 0.04,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* ============ CONTENT ============ */}

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        {/* Top text */}
        <p
          data-hero-top
          className="text-xs md:text-sm tracking-[0.25em] mb-6 md:mb-10"
          style={{ fontFamily: "Inter, sans-serif", color: "#ff6b9d", opacity: 0 }}
        >
          CREATIVE &middot; DEVELOPER
        </p>

        {/* Name — individual letters */}
        <div data-hero-clip style={{ clipPath: "inset(0 0 100% 0)" }}>
          <h1
            data-hero-name
            className="text-8xl md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-[-0.03em]"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42", willChange: "letter-spacing" }}
          >
            {nameLetters.map((letter, i) => (
              <span
                key={i}
                data-letter
                className="inline-block"
                style={{ willChange: "transform" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <p
          data-hero-subtitle
          className="text-xs md:text-sm tracking-[0.15em] mt-4 mb-8"
          style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0 }}
        >
          COMPUTER SCIENCE AT QUEEN&apos;S UNIVERSITY
        </p>

        {/* Tags */}
        <div
          data-hero-tags
          className="flex flex-wrap gap-2 mb-12"
          style={{ opacity: 0 }}
        >
          {["INTERACTION", "MOTION", "CODE"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] tracking-[0.15em]"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#ff6b9d",
                border: "1px solid #ff6b9d",
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bio */}
        <div
          data-hero-bio
          className="max-w-xl"
          style={{ opacity: 0 }}
        >
          <p
            className="text-sm md:text-base leading-relaxed font-light"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#2b2d42",
              borderLeft: "1px solid #6bcbff",
              paddingLeft: 16,
            }}
          >
            I&apos;M A DEVELOPER AND DESIGNER WHO LOVES BUILDING THINGS THAT
            LIVE AT THE INTERSECTION OF CODE AND CRAFT.
          </p>
        </div>
      </div>

      {/* Orbs — 12% mouse depth */}
      <div
        data-hero-bg
        data-float-amp="7"
        data-drift-amp="5"
        data-mouse-depth="0.12"
        className="absolute inset-0 pointer-events-none select-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 100, height: 100,
            right: "15%", top: "20%",
            background: "radial-gradient(circle at 35% 35%, #ff6b9d, #ff6b9d60)",
            opacity: 0.15,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 80, height: 80,
            left: "12%", top: "70%",
            background: "radial-gradient(circle at 35% 35%, #6bcbff, #6bcbff60)",
            opacity: 0.12,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 70, height: 70,
            right: "10%", bottom: "15%",
            background: "radial-gradient(circle at 35% 35%, #ffd93d, #ffd93d60)",
            opacity: 0.1,
          }}
        />
      </div>

      {/* Card — 15% mouse depth, scale reveal */}
      <div
        data-hero-card
        data-hero-bg
        data-float-amp="3"
        data-drift-amp="4"
        data-mouse-depth="0.15"
        className="app-card-wrapper"
        data-cursor="magnetic"
        onClick={onAboutClick}
        style={{
          position: "absolute",
          right: "5%",
          top: "10%",
          backgroundColor: "#ffffff",
          cursor: "pointer",
          rotate: "6deg",
          opacity: 0,
          willChange: "transform",
        }}
      >
        <div
          className="w-full h-full flex flex-col p-5 md:p-6"
          style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">・</span>
            <span className="text-base md:text-lg tracking-[0.2em]">ABOUT</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-xl md:text-2xl tracking-wide">ANDREW</p>
            <p className="text-base md:text-lg mt-2 tracking-[0.15em] opacity-70">(LEARN MORE)</p>
          </div>
          <div className="mt-auto pt-3 border-t border-[#2b2d42]/20 flex items-center justify-between">
            <span className="text-2xl md:text-3xl tracking-[0.1em]">NGUYEN</span>
            <div style={{ color: "#ff6b9d" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8l4 4-4 4M8 12h8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
