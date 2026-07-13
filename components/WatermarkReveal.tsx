"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface WatermarkRevealProps {
  children: ReactNode;
  text?: string;
}

export default function WatermarkReveal({ children, text = "AN" }: WatermarkRevealProps) {
  return (
    <div className="relative">
      {/* Watermark that swells and dissolves */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 5 }}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: [0, 0.06, 0.03, 0], scale: [0.6, 1.15, 1.1, 0.8] }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-20%" }}
      >
        <span
          className="leading-none"
          style={{
            fontFamily: "Six Caps, sans-serif",
            fontSize: "clamp(28rem, 60vw, 60rem)",
            color: "#2b2d42",
            letterSpacing: "0.02em",
            lineHeight: 0.85,
          }}
        >
          {text}
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}
