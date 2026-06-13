"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const nameLetters = "ANDREW NGUYEN".split("");

const circleColors = [
  { color: "#55b1ff", size: 360, top: "5%", left: "10%" },
  { color: "#ffabb7", size: 280, top: "60%", left: "5%" },
  { color: "#ffd955", size: 320, top: "15%", left: "70%" },
  { color: "#ffabb7", size: 420, top: "50%", left: "75%" },
  { color: "#55b1ff", size: 241, top: "30%", left: "50%" },
  { color: "#ffabb7", size: 380, top: "70%", left: "40%" },
  { color: "#ffd955", size: 300, top: "80%", left: "80%" },
  { color: "#7ec1f9", size: 597, top: "10%", left: "30%" },
  { color: "#ffabb7", size: 260, top: "40%", left: "20%" },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const [counter, setCounter] = useState({ col1: 0, col2: 0, col3: 0 });
  const [progress, setProgress] = useState(0);
  const startTime = useRef(0);

  useEffect(() => {
    startTime.current = performance.now();
    const duration = 3500;

    const frame = (now: number) => {
      const elapsed = now - startTime.current;
      const t = Math.min(elapsed / duration, 1);

      setCounter({
        col1: Math.floor(t * 9) % 10,
        col2: Math.floor(t * 19) % 10,
        col3: Math.floor(t * 29) % 10,
      });

      setProgress(Math.round(t * 100));

      if (t >= 1) {
        setPhase("exiting");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 800);
        return;
      }

      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ backgroundColor: "#f0efeb" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full h-full">
            {/* Background pulsing circle */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "142vmax",
                height: "142vmax",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid #302c1a",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Decorative colored circles */}
            {circleColors.map((c, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: c.size,
                  height: c.size,
                  top: c.top,
                  left: c.left,
                  backgroundColor: c.color,
                  opacity: 0.6,
                  pointerEvents: "none",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
              />
            ))}

            {/* Number counter */}
            <div
              className="absolute"
              style={{
                top: "120px",
                right: "120px",
                fontFamily: "Six Caps, sans-serif",
                fontSize: 72,
                color: "#302c1a",
                letterSpacing: "0.02em",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-baseline gap-1"
              >
                <span>01</span>
                <span className="overflow-hidden inline-block" style={{ width: 40 }}>
                  <motion.span
                    animate={{ y: -counter.col1 * 72 }}
                    transition={{ duration: 0.1 }}
                    className="block"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <span key={i} className="block">{i}</span>
                    ))}
                  </motion.span>
                </span>
                <span className="overflow-hidden inline-block" style={{ width: 80 }}>
                  <motion.span
                    animate={{ y: -counter.col2 * 72 }}
                    transition={{ duration: 0.1 }}
                    className="block"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <span key={i} className="block">{i}{i}</span>
                    ))}
                  </motion.span>
                </span>
                <span className="overflow-hidden inline-block" style={{ width: 100 }}>
                  <motion.span
                    animate={{ y: -counter.col3 * 72 }}
                    transition={{ duration: 0.1 }}
                    className="block"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <span key={i} className="block">{i}{i}{i}</span>
                    ))}
                  </motion.span>
                </span>
                <span className="ml-2 text-3xl">%</span>
              </motion.div>
            </div>

            {/* Name blocks */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex flex-wrap justify-center gap-x-3"
                style={{ fontFamily: "Six Caps, sans-serif", fontSize: 60, color: "#302c1a" }}
              >
                {nameLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block overflow-hidden"
                    style={{ width: letter === " " ? 24 : "auto", height: 70 }}
                    initial={{ y: 70 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-block" style={{ lineHeight: 1.1 }}>
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Portfolio text */}
            <motion.div
              className="absolute"
              style={{
                bottom: "200px",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "Six Caps, sans-serif",
                fontSize: 24,
                color: "#302c1a",
                letterSpacing: "0.3em",
              }}
              initial={{ scaleX: 0.1, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              PORTFOLIO 2025
            </motion.div>

            {/* Loading dots */}
            <motion.div
              className="absolute"
              style={{ bottom: 160, left: "50%", transform: "translateX(-50%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span
                className="loading-dot inline-block"
                style={{ fontFamily: "Six Caps, sans-serif", fontSize: 20, color: "#302c1a" }}
              >
                .
              </span>
              <span
                className="loading-dot inline-block"
                style={{ fontFamily: "Six Caps, sans-serif", fontSize: 20, color: "#302c1a" }}
              >
                .
              </span>
              <span
                className="loading-dot inline-block"
                style={{ fontFamily: "Six Caps, sans-serif", fontSize: 20, color: "#302c1a" }}
              >
                .
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
