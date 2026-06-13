"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor({ loaded }: { loaded: boolean }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 select-none">
      <AnimatePresence mode="wait">
        {!loaded ? (
          <motion.div
            key="loading"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#302c1a", letterSpacing: "0.1em" }}
          >
            <span>LOADING</span>
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
          </motion.div>
        ) : (
          <motion.div
            key="action"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-block px-2 py-0.5 text-[10px] tracking-widest"
              style={{
                backgroundColor: "#ffffff",
                color: "#302c1a",
                fontFamily: "Inter, sans-serif",
              }}
            >
              ACTION
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C6.5 2 5 5 5 8v4c0 3 1.5 5 5 5s5-2 5-5V8c0-3-1.5-6-5-6z"
                stroke="#302c1a"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M8 12l2 2 2-2" stroke="#302c1a" strokeWidth="1.5" />
              <path d="M10 14V8" stroke="#302c1a" strokeWidth="1.5" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
