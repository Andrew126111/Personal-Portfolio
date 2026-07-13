"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

interface AboutCardProps {
  onNavigate: () => void;
}

export default function AboutCard({ onNavigate }: AboutCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(6);
  const moved = useRef(false);

  const springRotate = useSpring(rotate, { stiffness: 200, damping: 20 });

  const handleDragStart = useCallback(() => {
    moved.current = false;
  }, []);

  const handleDrag = useCallback(
    (_: unknown, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
      if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
        moved.current = true;
      }
      rotate.set(info.velocity.x * 0.03 + 6);
    },
    [rotate]
  );

  const handleDragEnd = useCallback(() => {
    const currentX = x.get();
    const currentY = y.get();
    animate(x, Math.max(-200, Math.min(200, currentX)), { type: "spring", stiffness: 300, damping: 30 });
    animate(y, Math.max(-200, Math.min(200, currentY)), { type: "spring", stiffness: 300, damping: 30 });
    animate(rotate, 6, { type: "spring", stiffness: 200, damping: 20 });
  }, [x, y, rotate]);

  const handleClick = useCallback(() => {
    if (!moved.current) {
      onNavigate();
    }
  }, [onNavigate]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate: springRotate,
        position: "absolute",
        top: "15%",
        right: "6%",
        zIndex: 20,
        touchAction: "none",
      }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Arrow - positioned left of wrapper, not clipped by overflow hidden */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ right: "calc(100% + 16px)", top: "50%", translateY: "-50%" }}
        animate={{ x: [0, 12, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-base md:text-lg font-semibold tracking-[0.25em] whitespace-nowrap"
            style={{
              fontFamily: "Six Caps, sans-serif",
              color: "#ff6b9d",
              textShadow: "0 0 28px rgba(255,107,157,0.7)",
            }}
          >
            CLICK ME
          </span>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M17 14 L31 24 L17 34"
              stroke="#ff6b9d"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle
              cx="31" cy="24" r="13"
              stroke="#ff6b9d"
              strokeWidth="2"
              fill="none"
              opacity={0.35}
            />
          </svg>
        </div>
      </motion.div>

      {/* Card */}
      <div className="app-card-wrapper">
        <div
          className="w-full h-full flex flex-col p-5 md:p-6"
          style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">&bull;</span>
            <span className="text-xl md:text-2xl tracking-[0.2em]">ABOUT ME</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
            <p className="text-2xl md:text-[28px] leading-[1.1] tracking-wide">
              MY STORY
              <br />
              FROM 2022
            </p>
            <p className="mt-4 text-lg md:text-xl tracking-[0.15em] opacity-80">
              (READ MORE)
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-[#2b2d42]/20">
            <p
              className="text-4xl md:text-5xl tracking-[0.1em] text-center"
              style={{ fontFamily: "Six Caps, sans-serif" }}
            >
              NGUYEN
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
