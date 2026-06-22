"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import AboutCard from "./AboutCard";

const skillTags = [
  "REACT", "NEXT.JS", "TYPESCRIPT", "CSS", "PYTHON",
  "NODE.JS", "FRAMER", "TAILWIND", "GIT", "POSTGRES",
];

const LINE_COUNT = 3;
const LINE_BASE_Y = [30, 45, 60];
const LINE_AMPLITUDE = [40, 30, 20];
const LINE_PHASE = [0, 0.3, 0.6];

export default function HeroSection({ onAboutClick }: { onAboutClick: () => void }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 25 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [linePaths, setLinePaths] = useState<string[]>(
    Array(LINE_COUNT).fill("")
  );

  useEffect(() => {
    const unsubX = smoothMouseX.on("change", updatePaths);
    const unsubY = smoothMouseY.on("change", updatePaths);
    return () => { unsubX(); unsubY(); };

    function updatePaths() {
      const mx = smoothMouseX.get();
      const my = smoothMouseY.get();
      const newPaths = Array.from({ length: LINE_COUNT }, (_, i) => {
        const distFromMouse = Math.abs(my - LINE_BASE_Y[i] / 120);
        const sensitivity = Math.max(0.3, 1 - distFromMouse * 2);
        const amp = LINE_AMPLITUDE[i] * sensitivity;
        const phase = LINE_PHASE[i];
        const cp1x = 200 + mx * 300 + phase * 200;
        const cp1y = LINE_BASE_Y[i] - amp + (mx - 0.5) * amp * 0.6;
        return `M0,${LINE_BASE_Y[i]} Q ${cp1x},${cp1y} 500,${LINE_BASE_Y[i]} T 1000,${LINE_BASE_Y[i]}`;
      });
      setLinePaths(newPaths);
    }
  }, [smoothMouseX, smoothMouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
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
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 250, height: 250, top: "50%", left: "40%", backgroundColor: "#6bcbff", opacity: 0.06 }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 200, height: 200, bottom: "25%", right: "30%", backgroundColor: "#a8e6cf", opacity: 0.1 }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

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

        {/* Main name */}
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
          <p className="text-xl md:text-3xl lg:text-4xl tracking-[0.15em]"
             style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}>
            COMPUTER SCIENCE STUDENT
          </p>
          <p className="text-xl md:text-3xl lg:text-4xl tracking-[0.15em]"
             style={{ fontFamily: "Six Caps, sans-serif", color: "#6bcbff" }}>
            AT YOUR UNIVERSITY
          </p>
        </motion.div>

        {/* Tagline + multi-line squiggle */}
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

          {/* Multi-line mouse-following squiggles */}
          <motion.div
            className="w-full md:flex-1 max-w-xl ml-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{ position: "relative", height: 80 }}
          >
            <svg viewBox="0 0 1000 120" fill="none" className="w-full h-full" preserveAspectRatio="none">
              {linePaths.map((d, i) => (
                <path
                  key={i}
                  d={d || `M0,${LINE_BASE_Y[i]} Q 500,${LINE_BASE_Y[i]} 1000,${LINE_BASE_Y[i]}`}
                  stroke="#2b2d42"
                  strokeWidth={1.5 - i * 0.3}
                  fill="none"
                  opacity={0.5 - i * 0.12}
                />
              ))}
            </svg>
          </motion.div>
        </div>

        {/* Personal bio filler - floating intro card */}
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

        {/* Decorative skill tags */}
        <motion.div
          className="absolute bottom-8 right-8 md:right-16 lg:right-24 flex flex-wrap gap-2 max-w-xs justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          {skillTags.slice(0, 5).map((tag, i) => (
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

      {/* Animated arrow pointing to the about card */}
      <motion.div
        className="absolute pointer-events-none select-none z-30"
        style={{ top: "22%", right: "calc(6% + 340px)" }}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-xs md:text-sm font-semibold tracking-[0.2em]"
            style={{
              fontFamily: "Six Caps, sans-serif",
              color: "#ff6b9d",
              textShadow: "0 0 20px rgba(255,107,157,0.5)",
            }}
          >
            CLICK ME
          </span>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M10 10 L18 14 L10 18"
              stroke="#ff6b9d"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle
              cx="18" cy="14" r="8"
              stroke="#ff6b9d"
              strokeWidth="1.5"
              fill="none"
              opacity={0.4}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Draggable About Card */}
      <AboutCard onNavigate={onAboutClick} />
    </section>
  );
}
