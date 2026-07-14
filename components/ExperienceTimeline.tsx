"use client";

import { useRef } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useElementProgress, useCameraY, useDriftX, useDriftY, useTime } from "@/hooks/useScrollProgress";

const timeline = [
  {
    year: "2022",
    title: "STARTED PROGRAMMING",
    description: "Began learning to code in the summer. Started with Python and web fundamentals. Discovered a passion for building things on the web.",
    color: "#ff6b9d",
  },
  {
    year: "2023",
    title: "FIRST PROJECTS",
    description: "Built first full-stack applications. Explored React, Node.js, and databases. Started contributing to open source.",
    color: "#6bcbff",
  },
  {
    year: "2024",
    title: "DEEPER INTO INTERACTION",
    description: "Discovered Framer Motion and creative development. Focused on front-end engineering, animation, and UI design. Built interactive portfolio pieces.",
    color: "#ffd93d",
  },
  {
    year: "2025",
    title: "COMPUTER SCIENCE AT QUEEN'S",
    description: "Currently pursuing a degree in Computer Science. Building towards internships and co-op opportunities in software engineering and creative technology.",
    color: "#a8e6cf",
  },
];

export default function ExperienceTimeline({ sectionId }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionProgress = useElementProgress(sectionId ?? "experience");
  const cameraY = useCameraY();
  const fallbackCam = useMotionValue(0);
  const safeCamY = cameraY ?? fallbackCam;

  const headingOpacity = useTransform(sectionProgress, [0, 0.15], [0, 1]);
  const headingParallax = useTransform(safeCamY, (y: number) => -y * 0.006);

  // Vertical line grows from top as section scrolls
  const lineScaleY = useTransform(sectionProgress, [0, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
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
          <span>EXPERIENCE</span>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — grows from top */}
          <motion.div
            className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px"
            style={{
              backgroundColor: "#2b2d42",
              opacity: 0.1,
              scaleY: lineScaleY,
              transformOrigin: "top",
            }}
          />

          {timeline.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} sectionProgress={sectionProgress} safeCamY={safeCamY} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, sectionProgress, safeCamY }: {
  item: typeof timeline[0];
  index: number;
  sectionProgress: any;
  safeCamY: any;
}) {
  const startOffset = 0.08 + index * 0.18;
  const endOffset = startOffset + 0.15;
  const time = useTime();

  const itemOpacity = useTransform(sectionProgress, [startOffset, endOffset], [0, 1]);
  const itemY = useTransform(sectionProgress, [startOffset, endOffset], [30, 0]);
  const dotScale = useTransform(sectionProgress, [startOffset, startOffset + 0.02], [0, 1]);

  // Independent parallax: year moves differently than content
  const yearParallax = useTransform(safeCamY, (y: number) => -y * (0.006 + index * 0.002));
  const titleParallax = useTransform(safeCamY, (y: number) => y * 0.008);
  const descParallax = useTransform(safeCamY, (y: number) => -y * 0.004);

  // Continuous subtle glow pulse on dot after reveal
  const dotGlow = useTransform(time, (t: number) => {
    if (sectionProgress.get() < startOffset) return 0.5;
    return 0.5 + Math.sin(t * 0.04 + index) * 0.5;
  });

  return (
    <motion.div
      className="relative flex items-start gap-6 md:gap-10 pb-16 md:pb-20 last:pb-0"
      style={{ opacity: itemOpacity, y: itemY }}
    >
      {/* Year with dot */}
      <div className="relative flex items-center justify-center shrink-0" style={{ width: 120, height: 40 }}>
        {/* Dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 12,
            height: 12,
            left: 54,
            backgroundColor: item.color,
            zIndex: 2,
            scale: dotScale,
            boxShadow: useTransform(dotGlow, (g: number) => `0 0 ${8 + g * 6}px ${item.color}40`),
          }}
        />
        <span
          className="text-lg md:text-xl tracking-[0.15em]"
          style={{
            fontFamily: "Six Caps, sans-serif",
            color: item.color,
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {item.year}
        </span>
      </div>

      {/* Content */}
      <motion.div className="flex-1 pt-1" style={{ y: titleParallax }}>
        <h3
          className="text-xl md:text-2xl lg:text-3xl tracking-[0.05em] mb-2"
          style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
        >
          {item.title}
        </h3>
        <motion.p
          className="text-sm md:text-base leading-relaxed font-light max-w-lg"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#2b2d42",
            opacity: 0.6,
            x: descParallax,
          }}
        >
          {item.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
