"use client";

const interests = [
  "RACKET SPORTS",
  "JAPANESE LANGUAGE & CULTURE",
  "POWERLIFTING",
  "MINIMALIST DESIGN",
  "READING FICTION",
  "CALLIGRAPHY",
];

export default function BeyondCode() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Section heading */}
        <div
          data-reveal="fade"
          data-start="top 90%" data-end="top 70%"
          className="flex items-center gap-2 mb-12 md:mb-16"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#ff6b9d" }}
        >
          <span>・</span>
          <span>BEYOND CODE</span>
        </div>

        {/* Interest items */}
        <div className="flex flex-wrap gap-4 md:gap-6 max-w-3xl">
          {interests.map((item, i) => (
            <div
              key={item}
              data-reveal="slide"
              data-start={`top ${85 - i * 3}%`}
              data-end={`top ${65 - i * 3}%`}
              className="px-6 py-3"
              style={{
                border: "1px solid #ff6b9d",
                borderRadius: 4,
              }}
            >
              <span
                className="text-sm md:text-base tracking-[0.15em]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#2b2d42",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
