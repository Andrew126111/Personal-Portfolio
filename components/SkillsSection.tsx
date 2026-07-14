"use client";

const skillGroups = [
  {
    label: "LANGUAGES",
    items: ["TYPESCRIPT", "PYTHON", "CSS", "SQL"],
    color: "#ff6b9d",
  },
  {
    label: "FRAMEWORKS",
    items: ["REACT", "NEXT.JS", "NODE.JS", "FRAMER MOTION"],
    color: "#6bcbff",
  },
  {
    label: "TOOLS",
    items: ["GIT", "TAILWIND", "POSTGRESQL", "PRISMA"],
    color: "#ffd93d",
  },
];

export default function SkillsSection({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      {/* Floating decorative circles */}
      <div
        data-depth={0.18}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          top: "-10%", left: "-8%",
          backgroundColor: "#a8e6cf",
          opacity: 0.04,
        }}
      />
      <div
        data-depth={0.25}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          bottom: "5%", right: "5%",
          backgroundColor: "#ffb3a6",
          opacity: 0.05,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        {/* Section heading */}
        <div
          data-reveal="fade"
          data-start="top 90%" data-end="top 70%"
          className="flex items-center gap-2 mb-16 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#2b2d42" }}
        >
          <span>・</span>
          <span>SKILLS</span>
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {skillGroups.map((group, gi) => (
            <div key={group.label}>
              {/* Group label */}
              <div
                data-reveal="fade"
                data-start={`top ${85 - gi * 5}%`}
                data-end={`top ${65 - gi * 5}%`}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-6 h-px" style={{ backgroundColor: group.color }} />
                <span
                  className="text-xs tracking-[0.25em]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: group.color,
                    fontWeight: 500,
                  }}
                >
                  {group.label}
                </span>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                {group.items.map((skill, si) => (
                  <div
                    key={skill}
                    data-reveal="slide"
                    data-start={`top ${80 - gi * 5 - si * 3}%`}
                    data-end={`top ${60 - gi * 5 - si * 3}%`}
                  >
                    <span
                      className="text-xl md:text-2xl lg:text-3xl tracking-[0.1em]"
                      style={{
                        fontFamily: "Six Caps, sans-serif",
                        color: "#2b2d42",
                        opacity: 0.85 - si * 0.08,
                      }}
                    >
                      {skill}
                    </span>
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
