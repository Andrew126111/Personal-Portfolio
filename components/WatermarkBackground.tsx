"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const chapterIds = [
  ["hero"],
  ["whoami"],
  ["project-1", "project-2", "project-3"],
  ["skills"],
  ["experience"],
  ["contact"],
];

const watermarkStates = [
  { scale: 8, opacity: 0.025, y: 0 },
  { scale: 10, opacity: 0.035, y: 0 },
  { scale: 6, opacity: 0.02, y: 0 },
  { scale: 9, opacity: 0.03, y: 0 },
  { scale: 7, opacity: 0.025, y: 0 },
  { scale: 5, opacity: 0.04, y: 0 },
];

export default function WatermarkBackground() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  useEffect(() => {
    const check = () => {
      const viewportMid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;

      chapterIds.forEach((ids, i) => {
        ids.forEach((id) => {
          const el = document.getElementById(id);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const elMid = rect.top + rect.height / 2;
          const dist = Math.abs(elMid - viewportMid);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
      });

      if (best !== active) {
        setPrev(active);
        setActive(best);
      }
    };

    const interval = setInterval(check, 100);
    check();
    return () => clearInterval(interval);
  }, [active]);

  const state = watermarkStates[active];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0 }}
      animate={{
        scale: state.scale,
        opacity: state.opacity,
        y: state.y,
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="leading-none"
        style={{
          fontFamily: "Six Caps, sans-serif",
          fontSize: "clamp(16rem, 30vw, 30rem)",
          color: "#2b2d42",
          letterSpacing: "0.02em",
          lineHeight: 0.85,
        }}
      >
        AN
      </span>
    </motion.div>
  );
}
