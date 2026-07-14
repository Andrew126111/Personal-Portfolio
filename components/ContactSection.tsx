"use client";

export default function ContactSection({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      {/* Large decorative circle with parallax depth */}
      <div
        data-depth={0.15}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 800, height: 800,
          top: "-20%", right: "-10%",
          backgroundColor: "#ff6b9d",
          opacity: 0.06,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        {/* Section heading */}
        <div
          data-reveal="fade"
          data-start="top 90%" data-end="top 70%"
          className="flex items-center gap-2 mb-12 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#2b2d42" }}
        >
          <span>・</span>
          <span style={{ color: "#e84a5f" }}>GET IN TOUCH</span>
        </div>

        {/* Body text */}
        <div data-reveal="clip" data-start="top 85%" data-end="top 55%">
          <p
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light max-w-3xl mb-16"
            style={{ color: "#2b2d42", fontFamily: "Inter, sans-serif" }}
          >
            LOOKING FOR INTERNSHIP &amp; CO-OP OPPORTUNITIES IN
            SOFTWARE ENGINEERING, FRONT-END DEVELOPMENT, AND CREATIVE TECHNOLOGY.
            IF MY WORK RESONATES WITH YOU, I&apos;D LOVE TO HEAR FROM YOU.
          </p>
        </div>

        {/* Name — stretch reveal */}
        <div
          data-reveal="scale"
          data-start="top 80%" data-end="top 55%"
          className="text-6xl md:text-8xl lg:text-9xl leading-none mb-16"
          style={{
            fontFamily: "Six Caps, sans-serif",
            color: "#e84a5f",
            transformOrigin: "left",
          }}
        >
          NGUYEN
        </div>

        {/* Links */}
        <div
          data-reveal="fade"
          data-start="top 70%" data-end="top 50%"
          className="flex flex-wrap gap-8 mb-6"
        >
          <a
            href="mailto:ng.andrew2006@gmail.com"
            data-cursor="link"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            EMAIL
          </a>
          <a
            href="https://github.com/Andrew126111"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/andrew-nguyenn18"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            LINKEDIN
          </a>
          <a
            href="#"
            data-cursor="link"
            className="text-sm tracking-[0.15em] hover:underline"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
          >
            RESUME
          </a>
        </div>

        {/* Tagline */}
        <p
          data-reveal="fade"
          data-start="top 60%" data-end="top 40%"
          className="text-xs tracking-[0.3em] mb-20"
          style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
        >
          AVAILABLE FOR INTERNSHIPS &middot; SUMMER 2025 &middot; OPEN TO RELOCATION
        </p>

        {/* Contact card */}
        <div
          data-reveal="slide"
          data-start="top 55%" data-end="top 35%"
          className="app-card-wrapper"
          data-cursor="magnetic"
          style={{ backgroundColor: "#ffb3a6", rotate: "-6deg", position: "relative" }}
        >
          <a
            href="mailto:ng.andrew2006@gmail.com"
            className="block w-full h-full"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="w-full h-full flex flex-col p-5 md:p-6"
              style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">・</span>
                <span className="text-base md:text-lg tracking-[0.2em]">CONTACT</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="text-xl md:text-2xl tracking-wide">ANDREW</p>
                <p className="text-base md:text-lg mt-2 tracking-[0.15em] opacity-70">(EMAIL ME)</p>
              </div>
              <div className="mt-auto pt-3 border-t border-[#2b2d42]/20 text-center">
                <span className="text-2xl md:text-3xl tracking-[0.1em]">NGUYEN</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
