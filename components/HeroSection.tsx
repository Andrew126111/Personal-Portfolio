"use client";

export default function HeroSection({ sectionId, onAboutClick }: { sectionId?: string; onAboutClick?: () => void }) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden pt-40 md:pt-48 pb-12 md:pb-16"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        {/* Top texts */}
        <div className="flex flex-col items-start mb-6 md:mb-10">
          <p
            data-reveal="fade"
            className="text-xs md:text-sm tracking-[0.25em]"
            style={{ fontFamily: "Inter, sans-serif", color: "#ff6b9d" }}
          >
            CREATIVE &middot; DEVELOPER
          </p>
        </div>

        {/* Name */}
        <div data-reveal="clip" data-start="top 90%" data-end="top 30%">
          <h1
            className="text-8xl md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-[-0.03em]"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
          >
            ANDREW
            <br />
            NGUYEN
          </h1>
        </div>

        {/* Subtitle */}
        <p
          data-reveal="fade"
          data-start="top 70%" data-end="top 50%"
          className="text-xs md:text-sm tracking-[0.15em] mt-4 mb-8"
          style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.5 }}
        >
          COMPUTER SCIENCE AT QUEEN&apos;S UNIVERSITY
        </p>

        {/* Tags */}
        <div
          data-reveal="slide"
          data-start="top 65%" data-end="top 45%"
          className="flex flex-wrap gap-2 mb-12"
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
          data-reveal="fade"
          data-start="top 60%" data-end="top 35%"
          className="max-w-xl"
        >
          <p
            className="text-sm md:text-base leading-relaxed font-light"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#2b2d42",
              opacity: 0.6,
              borderLeft: "1px solid #6bcbff",
              paddingLeft: 16,
            }}
          >
            I&apos;M A DEVELOPER AND DESIGNER WHO LOVES BUILDING THINGS THAT
            LIVE AT THE INTERSECTION OF CODE AND CRAFT.
          </p>
        </div>

        {/* About card — navigable */}
        <div
          className="app-card-wrapper"
          data-cursor="magnetic"
          data-reveal="scale"
          data-start="top 55%" data-end="top 25%"
          onClick={onAboutClick}
          style={{
            position: "absolute",
            right: "5%",
            top: "10%",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            rotate: "6deg",
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

        {/* Fidget orbs — visual only, parallax via depth */}
        <div
          data-depth={0.4}
          className="absolute rounded-full pointer-events-none select-none"
          style={{
            width: 100, height: 100,
            right: "15%", top: "20%",
            background: "radial-gradient(circle at 35% 35%, #ff6b9d, #ff6b9d60)",
            opacity: 0.15,
          }}
        />
        <div
          data-depth={0.35}
          className="absolute rounded-full pointer-events-none select-none"
          style={{
            width: 80, height: 80,
            left: "12%", top: "70%",
            background: "radial-gradient(circle at 35% 35%, #6bcbff, #6bcbff60)",
            opacity: 0.12,
          }}
        />
        <div
          data-depth={0.45}
          className="absolute rounded-full pointer-events-none select-none"
          style={{
            width: 70, height: 70,
            right: "10%", bottom: "10%",
            background: "radial-gradient(circle at 35% 35%, #ffd93d, #ffd93d60)",
            opacity: 0.1,
          }}
        />
      </div>
    </section>
  );
}
