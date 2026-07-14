"use client";

export default function WhoAmI({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      {/* Floating decorative circles with parallax depth */}
      <div
        data-depth={0.15}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400, height: 400,
          top: "5%", right: "-5%",
          backgroundColor: "#ffb3a6",
          opacity: 0.06,
        }}
      />
      <div
        data-depth={0.2}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 250, height: 250,
          bottom: "15%", left: "-3%",
          backgroundColor: "#a8e6cf",
          opacity: 0.05,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        <div className="max-w-3xl">
          {/* Section marker */}
          <div
            data-reveal="fade"
            data-start="top 90%" data-end="top 70%"
            className="flex items-center gap-2 mb-8 md:mb-10"
            style={{ fontFamily: "Six Caps, sans-serif", fontSize: 28, color: "#ff6b9d" }}
          >
            <span>―</span>
            <span>WHO I AM</span>
          </div>

          {/* Primary text */}
          <div data-reveal="clip" data-start="top 85%" data-end="top 45%">
            <p
              className="text-2xl md:text-4xl lg:text-5xl leading-[1.15] font-light mb-6 md:mb-8"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", fontWeight: 300 }}
            >
              BUILDING DIGITAL EXPERIENCES SINCE 2022
            </p>
          </div>

          {/* Divider line */}
          <div
            data-reveal="line"
            data-start="top 75%" data-end="top 60%"
            className="w-16 h-px mb-6"
            style={{ backgroundColor: "#6bcbff", transformOrigin: "left" }}
          />

          {/* Description 1 */}
          <div data-reveal="clip" data-start="top 70%" data-end="top 45%">
            <p
              className="text-base md:text-lg leading-relaxed font-light max-w-2xl mb-4"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.65 }}
            >
              COMPUTER SCIENCE STUDENT AT QUEEN&apos;S UNIVERSITY.
            </p>
          </div>

          {/* Description 2 */}
          <div data-reveal="clip" data-start="top 65%" data-end="top 40%">
            <p
              className="text-base md:text-lg leading-relaxed font-light max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.65 }}
            >
              PASSIONATE ABOUT FRONT-END DEVELOPMENT, THOUGHTFUL UI, AND BUILDING
              PRODUCTS THAT PEOPLE ENJOY USING.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
