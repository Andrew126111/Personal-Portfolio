"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import AboutCard from "./AboutCard";

const skillTags = [
  "REACT", "NEXT.JS", "TYPESCRIPT", "CSS", "PYTHON",
  "NODE.JS", "FRAMER", "TAILWIND", "GIT", "POSTGRES",
];

export default function HeroSection({ onAboutClick }: { onAboutClick: () => void }) {
  const mouseX = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pathD, setPathD] = useState("M0,45 Q 350,80 500,45 T 1000,45");

  useEffect(() => {
    const unsubscribe = smoothMouseX.on("change", (v: number) => {
      const cp1x = 200 + v * 300;
      const cp1y = 70 - v * 50;
      setPathD(`M0,45 Q ${cp1x},${cp1y} 500,45 T 1000,45`);
    });
    return unsubscribe;
  }, [smoothMouseX]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      mouseX.set(x);
    },
    [mouseX]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#fef9ff" }}
      onPointerMove={handlePointerMove}
    >
      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <span
          className="leading-none"
          style={{
            fontFamily: "Six Caps, sans-serif",
            fontSize: "clamp(20rem, 40vw, 40rem)",
            color: "#2b2d42",
            opacity: 0.03,
            letterSpacing: "0.02em",
            lineHeight: 0.9,
          }}
        >
          AN
        </span>
      </div>

      {/* Background circles - more of them */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "-15%",
          right: "-5%",
          backgroundColor: "#ff6b9d",
          opacity: 0.08,
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 450,
          height: 450,
          bottom: "5%",
          left: "0%",
          backgroundColor: "#ffd93d",
          opacity: 0.07,
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 250,
          height: 250,
          top: "50%",
          left: "40%",
          backgroundColor: "#6bcbff",
          opacity: 0.06,
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          bottom: "25%",
          right: "30%",
          backgroundColor: "#a8e6cf",
          opacity: 0.1,
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
        {/* Top bar: Folio + date */}
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <motion.p
            className="text-lg md:text-2xl lg:text-3xl tracking-[0.3em]"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            FOLIO OF
          </motion.p>
          <motion.p
            className="text-lg md:text-2xl lg:text-3xl tracking-[0.15em]"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#ff6b9d" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            01/JAN.2000
          </motion.p>
        </div>

        {/* Main name - fills the viewport width */}
        <motion.h1
          className="text-[clamp(4rem,15vw,16rem)] leading-[0.82] tracking-wide -ml-1"
          style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          ANDREW
          <br />
          NGUYEN
        </motion.h1>

        {/* Sub-text row */}
        <motion.div
          className="flex flex-wrap gap-x-8 gap-y-1 mt-2 md:mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p
            className="text-xl md:text-3xl lg:text-4xl tracking-[0.15em]"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
          >
            COMPUTER SCIENCE STUDENT
          </p>
          <p
            className="text-xl md:text-3xl lg:text-4xl tracking-[0.15em]"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#6bcbff" }}
          >
            AT YOUR UNIVERSITY
          </p>
        </motion.div>

        {/* Tagline + squiggle row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mt-4 md:mt-6 gap-4">
          <motion.p
            className="text-xs md:text-sm tracking-[0.25em]"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", fontWeight: 300 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            STUDENT &middot; BUILDER &middot; CREATOR
          </motion.p>

          {/* Mouse-following line - wider, more prominent */}
          <motion.div
            className="w-full md:w-auto md:flex-1 max-w-lg md:max-w-xl ml-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <svg viewBox="0 0 1000 90" fill="none" className="w-full">
              <path
                d={pathD}
                stroke="#2b2d42"
                strokeWidth="1.5"
                fill="none"
                opacity={0.6}
              />
            </svg>
          </motion.div>
        </div>

        {/* Decorative skill tags */}

        <motion.div
          className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex flex-wrap gap-2 max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {skillTags.slice(0, 5).map((tag, i) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.15em] px-2 py-0.5"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#2b2d42",
                opacity: 0.25 + i * 0.04,
                border: "1px solid #2b2d42",
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Draggable About Card */}
      <AboutCard onNavigate={onAboutClick} />
    </section>
  );
}
