"use client";

import { useRef } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useElementProgress, useCameraY, useDriftX, useDriftY, useSmoothRotate, useTime } from "@/hooks/useScrollProgress";

export default function WhoAmI({ sectionId }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionProgress = useElementProgress(sectionId ?? "whoami");
  const cameraY = useCameraY();
  const fallbackCam = useMotionValue(0);
  const safeCamY = cameraY ?? fallbackCam;
  const time = useTime();

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

  // Independent scroll parallax per element
  const markerY = useTransform(safeCamY, (y: number) => -y * 0.006);
  const primaryParallax = useTransform(safeCamY, (y: number) => y * 0.01);
  const desc1Parallax = useTransform(safeCamY, (y: number) => -y * 0.008);
  const desc2Parallax = useTransform(safeCamY, (y: number) => y * 0.005);

  // Floating decorative elements
  const circle1DriftX = useDriftX(25, 0.025);
  const circle1DriftY = useDriftY(15, 0.035);
  const circle1Rotate = useSmoothRotate(1.5);
  const circle1Pulse = useTransform(time, (t: number) => 0.9 + Math.sin(t * 0.02) * 0.1);
  const circle1Parallax = useTransform(safeCamY, (y: number) => -y * 0.015);
  const circle1Y = useTransform([circle1DriftY, circle1Parallax], ([d, p]: number[]) => d + p);

  const circle2DriftX = useDriftX(18, 0.04);
  const circle2DriftY = useDriftY(10, 0.025);
  const circle2Scale = useTransform(time, (t: number) => 0.85 + Math.sin(t * 0.03 + 1) * 0.15);
  const circle2Parallax = useTransform(safeCamY, (y: number) => y * 0.02);
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
          width: 400, height: 400,
          top: "5%", right: "-5%",
          backgroundColor: "#ffb3a6",
          opacity: 0.06,
          x: circle1DriftX,
          y: circle1Y,
          rotate: circle1Rotate,
          scale: circle1Pulse,
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 250, height: 250,
          bottom: "15%", left: "-3%",
          backgroundColor: "#a8e6cf",
          opacity: 0.05,
          x: circle2DriftX,
          y: circle2Y,
          scale: circle2Scale,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        <div className="max-w-3xl">
          {/* Section marker — with parallax */}
          <motion.div
            className="flex items-center gap-2 mb-8 md:mb-10"
            style={{
              fontFamily: "Six Caps, sans-serif",
              fontSize: 28,
              color: "#ff6b9d",
              opacity: markerOpacity,
              y: markerY,
            }}
          >
            <span>―</span>
            <span>WHO I AM</span>
          </motion.div>

          {/* Primary text — with parallax */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-2xl md:text-4xl lg:text-5xl leading-[1.15] font-light mb-6 md:mb-8"
              style={{
                fontFamily: "Inter, sans-serif", color: "#2b2d42",
                fontWeight: 300, clipPath: primaryClip, x: primaryParallax,
              }}
            >
              BUILDING DIGITAL EXPERIENCES SINCE 2022
            </motion.p>
          </div>

          {/* Divider line */}
          <motion.div
            className="w-16 h-px mb-6"
            style={{ backgroundColor: "#6bcbff", transformOrigin: "left", scaleX: lineScale }}
          />

          {/* Description 1 — with parallax */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-base md:text-lg leading-relaxed font-light max-w-2xl mb-4"
              style={{
                fontFamily: "Inter, sans-serif", color: "#2b2d42",
                opacity: 0.65, clipPath: descClip, x: desc1Parallax,
              }}
            >
              COMPUTER SCIENCE STUDENT AT QUEEN&apos;S UNIVERSITY.
            </motion.p>
          </div>

          {/* Description 2 — with parallax */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="text-base md:text-lg leading-relaxed font-light max-w-2xl"
              style={{
                fontFamily: "Inter, sans-serif", color: "#2b2d42",
                opacity: 0.65, clipPath: descClip, x: desc2Parallax,
              }}
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
