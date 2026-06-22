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

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
      const endX = x.get() + info.velocity.x * 8;
      const endY = y.get() + info.velocity.y * 8;
      const boundedX = Math.max(-500, Math.min(500, endX));
      const boundedY = Math.max(-500, Math.min(500, endY));
      animate(x, boundedX, { type: "spring", stiffness: 200, damping: 25 });
      animate(y, boundedY, { type: "spring", stiffness: 200, damping: 25 });
      animate(rotate, 6, { type: "spring", stiffness: 200, damping: 20 });
    },
    [x, y, rotate]
  );

  const handleClick = useCallback(() => {
    if (!moved.current) {
      onNavigate();
    }
  }, [onNavigate]);

  return (
    <motion.div
      className="app-card-wrapper"
      style={{
        x,
        y,
        rotate: springRotate,
        position: "absolute",
        top: "15%",
        right: "6%",
        backgroundColor: "#6bcbff",
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
      whileHover={{ scale: 1.03 }}
    >
      {/* Arrow indicator - positioned left of card, follows drag */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ right: "calc(100% + 16px)", top: "50%", translateY: "-50%" }}
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-sm md:text-base font-semibold tracking-[0.25em] whitespace-nowrap"
            style={{
              fontFamily: "Six Caps, sans-serif",
              color: "#ff6b9d",
              textShadow: "0 0 24px rgba(255,107,157,0.6)",
            }}
          >
            CLICK ME
          </span>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M14 12 L26 20 L14 28"
              stroke="#ff6b9d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle
              cx="26" cy="20" r="11"
              stroke="#ff6b9d"
              strokeWidth="1.5"
              fill="none"
              opacity={0.35}
            />
          </svg>
        </div>
      </motion.div>

      {/* Card content */}
      <div
        className="w-full h-full flex flex-col p-6 md:p-7"
        style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">&bull;</span>
          <span className="text-base md:text-lg tracking-[0.2em]">ABOUT ME</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <p className="text-lg md:text-xl leading-relaxed tracking-wide">
            BY THE WAY,
            <br />
            YOU CAN CLICK
            <br />
            THIS CARD.
          </p>
          <p className="mt-4 text-base tracking-[0.15em] opacity-80">
            (ABOUT ME)
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-[#2b2d42]/20">
          <p
            className="text-3xl tracking-[0.1em] text-center"
            style={{ fontFamily: "Six Caps, sans-serif" }}
          >
            NGUYEN
          </p>
        </div>
      </div>
    </motion.div>
  );
}
