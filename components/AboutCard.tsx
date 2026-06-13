"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface AboutCardProps {
  onNavigate: () => void;
}

const SNAP_ZONES = [
  { x: 60, y: -70 },
  { x: -80, y: 200 },
  { x: 90, y: 170 },
];

const SNAP_THRESHOLD = 500;

export default function AboutCard({ onNavigate }: AboutCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(8);
  const moved = useRef(false);

  const handleDragStart = useCallback(() => {
    moved.current = false;
  }, []);

  const handleDrag = useCallback(
    (_: unknown, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
      if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
        moved.current = true;
      }
      rotate.set(8 + info.velocity.x * 0.05);
    },
    [rotate]
  );

  const handleDragEnd = useCallback(() => {
    rotate.set(8);
    const dragX = x.get();
    const dragY = y.get();

    let nearest = SNAP_ZONES[0];
    let minDist = Infinity;
    for (const zone of SNAP_ZONES) {
      const dist = Math.sqrt((dragX - zone.x) ** 2 + (dragY - zone.y) ** 2);
      if (dist < minDist) {
        minDist = dist;
        nearest = zone;
      }
    }

    const originDist = Math.sqrt(dragX * dragX + dragY * dragY);
    if (minDist < SNAP_THRESHOLD && minDist < originDist) {
      animate(x, nearest.x, { type: "spring", stiffness: 300, damping: 25 });
      animate(y, nearest.y, { type: "spring", stiffness: 300, damping: 25 });
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      animate(y, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  }, [x, y, rotate]);

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
        rotate,
        position: "absolute",
        top: "15%",
        right: "8%",
        backgroundColor: "#6bcbff",
        zIndex: 20,
        touchAction: "none",
      }}
      drag
      dragConstraints={{ left: -350, right: 350, top: -400, bottom: 400 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="w-full h-full flex flex-col p-4 md:p-5"
        style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">・</span>
          <span className="text-sm tracking-[0.2em]">ABOUT ME</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
          <p className="text-base md:text-lg leading-relaxed tracking-wide">
            BY THE WAY,
            <br />
            YOU CAN CLICK
            <br />
            THIS CARD.
          </p>
          <p className="mt-3 text-sm tracking-[0.15em] opacity-70">
            (ABOUT ME)
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-[#2b2d42]/20">
          <p
            className="text-2xl tracking-[0.1em] text-center"
            style={{ fontFamily: "Six Caps, sans-serif" }}
          >
            NGUYEN
          </p>
        </div>
      </div>
    </motion.div>
  );
}
