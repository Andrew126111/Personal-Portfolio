"use client";

const currentGroups = [
  {
    label: "CODING",
    items: ["LEARNING C++ & SYSTEMS PROGRAMMING", "BUILDING MORE WITH NEXT.JS", "EXPLORING WEBGL & THREE.JS"],
  },
  {
    label: "READING",
    items: ["COMPUTER SYSTEMS: A PROGRAMMER'S PERSPECTIVE", "DEEP WORK BY CAL NEWPORT", "DESIGNING DATA-INTENSIVE APPLICATIONS"],
  },
  {
    label: "INTERESTS",
    items: ["INTERACTION DESIGN", "CREATIVE CODING", "UI ANIMATION", "OPEN SOURCE"],
  },
];

export default function CurrentlySection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Decorative circle */}
        <div
          data-depth={0.18}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 400, height: 400,
            top: "-15%", right: "-5%",
            backgroundColor: "#ffd93d",
            opacity: 0.04,
          }}
        />

        {/* Section heading */}
        <div
          data-reveal="fade"
          data-start="top 90%" data-end="top 70%"
          className="flex items-center gap-2 mb-16 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36 }}
        >
          <span>・</span>
          <span style={{ color: "#ffd93d" }}>CURRENTLY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {currentGroups.map((group, gi) => (
            <div key={group.label}>
              {/* Group label */}
              <div
                data-reveal="fade"
                data-start={`top ${85 - gi * 5}%`}
                data-end={`top ${65 - gi * 5}%`}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-8 h-px" style={{ backgroundColor: "#ffd93d" }} />
                <span
                  className="text-xs tracking-[0.25em]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: "#ffd93d",
                    fontWeight: 500,
                  }}
                >
                  {group.label}
                </span>
              </div>

              <div className="space-y-4">
                {group.items.map((item, ii) => (
                  <div
                    key={ii}
                    data-reveal="slide"
                    data-start={`top ${80 - gi * 5 - ii * 3}%`}
                    data-end={`top ${60 - gi * 5 - ii * 3}%`}
                  >
                    <p
                      className="text-base md:text-lg tracking-[0.05em]"
                      style={{
                        fontFamily: "Six Caps, sans-serif",
                        color: "#2b2d42",
                        opacity: 0.7 - ii * 0.1,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
