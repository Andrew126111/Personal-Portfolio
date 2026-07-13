"use client";

import { motion } from "framer-motion";

const interests = [
  { emoji: "―", text: "PHOTOGRAPHY & VISUAL COMPOSITION", color: "#ff6b9d" },
  { emoji: "―", text: "WEIGHTLIFTING & RUNNING", color: "#6bcbff" },
  { emoji: "―", text: "READING PRODUCT DESIGN & CREATIVITY", color: "#ffd93d" },
];

export default function BeyondCode({ sectionId }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden flex items-center"
      style={{ backgroundColor: "#fef9ff", backfaceVisibility: "hidden" }}
    >
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
          <span>BEYOND CODE</span>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {interests.map((item, i) => (
            <motion.div
              key={item.text}
              className="flex items-center gap-6 md:gap-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <span
                className="text-2xl md:text-3xl"
                style={{ color: item.color }}
              >
                {item.emoji}
              </span>
              <p
                className="text-xl md:text-2xl lg:text-3xl tracking-[0.08em]"
                style={{
                  fontFamily: "Six Caps, sans-serif",
                  color: "#2b2d42",
                  opacity: 0.85 - i * 0.08,
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
