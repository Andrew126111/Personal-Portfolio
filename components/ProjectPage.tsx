"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ReactNode } from "react";
import { useElementProgress } from "@/hooks/useScrollProgress";

interface ProjectPageProps {
  num: string;
  title: string;
  description: string;
  tags: string[];
  bgColor: string;
  accentColor: string;
  circleColor: string;
  sectionId?: string;
  children?: ReactNode;
}

export default function ProjectPage({
  num,
  title,
  description,
  tags,
  accentColor,
  circleColor,
  sectionId,
  children,
}: ProjectPageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionProgress = useElementProgress(sectionId ?? "");

  const bgOpacity = useTransform(sectionProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const numOpacity = useTransform(sectionProgress, [0.05, 0.25, 0.5, 0.8, 0.9], [0, 1, 1, 1, 0]);
  const titleClip = useTransform(
    sectionProgress,
    [0.1, 0.35],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );
  const descOpacity = useTransform(sectionProgress, [0.2, 0.4, 0.7, 0.85], [0, 1, 1, 0]);
  const tagsOpacity = useTransform(sectionProgress, [0.25, 0.45, 0.65, 0.8], [0, 1, 1, 0]);
  const lineScale = useTransform(sectionProgress, [0.3, 0.5, 0.6, 0.75], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-32"
    >
      {/* Decorative circles fade in/out with section */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600, height: 600,
          top: "-15%", right: "-10%",
          backgroundColor: circleColor,
          opacity: useTransform(bgOpacity, [0.3, 1], [0, 0.12]),
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          bottom: "10%", left: "5%",
          backgroundColor: circleColor,
          opacity: useTransform(bgOpacity, [0.3, 1], [0, 0.08]),
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        {/* Number */}
        <motion.div
          className="mb-6 md:mb-10 text-6xl md:text-8xl leading-none"
          style={{ fontFamily: "Six Caps, sans-serif", color: accentColor, opacity: numOpacity }}
        >
          {num}
        </motion.div>

        {/* Title */}
        <div style={{ overflow: "hidden" }}>
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 md:mb-8"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42", clipPath: titleClip }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mb-8 font-light"
          style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: descOpacity }}
        >
          {description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          style={{ opacity: tagsOpacity }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs tracking-[0.1em]"
              style={{
                fontFamily: "Inter, sans-serif",
                backgroundColor: accentColor,
                color: "#ffffff",
                borderRadius: 4,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Children (links, extra content) */}
        {children && (
          <motion.div style={{ opacity: tagsOpacity }}>
            {children}
          </motion.div>
        )}

        {/* Decorative line */}
        <motion.div
          className="mt-12 md:mt-16 w-full max-w-xl"
          style={{ transformOrigin: "left", scaleX: lineScale }}
        >
          <svg viewBox="0 0 600 60" fill="none">
            <path
              d="M0,30 Q 150,70 300,30 T 600,30"
              stroke={accentColor}
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
