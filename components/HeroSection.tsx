"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import AboutCard from "./AboutCard";

const skillTags = [
  "REACT", "NEXT.JS", "TYPESCRIPT", "CSS", "PYTHON",
  "NODE.JS", "FRAMER", "TAILWIND", "GIT", "POSTGRES",
];

function FidgetOrb({ color, size, baseX, baseY }: { color: string; size: number; baseX: string; baseY: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number; y: number } }) => {
      const endX = x.get() + info.velocity.x * 6;
      const endY = y.get() + info.velocity.y * 6;
      animate(x, Math.max(-120, Math.min(120, endX)), { type: "spring", stiffness: 100, damping: 15 });
      animate(y, Math.max(-120, Math.min(120, endY)), { type: "spring", stiffness: 100, damping: 15 });
    },
    [x, y]
  );

  return (
    <motion.div
      className="absolute rounded-full cursor-grab active:cursor-grabbing"
      style={{
        width: size,
        height: size,
        left: baseX,
        top: baseY,
        backgroundColor: color,
        opacity: 0.5,
        x,
        y,
        zIndex: 15,
        translateX: "-50%",
        translateY: "-50%",
        boxShadow: `0 0 40px ${color}44`,
      }}
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.4, opacity: 0.75, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.65, opacity: 0.9, transition: { duration: 0.1 } }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 0.5 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export default function HeroSection({ onAboutClick }: { onAboutClick: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#fef9ff" }}
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
            opacity: 0.025,
            letterSpacing: "0.02em",
            lineHeight: 0.9,
          }}
        >
          AN
        </span>
      </div>

      {/* Background circles */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 600, top: "-15%", right: "-5%", backgroundColor: "#ff6b9d", opacity: 0.08 }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 450, height: 450, bottom: "5%", left: "0%", backgroundColor: "#ffd93d", opacity: 0.07 }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Fidget orbs - interactive floating bubbles */}
      <FidgetOrb color="#ff6b9d" size={110} baseX="75%" baseY="25%" />
      <FidgetOrb color="#a8e6cf" size={85} baseX="15%" baseY="75%" />
      <FidgetOrb color="#ffd93d" size={95} baseX="88%" baseY="55%" />
      <FidgetOrb color="#6bcbff" size={75} baseX="20%" baseY="15%" />
      <FidgetOrb color="#ffb3a6" size={65} baseX="80%" baseY="80%" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
        {/* Top bar */}
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <motion.p
            className="text-lg md:text-2xl lg:text-3xl tracking-[0.3em]"
            style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            CREATIVE
            </motion.p>
            <motion.p
              className="text-lg md:text-2xl lg:text-3xl tracking-[0.15em]"
              style={{ fontFamily: "Six Caps, sans-serif", color: "#ff6b9d" }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              DEVELOPER
          </motion.p>
        </div>

        {/* Main name */}
        <motion.h1
          className="text-[clamp(4rem,15vw,16rem)] leading-[1.05] tracking-wide -ml-1"
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
          <p className="text-xl md:text-3xl lg:text-4xl tracking-[0.15em]"
             style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}>
            COMPUTER SCIENCE
          </p>
          <p className="text-xl md:text-3xl lg:text-4xl tracking-[0.15em]"
             style={{ fontFamily: "Six Caps, sans-serif", color: "#6bcbff" }}>
            AT QUEEN'S UNIVERSITY
          </p>
        </motion.div>

        {/* Tagline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mt-4 md:mt-6 gap-4">
          <motion.p
            className="text-xs md:text-sm tracking-[0.25em]"
            style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", fontWeight: 300 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            INTERACTION &middot; MOTION &middot; CODE
          </motion.p>
        </div>

        {/* Personal bio filler */}
        <motion.div
          className="absolute bottom-20 left-8 md:left-16 lg:left-24 max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <div
            className="p-4 md:p-5 rounded-xl backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(107, 203, 255, 0.08)",
              border: "1px solid rgba(107, 203, 255, 0.15)",
            }}
          >
            <p
              className="text-xs md:text-sm leading-relaxed font-light"
              style={{ fontFamily: "Inter, sans-serif", color: "#2b2d42", opacity: 0.7 }}
            >
              &ldquo;Coding every day since summer &apos;22. I build things that
              move, react, and tell a story. Currently exploring creative
              development with Framer Motion &amp; Next.js.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Skill tags */}
        <motion.div
          className="absolute bottom-8 right-8 md:right-16 lg:right-24 flex flex-wrap gap-2 max-w-xs justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          {skillTags.slice(0, 6).map((tag, i) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.15em] px-2 py-0.5"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#2b2d42",
                opacity: 0.2 + i * 0.04,
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
