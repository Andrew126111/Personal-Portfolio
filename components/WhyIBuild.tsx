"use client";

export default function WhyIBuild() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Decorative circle */}
        <div
          data-depth={0.2}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 500, height: 500,
            top: "-15%", left: "-5%",
            backgroundColor: "#a8e6cf",
            opacity: 0.04,
          }}
        />

        {/* Section heading */}
        <div
          data-reveal="fade"
          data-start="top 90%" data-end="top 70%"
          className="flex items-center gap-2 mb-12 md:mb-16"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36 }}
        >
          <span>・</span>
          <span style={{ color: "#a8e6cf" }}>WHY I BUILD</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left */}
          <div>
            <div data-reveal="slide" data-start="top 85%" data-end="top 55%">
              <p
                className="text-lg md:text-xl leading-relaxed font-light"
                style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
              >
                I BUILD BECAUSE I BELIEVE THE WEB IS THE MOST POWERFUL CREATIVE
                MEDIUM OF OUR TIME. THE ABILITY TO CREATE SOMETHING FROM NOTHING
                AND SHARE IT WITH THE WORLD IS EXTRAORDINARY.
              </p>
            </div>
          </div>

          {/* Right */}
          <div>
            <div data-reveal="slide" data-start="top 85%" data-end="top 55%">
              <p
                className="text-lg md:text-xl leading-relaxed font-light"
                style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42" }}
              >
                EVERY PROJECT IS AN OPPORTUNITY TO LEARN SOMETHING NEW. I&apos;M
                DRIVEN BY THE CHALLENGE OF TAKING COMPLEX IDEAS AND TURNING THEM
                INTO INTUITIVE, BEAUTIFUL EXPERIENCES.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
