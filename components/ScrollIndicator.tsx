"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export default function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const check = () => {
      const viewportMid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;

      sectionIds.forEach((id, i) => {
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

      setActive((prev) => (prev !== best ? best : prev));
    };

    const interval = setInterval(check, 100);
    check();
    return () => clearInterval(interval);
  }, [sectionIds]);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-none">
      {sectionIds.map((id, i) => (
        <motion.div
          key={id}
          className="rounded-full"
          style={{
            backgroundColor: i === active ? "#ff6b9d" : "#2b2d42",
          }}
          animate={{
            width: i === active ? 8 : 4,
            height: i === active ? 8 : 4,
            opacity: i === active ? 1 : 0.15,
          }}
          transition={{ duration: 0.25 }}
        />
      ))}
    </div>
  );
}
