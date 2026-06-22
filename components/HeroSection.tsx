"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import AboutCard from "./AboutCard";

const LINE_COUNT = 3;
const LINE_BASE_Y = [30, 45, 60];
const LINE_AMPLITUDE = [40, 30, 20];
const LINE_PHASE = [0, 0.3, 0.6];

const fidgetOrbs = [
  { color: "#ff6b9d", size: 70, x: 0, y: 0, baseX: 0, baseY: 0 },
  { color: "#a8e6cf", size: 55, x: 0, y: 0, baseX: 0, baseY: 0 },
  { color: "#ffd93d", size: 60, x: 0, y: 0, baseX: 0, baseY: 0 },
  { color: "#6bcbff", size: 45, x: 0, y: 0, baseX: 0, baseY: 0 },
];

function FidgetOrb({ color, size, baseX, baseY }: { color: string; size: number; baseX: number; baseY: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number; y: number } }) => {
      const endX = x.get() + info.velocity.x * 4;
      const endY = y.get() + info.velocity.y * 4;
      const clampedX = Math.max(-80, Math.min(80, endX));
      const clampedY = Math.max(-80, Math.min(80, endY));
      animate(x, clampedX, { type: "spring", stiffness: 120, damping: 18 });
      animate(y, clampedY, { type: "spring", stiffness: 120, damping: 18 });
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
        opacity: 0.35,
        x,
        y,
        zIndex: 5,
      }}
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.3, opacity: 0.55, transition: { duration: 0.3 } }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 0.35 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

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

      {/* Fidget orbs - interactive floating bubbles */}
      <FidgetOrb color="#ff6b9d" size={70} baseX={65} baseY={20} />
      <FidgetOrb color="#a8e6cf" size={55} baseX={5} baseY={55} />
      <FidgetOrb color="#ffd93d" size={60} baseX={80} baseY={40} />
      <FidgetOrb color="#6bcbff" size={45} baseX={88} baseY={72} />

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
      </div>

      {/* Draggable About Card */}
      <AboutCard onNavigate={onAboutClick} />
    </section>
  );
}
