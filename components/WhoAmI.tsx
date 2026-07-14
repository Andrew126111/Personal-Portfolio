"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useElementProgress } from "@/hooks/useScrollProgress";

export default function WhoAmI({ sectionId }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionProgress = useElementProgress(sectionId ?? "whoami");

  const markerOpacity = useTransform(sectionProgress, [0, 0.12], [0, 1]);
  const primaryClip = useTransform(
    sectionProgress,
    [0.08, 0.35],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );
  const lineScale = useTransform(sectionProgress, [0.2, 0.35], [0, 1]);
  const descClip = useTransform(
    sectionProgress,
    [0.25, 0.5],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative w-full overflow-hidden py-24 md:py-36"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        <div className="max-w-3xl">
          {/* Section marker */}
          <motion.div
            className="flex items-center gap-2 mb-8 md:mb-10"
            style={{ fontFamily: "Six Caps, sans-serif", fontSize: 28, color: "#ff6b9d", opacity: markerOpacity }}
          >
            <span>―</span>
            <span>WHO I AM</span>
          </motion.div>

          {/* Primary text */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-2xl md:text-4xl lg:text-5xl leading-[1.15] font-light mb-6 md:mb-8"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", fontWeight: 300, clipPath: primaryClip }}
            >
              BUILDING DIGITAL EXPERIENCES SINCE 2022
            </motion.p>
          </div>

          {/* Divider line */}
          <motion.div
            className="w-16 h-px mb-6"
            style={{ backgroundColor: "#6bcbff", transformOrigin: "left", scaleX: lineScale }}
          />

          {/* Description */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-base md:text-lg leading-relaxed font-light max-w-2xl mb-4"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.65, clipPath: descClip }}
            >
              COMPUTER SCIENCE STUDENT AT QUEEN&apos;S UNIVERSITY.
            </motion.p>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-base md:text-lg leading-relaxed font-light max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.65, clipPath: descClip }}
            >
              PASSIONATE ABOUT FRONT-END DEVELOPMENT, THOUGHTFUL UI, AND BUILDING
              PRODUCTS THAT PEOPLE ENJOY USING.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
