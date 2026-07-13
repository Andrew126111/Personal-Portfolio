"use client";

import { motion } from "framer-motion";

const currentFocus = [
  { label: "LEARNING", items: ["FRAMER MOTION", "GSAP", "SYSTEM DESIGN"], color: "#ff6b9d" },
  { label: "INTERESTS", items: ["CREATIVE CODING", "UI DESIGN", "OPEN SOURCE"], color: "#6bcbff" },
  { label: "BUILDING", items: ["INTERACTIVE PORTFOLIO", "FULL-STACK APPS"], color: "#a8e6cf" },
];

export default function CurrentlySection({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden flex items-center"
      style={{ backgroundColor: "#ffffff", backfaceVisibility: "hidden" }}
    >
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 400, height: 400, top: "-15%", right: "-5%", backgroundColor: "#ffd93d", opacity: 0.07 }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-32 md:py-40">
        <motion.div
          className="flex items-center gap-2 mb-16 md:mb-20"
          style={{ fontFamily: "Six Caps, sans-serif", fontSize: 36, color: "#2b2d42" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span>・</span>
          <span>CURRENTLY</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {currentFocus.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + gi * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px" style={{ backgroundColor: group.color }} />
                <span className="text-xs tracking-[0.25em]" style={{ fontFamily: "Inter, sans-serif", color: group.color, fontWeight: 500 }}>
                  {group.label}
                </span>
              </div>
              <div className="space-y-3">
                {group.items.map((item, si) => (
                  <motion.p
                    key={item}
                    className="text-xl md:text-2xl lg:text-3xl tracking-[0.1em]"
                    style={{ fontFamily: "Six Caps, sans-serif", color: "#2b2d42", opacity: 0.85 - si * 0.08 }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + gi * 0.15 + si * 0.08 }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
