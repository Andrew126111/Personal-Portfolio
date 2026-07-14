"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useElementProgress } from "@/hooks/useScrollProgress";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionProgress = useElementProgress(sectionId ?? "skills");

  const headingOpacity = useTransform(sectionProgress, [0, 0.2], [0, 1]);
  const groupClip = useTransform(
    sectionProgress,
    [0.1, 0.4],
    ["inset(3% 0% 3% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16"
        style={{ clipPath: groupClip }}
      >
        {/* Section heading */}
        <motion.div
          className="flex items-center gap-2 mb-16 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#2b2d42", opacity: headingOpacity }}
        >
          <span>・</span>
          <span>SKILLS</span>
        </motion.div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              style={{
                opacity: useTransform(sectionProgress, [0.1 + gi * 0.1, 0.3 + gi * 0.1], [0, 1]),
                y: useTransform(sectionProgress, [0.1 + gi * 0.1, 0.3 + gi * 0.1], [20, 0]),
              }}
            >
              {/* Group label */}
              <div className="flex items-center gap-3 mb-6">
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
                  <motion.div
                    key={skill}
                    style={{
                      opacity: useTransform(
                        sectionProgress,
                        [0.2 + gi * 0.1 + si * 0.05, 0.35 + gi * 0.1 + si * 0.05],
                        [0, 1]
                      ),
                      x: useTransform(
                        sectionProgress,
                        [0.2 + gi * 0.1 + si * 0.05, 0.35 + gi * 0.1 + si * 0.05],
                        [-10, 0]
                      ),
                    }}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
