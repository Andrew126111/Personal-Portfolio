"use client";

import { useRef } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useElementProgress, useCameraY, useDriftX, useDriftY, useSmoothRotate, useTime } from "@/hooks/useScrollProgress";

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
  const cameraY = useCameraY();
  const fallbackCam = useMotionValue(0);
  const safeCamY = cameraY ?? fallbackCam;
  const time = useTime();

  const headingOpacity = useTransform(sectionProgress, [0, 0.2], [0, 1]);
  const headingParallax = useTransform(safeCamY, (y: number) => -y * 0.006);
  const groupClip = useTransform(
    sectionProgress,
    [0.1, 0.4],
    ["inset(3% 0% 3% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Floating decorative elements
  const circle1DriftX = useDriftX(20, 0.03);
  const circle1DriftY = useDriftY(12, 0.04);
  const circle1Rotate = useSmoothRotate(2);
  const circle1Pulse = useTransform(time, (t: number) => 0.88 + Math.sin(t * 0.025) * 0.12);
  const circle1Parallax = useTransform(safeCamY, (y: number) => -y * 0.018);
  const circle1Y = useTransform([circle1DriftY, circle1Parallax], ([d, p]: number[]) => d + p);

  const circle2DriftX = useDriftX(15, 0.045);
  const circle2DriftY = useDriftY(10, 0.03);
  const circle2Scale = useTransform(time, (t: number) => 0.85 + Math.sin(t * 0.03 + 2) * 0.15);
  const circle2Parallax = useTransform(safeCamY, (y: number) => y * 0.025);
  const circle2Y = useTransform([circle2DriftY, circle2Parallax], ([d, p]: number[]) => d + p);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      {/* Floating decorative circles */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          top: "-10%", left: "-8%",
          backgroundColor: "#a8e6cf",
          opacity: 0.04,
          x: circle1DriftX,
          y: circle1Y,
          rotate: circle1Rotate,
          scale: circle1Pulse,
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          bottom: "5%", right: "5%",
          backgroundColor: "#ffb3a6",
          opacity: 0.05,
          x: useDriftX(15, 0.045),
          y: circle2Y,
          scale: circle2Scale,
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16"
        style={{ clipPath: groupClip }}
      >
        {/* Section heading */}
        <motion.div
          className="flex items-center gap-2 mb-16 md:mb-20"
          style={{
            fontFamily: "Six Caps, sans-serif",
            fontSize: 36,
            color: "#2b2d42",
            opacity: headingOpacity,
            y: headingParallax,
          }}
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
                y: useTransform(sectionProgress, [0.1 + gi * 0.1, 0.3 + gi * 0.1], [30, 0]),
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
                        [gi === 1 ? 10 : -10, 0]
                      ),
                      rotate: useTransform(
                        sectionProgress,
                        [0.2 + gi * 0.1 + si * 0.05, 0.35 + gi * 0.1 + si * 0.05],
                        [gi % 2 === 0 ? 3 : -3, 0]
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
