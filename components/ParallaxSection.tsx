"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSmoothScroll } from "./SmoothScroll";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({ children, speed = 0.3, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useSmoothScroll();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!ctx || !ref.current) return;

    const checkPosition = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = 1 - rect.top / (viewportH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      setOffset((clamped - 0.5) * speed * 100);
    };

    const interval = setInterval(checkPosition, 50);
    return () => clearInterval(interval);
  }, [ctx, speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y: offset }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
