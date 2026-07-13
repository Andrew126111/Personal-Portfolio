"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const chapters = [
  { num: "01", label: "IDENTITY" },
  { num: "02", label: "PURPOSE" },
  { num: "03", label: "PROJECTS" },
  { num: "04", label: "SKILLS" },
  { num: "05", label: "EXPERIENCE" },
  { num: "06", label: "CONTACT" },
];

const chapterIds = [
  ["hero"],
  ["whoami"],
  ["project-1", "project-2", "project-3"],
  ["skills"],
  ["experience"],
  ["contact"],
];

export default function ChapterNav() {
  const [active, setActive] = useState(0);

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

      setActive((prev) => (prev !== best ? best : prev));
    };

    const interval = setInterval(check, 100);
    check();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start pointer-events-none select-none">
      {chapters.map((ch, i) => (
        <div key={ch.num} className="flex items-center gap-3 h-8">
          {/* Dot */}
          <motion.div
            className="rounded-full shrink-0"
            style={{
              backgroundColor: i === active ? "#ff6b9d" : "#2b2d42",
            }}
            animate={{
              width: i === active ? 8 : 3,
              height: i === active ? 8 : 3,
              opacity: i === active ? 1 : 0.15,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Chapter number and label */}
          <motion.div
            className="flex items-center gap-2 overflow-hidden"
            animate={{
              width: i === active ? "auto" : 0,
              opacity: i === active ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="text-[10px] tracking-[0.2em] whitespace-nowrap"
              style={{
                fontFamily: "Inter, sans-serif",
                color: i === active ? "#ff6b9d" : "#2b2d42",
                fontWeight: 400,
              }}
            >
              {ch.num}
            </span>
            <span
              className="text-[10px] tracking-[0.2em] whitespace-nowrap"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#2b2d42",
                opacity: 0.4,
              }}
            >
              {ch.label}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
