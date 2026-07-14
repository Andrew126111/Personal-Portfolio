"use client";

import { motion } from "framer-motion";
import { useDriftX, useSmoothRotate } from "@/hooks/useScrollProgress";

const letters = "ANDREW NGUYEN".split("");

export default function HeaderLogo() {
  const driftX = useDriftX(4, 0.02);
  const rotate = useSmoothRotate(0.3);

  return (
    <motion.div
      className="fixed top-8 left-8 z-40 select-none"
      style={{
        fontFamily: "Six Caps, sans-serif",
        fontSize: 34,
        color: "#2b2d42",
        letterSpacing: "0.12em",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        x: driftX,
        rotate,
      }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden"
          style={{ height: 36, width: letter === " " ? 18 : "auto" }}
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block">{letter === " " ? "\u00A0" : letter}</span>
        </motion.span>
      ))}
    </motion.div>
  );
}
